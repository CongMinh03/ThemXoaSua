"use client";
import { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import { debounce } from "@/utils/utils";
import Link from "next/link";

export default function UserList({ users }) {
  const [usersData, setUsers] = useState({
    data: [],
  });
  const getUsers = async (q) => {
    const response = await fetch(`${process.env.SERVER_API}/users?q=${q}`);
    const { data: users } = await response.json();
    setUsers(users);
  };
  const removeUser = async (id) => {
    const response = await fetch(`${process.env.SERVER_API}/users/${id}`, {
      method: "DELETE",
    });
    return response.ok;
  };
  const handleSearch = debounce((e) => {
    getUsers(e.target.value);
  });
  const handleRemoveUser = async (id) => {
    if (window.confirm("Bạn có chắc chắn?")) {
      const status = await removeUser(id);
      if (status) {
        getUsers("");
      }
    }
  };
  useEffect(() => {
    setUsers(users);
  }, []);
  return (
    <>
      <SearchForm onChange={handleSearch} />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th width="5%">STT</th>
            <th>Tên</th>
            <th>Email</th>
            <th width="5%">Sửa</th>
            <th width="5%">Xóa</th>
            <th width="5%">Xem</th>
          </tr>
        </thead>
        <tbody>
          {usersData.data.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Link
                  href={`/users/edit/${user.id}`}
                  className="btn btn-warning btn-sm"
                >
                  Sửa
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemoveUser(user.id)}
                >
                  Xóa
                </button>
              </td>
              <td>
                <Link    href={`/users/view/${user.id}`}
                  className="btn btn-info btn-sm"
                > Xem</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}