"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import UserList from "./UsersList";

const USERS_PER_PAGE = 4; // Số lượng người dùng trên mỗi trang

const getUsers = async (pageNumber) => {
  const response = await fetch(`${process.env.SERVER_API}/users?page=${pageNumber}&limit=${USERS_PER_PAGE}`);
  return response.json();
};

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1); // Khởi tạo trang đầu tiên
  const [hasMoreData, setHasMoreData] = useState(true); // Trạng thái kiểm tra có dữ liệu thêm hay không
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const { success, data } = await getUsers(page);
        if (success) {
          setUsers(data);

          // Kiểm tra số lượng người dùng ít hơn số lượng tối đa mỗi trang
          if (data.length < USERS_PER_PAGE) {
            setHasMoreData(false); // Không có dữ liệu cho trang tiếp theo
          } else {
            setHasMoreData(true); // Vẫn có dữ liệu cho trang tiếp theo
          }
        } else {
          setError("Không thể tải được người dùng");
        }
      } catch (err) {
        setError("Có lỗi xảy ra khi tải dữ liệu");
      }
      setLoading(false);
    };

    fetchUsers();
  }, [page]); // Chạy lại khi trang thay đổi

  if (loading) return <h2>Đang tải...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <h1>Quản lý người dùng</h1>
      <Link href="/users/create" className="btn btn-primary mb-3">
        Thêm mới
      </Link>
      <UserList users={users} />
      <div className="pagination">
        {/* Nút Trước */}
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1} // Vô hiệu hóa khi ở trang đầu tiên
          className="btn btn-secondary me-2"
        >
          Trước
        </button>
        {/* Nút Tiếp theo */}
        <span className="page-counter">Trang {page}</span>
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          disabled={!hasMoreData} // Vô hiệu hóa khi không còn dữ liệu
          className="btn btn-secondary"
        >
          Tiếp theo
        </button>
      </div>
    </div>
  );
}
