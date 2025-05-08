import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";

function Inquiry() {
  const location = useLocation();
  console.log(location.state?.name);
  // const id = location.state._id;
  // console.log(id);
  const navigate = useNavigate();
  const [course, setCourse] = useState(location.state?.name || "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const createInquiry = async (e) => {
    e.preventDefault();

    try {
      let response = await fetch("http://localhost:9000/api/createInquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course,
          name,
          email,
          phone,
          message,
        }),
      });
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
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen ">
      <form
        onSubmit={createInquiry}
        className="flex flex-col w-[40%] m-auto space-y-5 shadow-lg p-10 my-10"
      >
        <label htmlFor="course">Course</label>
        <input
          value={course}
          onChange={(e) => {
            setCourse(e.target.value);
          }}
          type="text"
          placeholder="Enter course you want to study"
          id="course"
          required
          className="border-1 border-gray-400 outline-none p-2 rounded-lg"
        />
        <label htmlFor="name">Full Name:</label>
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          placeholder="Your Full Name"
          id="name"
          required
          className="border-1 border-gray-400 outline-none p-2 rounded-lg"
        />
        <label htmlFor="">Email:</label>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          placeholder="Your Email"
          id="email"
          required
          className="border-1 border-gray-400 outline-none p-2 rounded-lg"
        />
        <label htmlFor="phone">Mobile Number:</label>
        <input
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          type="tel"
          placeholder="Your mobile number"
          id="phone"
          required
          pattern="[0-9]{10}"
          className="border-1 border-gray-400 outline-none p-2 rounded-lg"
        />
        <label htmlFor="message">Message:</label>
        <textarea
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          placeholder="Tell us about you"
          required
          id="message"
          className="border-1 border-gray-400 outline-none p-2 rounded-lg"
        />
        <button
          onClick={() => {
            navigate(`/courses`);
          }}
          type="submit"
          className="py-2 bg-blue-500 text-white rounded-xl"
        >
          Submit Your Inquiry
        </button>
      </form>
    </div>
  );
}

export default Inquiry;
