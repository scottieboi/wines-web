import { Link } from "@remix-run/react";
import DashboardTable from "~/components/DashboardTable";

export default function DashboardRoute() {
  return (
    <div className="container mx-auto">
      <h2 className="my-4 text-2xl">Dashboard</h2>
      <DashboardTable />
      <Link className="btn-primary btn" to="add-wine">
        + Add wine
      </Link>
    </div>
  );
}
