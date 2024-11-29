import Link from 'next/link';
import UsersList from "./UsersList";

export const metadata={
  title:"User List | Page "
};
const getUsers = async () => {
  const response = await fetch(`${process.env.SERVER_API}/users`);
  return response.json();
};
export default async function Userspage() {
 const{success, data : users}= await getUsers();
 if(!success){
  return <div>Không tìm thấy người dùng</div>;
 }
 
 if(!success){
  return <h2>Không tìm thấy người dùng</h2>;
 }
  return (
    <div><h1>Users List</h1> 
    <Link href="/users/create" className="btn btn-primary mb-3">
 Create
    </Link>
  <UsersList users={ users}/>
    
    </div>
  )
}
