import { NavLink } from "react-router-dom";
function AdminNavbar() {
  return (
    <div className="flex flex-col p-2 ml-3">
      <div className="w-32 space-y-2">
      <h1 className="font-bold text-[22px] w-42 mt-3">Admin Panel</h1>
      <NavLink to="dashboard" className=" h-9 w-20 flex items-center hover:text-blue-500 mt-5 ">Dashboard</NavLink>
      <NavLink to="user" className="h-9 w-40 flex items-center hover:text-blue-500">User Management</NavLink>
      <NavLink to="courses" className=" h-9 w-40 flex items-center hover:text-blue-500">Course Management</NavLink>
      <NavLink to="inquiry" className=" h-9 w-20 flex items-center hover:text-blue-500">Inquiry</NavLink>
      <NavLink to="payments" className=" h-9 w-20 flex items-center hover:text-blue-500">Payments</NavLink>
      <NavLink to="testimonial" className=" h-9 w-24 flex items-center hover:text-blue-500">Testimonial</NavLink>
      <NavLink to="success" className=" h-9 w-28 flex items-center hover:text-blue-500">Success Story</NavLink>
      <NavLink to="/" className=" h-9 w-28 flex items-center hover:text-blue-500">Home</NavLink>
      </div>
    </div>
  );
}

export default AdminNavbar;
