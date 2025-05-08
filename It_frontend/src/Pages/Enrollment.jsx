import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import { Slide, toast } from "react-toastify";

function Enrollment() {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const { state } = useContext(AuthContext);

  const [courseId, setCourseId] = useState("");
  const [course, setCourse] = useState("");
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState("");
  const [academic, setAcademic] = useState("");

  const [showPaymentDiv, setShowPaymentDiv] = useState(false);

  useEffect(() => {
    if (location.state?.name && location.state?._id && location.state?.fee) {
      console.log(location.state.name);
      setCourse(location.state.name);
      setCourseId(location.state._id);
    } else {
      navigate("/", { replace: true });
    }
  }, [location.state, navigate]); // this is done because state passed through navlink so it renders and state disappears

  const createEnrollment = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        `http://localhost:9000/api/createEnrollment/${courseId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.token}`,
          },
          body: JSON.stringify({
            course,
            name,
            email,
            phone,
            address,
            academic,
          }),
        }
      );
      response = await response.json();
      console.log(response);
      toast.success(response.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
      setShowPaymentDiv(true);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    }
  };
  return (
    <div className="min-h-screen">
      <div className="m-auto w-[60%] my-4">
        <h1 className="text-2xl font-bold">Online Admission</h1>
        <p className="font-normal text-lg text-[#495057]">
          Please fill out the form below and get enrolled now! All Asterisks (*)
          fields are mandatory to fill-up.
        </p>
      </div>
      <form
        onSubmit={createEnrollment}
        className="flex flex-col w-[60%] m-auto space-y-2 p-5 shadow-xl rounded-lg"
      >
        <label htmlFor="course" className="text-xl font-semibold">
          Course <span className="text-red-600">*</span>
        </label>
        <input
          value={course}
          onChange={(e) => {
            setCourse(e.target.value);
          }}
          type="text"
          placeholder="Your Course"
          id="course"
          required
          className="border-1 border-gray-300 outline-none p-2 rounded-lg"
        />
        <label htmlFor="name" className="text-xl font-semibold">
          Full Name: <span className="text-red-600">*</span>
        </label>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          id="name"
          placeholder="Your Full Name"
          required
          className="border-1 border-gray-300 outline-none p-2 rounded-lg"
        />
        <label htmlFor="email" className="text-xl font-semibold">
          Email <span className="text-red-600">*</span>
        </label>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          id="email"
          placeholder="Your email"
          required
          className="border-1 border-gray-300 outline-none p-2 rounded-lg"
        />
        <label htmlFor="tel" className="text-xl font-semibold">
          Mobile <span className="text-red-600">*</span>
        </label>
        <input
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          type="tel"
          id="tel"
          placeholder="Your Mobile Number"
          required
          className="border-1 border-gray-300 outline-none p-2 rounded-lg"
        />
        <label htmlFor="address" className="text-xl font-semibold">
          Address <span className="text-red-600">*</span>
        </label>
        <input
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          type="text"
          id="address"
          placeholder="Your Address"
          required
          className="border-1 border-gray-300 outline-none p-2 rounded-lg"
        />
        <label htmlFor="academicLevel" className="text-xl font-semibold">
          Academic Level <span className="text-red-600">*</span>
        </label>
        <select
          value={academic}
          onChange={(e) => {
            setAcademic(e.target.value);
          }}
          name=""
          id=""
          className="border-1 border-gray-300 outline-none p-2 text-xl rounded-xl"
          required
        >
          <option value="">Select Level</option>
          <option value="+2">+2</option>
          <option value="Bachelors">Bachelors</option>
          <option value="Masters">Masters</option>
          <option value="Phd">Phd</option>
          <option value="Other">Other</option>
        </select>
        <button
          type="submit"
          className="py-2 px-6 bg-orange-500 text-white mt-2 rounded-xl"
        >
          Submit
        </button>
      </form>
      {showPaymentDiv && (
        <div className=" fixed inset-0 backdrop-blur-xs flex justify-center items-center">
          <div className=" bg-white p-8 rounded-lg shadow-2xl w-[25%] text-center space-y-5">
            <h1 className="text-2xl font-bold">Proceed to Payment</h1>
            <p className="text-xl font-semibold">Course Name: {location.state?.name}</p>
            <p className="text-lg">Total Fee: <span className="text-[#FF5733]">Rs.{location.state?.fee}</span></p>
            <NavLink to="/payment" state={{totalWithVat:location.state?.fee,total_items:1}} className="bg-orange-500 text-white py-2 px-5 rounded-xl">Go to Payment</NavLink>
          </div>
        </div>
      )}
    </div>
  );
}
export default Enrollment;
