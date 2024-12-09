import { notFound } from "next/navigation";
import Form from "./Form";
import Link from "next/link";
export const metadata = {
  title: "View User | Page",
};
const getUser = async (id) => {
  const response = await fetch(`${process.env.SERVER_API}/users/${id}`);
  const { data: user } = await response.json();
  return user;
};
export default async function ViewUserPage({ params }) {
  const { id } = params;
  const user = await getUser(id);
  if (!user) {
    return notFound();
  }
  return (
    <div>
      
      <h1 style={{ textAlign: 'center' }}>View User</h1>
      
      <Form user={user} id={id} />
    </div>
  );
}