import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

function AdminDashboard() {
  return (
    <div className="flex min-h-screen">
      <div className="w-[15%] text-white  bg-[#1F2937]">
        <AdminNavbar />
      </div>
      <div className="bg-slate-100 w-[85%]">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard;
