import Link from "next/link";

export default async function HomePage() {
  return (
    <div>
      <h1 > Home Page Users List </h1 >
      <Link href="/users"
                  className="btn btn-primary"
                >
             Come on baby !
                </Link>
    </div>
  
  );
}