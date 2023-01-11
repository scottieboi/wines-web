import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div className="container mx-auto">
      <div className="prose">
        <h2 className="mt-4">Home</h2>
        <nav>
          <Link className="btn btn-link" to="login">
            Login
          </Link>
          <Link className="btn btn-link" to="dashboard">
            Dashboard
          </Link>
        </nav>
      </div>
    </div>
  );
}
