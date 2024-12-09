import { getSession } from "@/utils/session";

export default async function Header() {
  const user = await getSession(); // Lấy thông tin người dùng từ session

  return (
    <header>
      <ul className="d-flex gap-1 list-unstyled">
        {user ? (
          <>
            <li>
              <div className="avatar-container">
                <img
                  src={`http://localhost/ksksksksksk/BA1/storage/app/public/users/${user.image}`} // Dùng URL đầy đủ từ backend
                  width={60}
                  height={40}
                  className="avatar-image"
                
                />

              </div>
            </li>
            <li style={{ fontSize: "25px", marginTop: "30px" }}>
              Xin chào: {user.name}
              <a
                href="/auth/logout"
                style={{
                  fontSize: "15px",
                  marginTop: "30px",
                  marginLeft: "10px",
                }}
              >
                Đăng xuất
              </a>
            </li>
          </>
        ) : (
          <></>
        )}
      </ul>
    </header>
  );
}
