import Form from "./Form";

export const metadata = {
  title: "Create User | Page",
};
export default function CreateUserPage() {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Create User</h1>
      <Form />
    </div>
  );
}