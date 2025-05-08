import { Outlet, useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import { AuthContext } from "../Context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { toast, Zoom } from "react-toastify";

function AdminDashboard() {
  const { state } = useContext(AuthContext);
  const [user, setuser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (state.token) {
      try {
        const decoded = jwtDecode(state.token);
        setuser({
          role: decoded.role,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.warn("Not Authorized", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Zoom,
      });
    }
  }, [state.token]);

  useEffect(() => {
    if (user) {
      if (user.role !== "admin") {
        navigate("/");
        toast.warn("Not Authorized", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Zoom,
        }); // Not an admin
      }
    }
  }, [user, navigate]);

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
