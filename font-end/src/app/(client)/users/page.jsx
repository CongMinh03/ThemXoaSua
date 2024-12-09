"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import UserList from "./UsersList";


const getUsers = async (pageNumber) => {
  const response = await fetch(`${process.env.SERVER_API}/users?page=${pageNumber}`);
  return response.json();
};

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1); // Initialize the page to 1
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState(null); // State for next page URL

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const { success, data} = await getUsers(page);
        if (success) {
          setUsers(data);
          console.log(data.next_page_url);
          setNextPageUrl(data.next_page_url);
        } else {
          setError("Không thể tải được người dùng");
        }
      } catch (err) {
        setError("Có lỗi xảy ra khi tải dữ liệu");
      }
      setLoading(false);
    };

    fetchUsers();
  }, [page]); // This effect runs every time the page number changes

  if (loading) return <h2>Đang tải...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <h1>Quản lý người dùng</h1>
      <Link href="/users/create" className="btn btn-primary mb-3">
        Thêm mới
      </Link>
      <UserList users={users} />
      <div className="pagination flex justify-center">
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}
          disabled={page === 1}
        >
          Quay Lại
        </button>
        <span className="page-counter">Trang {page}</span>
        <button 
          className="btn btn-secondary btn-sm"
          onClick={() => setPage(prevPage => prevPage + 1)}
          disabled={!nextPageUrl}
        >
          Tiếp Theo
        </button>
      </div>
    </div>
  );
}