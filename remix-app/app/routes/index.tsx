import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div className="container mx-auto">
      <h2 className="my-4 text-2xl">Home</h2>
      <nav>
        <Link className="btn-link btn" to="dashboard">
          Dashboard
        </Link>
      </nav>
    </div>
  );
}
