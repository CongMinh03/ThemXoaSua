"use client";

import { useRef, useState } from "react";
import { handleUpdateUser } from "../../action";

export default function Form({ user, id }) {
  const [msg, setMsg] = useState("");
  const formRef = useRef();
  return (
    <form
      ref={formRef}
      action={async (formData) => {
        formData.append("id", id);
        const response = await handleUpdateUser(formData);
        if (!response) {
          setMsg("Đã có lỗi xảy ra. Vui lòng thử lại sau");
          return;
        }
        setMsg("Cập nhật người dùng thành công");
      }}
    >
      <div className="mb-3">
        <label htmlFor="">Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Fullname"
          defaultValue={user.name}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="">Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Email"
          defaultValue={user.email}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="">Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
        />
      </div>
      <button className="btn btn-primary">Update</button>
      {msg && <span className="text-danger">{msg}</span>}
    </form>
  );
}