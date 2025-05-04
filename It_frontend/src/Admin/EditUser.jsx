import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import { useContext, useState } from "react";
import { Bounce, toast } from "react-toastify";

function EditUser() {
  const location = useLocation();
  console.log(location.state);
  const id = location.state._id;
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);

  const [name, setName] = useState(location.state.name);
  const [email, setEmail] = useState(location.state.email);
  const [phone, setPhone] = useState(location.state.phone);
  const [role, setRole] = useState(location.state.role);
  const editUser = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(`http://localhost:9000/api/editUser/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
        body: JSON.stringify({ name, email, phone, role }),
      });
      if (response.ok) {
        response = await response.json();
        console.log(response);
        toast.success(response.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        navigate("/AdminDashboard/user");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="min-h-screen">
      <form
        onSubmit={editUser}
        className="flex flex-col w-96 m-auto mt-20 px-4 space-y-3 shadow-lg py-5 rounded-xl"
      >
        <label htmlFor="name">Full Name:</label>
        <input
          value={name}
          type="text"
          placeholder="Enter full name"
          id="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="border-b-2 border-black outline-none"
        />
        <label htmlFor="email">Email:</label>
        <input
          value={email}
          type="text"
          placeholder="Enter email"
          id="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="border-b-2 border-black outline-none"
        />
        <label htmlFor="phone">Phone:</label>
        <input
          value={phone}
          type="tel"
          placeholder="Enter users mobile number"
          id="phone"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          className="border-b-2 border-black outline-none"
        />
        <label htmlFor="role">Role:</label>
        <input
          value={role}
          type="text"
          placeholder="Enter users role"
          id="role"
          onChange={(e) => {
            setRole(e.target.value);
          }}
          className="border-b-2 border-black outline-none"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-gray-700 text-white rounded-xl"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditUser;
