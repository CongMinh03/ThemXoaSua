import { getSession } from "@/utils/session";
import Link from "next/link";


export default async function Header() {
  const user = await getSession();

  return (
    <header>
      <h1>  </h1>
      <ul className="d-flex gap-1 list-unstyled">
        {user ? (

          <><li> <div className="avatar-container">
            <img
              src="https://i.imgur.com/axHjy6e.jpeg"
              width={80} // Kích thước tùy chỉnh
              height={60}
              className="avatar-image"

            />
          </div></li>
          <div style={{ fontSize: "45px", marginTop: "20px" }}>Xin chào: {user.name} </div>
  
            <div style={{ fontSize: "20px", marginTop: "45px" }} > <a href="/auth/logout">Đăng xuất</a></div>

          </>
        ) : 
          <>

          </>
        }
      </ul>

    </header>
  );
}