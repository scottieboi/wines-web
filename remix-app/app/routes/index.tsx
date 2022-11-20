import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div className="container">
      <div className="content">
        <h1>Home</h1>
        <nav>
          <ul>
            <li>
              <Link to="login">Login</Link>
            </li>
            <li>
              <Link to="dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
