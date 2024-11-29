"use client";

import { useRef, useState } from "react";
import { handleCreateUser } from "../action";

export default function Form() {
  const [msg, setMsg] = useState("");
  const formRef = useRef();
  return (
    <form
      ref={formRef}
      action={async (formData) => {
        const response = await handleCreateUser(formData);
        if (!response) {
          setMsg("Đã có lỗi xảy ra. Vui lòng thử lại sau");
          return;
        }
        setMsg("Added user successfully");
        formRef.current.reset();
      }}
    >
      <div className="mb-3">
        <label htmlFor="">Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Fullname"
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
          required
        />
      </div>
      <button className="btn btn-primary">Create</button>
      {msg && <span className="text-danger">{msg}</span>}
    </form>
  );
}