import { notFound } from "next/navigation";
import Form from "./form";

export const metadata = {
  title: "Update User | Page",
};
const getUser = async (id) => {
  const response = await fetch(`${process.env.SERVER_API}/users/${id}`);
  const { data: user } = await response.json();
  return user;
};
export default async function EditUserPage({ params }) {
  const { id } = params;
  const user = await getUser(id);
  if (!user) {
    return notFound();
  }
  return (
    <div>
      <h1>Update User</h1>
      <Form user={user} id={id} />
    </div>
  );
}