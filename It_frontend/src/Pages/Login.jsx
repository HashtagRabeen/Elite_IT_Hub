import { useContext, useState } from "react";
import { FaFacebookF, FaGithub, FaLinkedinIn, FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { RiGoogleFill } from "react-icons/ri";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { Bounce, toast, Zoom } from "react-toastify";
import { AuthContext } from "../Context/AuthProvider";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const formSubmit = async (e) => {
    try {
      e.preventDefault();

      let response = await fetch("http://localhost:9000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
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
          transition: Zoom,
        });
        console.log(response.token);
        dispatch({ type: "Login", payload: { token: response.token } });
        // localStorage.setItem("auth-token",response.token)
        navigate("/");
      } else {
        console.log("Login Failed");
        toast.error("Login failed", {
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
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className=" font-sans bg-gray-300 min-h-screen flex">
      <div className="flex w-[60%] m-auto h-[550px]  bg-white rounded-3xl">
        <div className=" w-[50%] flex flex-col justify-center items-center gap-5 text-white bg-blue-400 rounded-tr-[150px] rounded-br-[150px] rounded-l-3xl">
          <h1 className="text-4xl font-bold">Hello, Welcome!</h1>
          <p>Don't have an account?</p>
          <NavLink
            to="/signup"
            className="border-2 border-white py-2 px-12 rounded-lg font-semibold"
          >
            Register
          </NavLink>
        </div>
        <div className="w-[50%] flex flex-col items-center">
          <div className=" mt-15">
            <h1 className="text-4xl font-bold text-[#212529]">Login</h1>
          </div>
          <div className="mt-4">
            <form onSubmit={formSubmit} className="flex flex-col">
              <label htmlFor="email"></label>
              {email === "" && (
                <FaUser
                  size={16}
                  className="relative top-13 left-80  flex text-gray-600"
                />
              )}
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                placeholder="Email"
                required
                id="email"
                className="outline-none py-[10px] w-90 bg-gray-100 rounded-xl p-4 mt-5"
              />
              <label htmlFor="password"></label>
              {password === "" && (
                <RiLockPasswordFill
                  size={18}
                  className="relative top-11 left-80 flex text-gray-600"
                />
              )}
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                placeholder="Password"
                required
                id="password"
                className=" outline-none py-[10px] w-90 bg-gray-100 rounded-xl p-4 mt-3"
              />

              <h1 className=" text-center mt-4">Forget password?</h1>
              <button
                type="submit"
                className="py-[10px] bg-blue-400 font-semibold text-white text-lg mt-5 rounded-xl cursor-pointer"
              >
                Login
              </button>
              <p className=" text-center mt-5">
                or login with social platforms
              </p>

              <div className="flex justify-center gap-4 mt-5">
                <div className="border-2 border-gray-400 h-10 w-10 rounded-lg flex justify-center items-center">
                  <RiGoogleFill size={18} />
                </div>
                <div className="border-2 border-gray-400 h-10 w-10 rounded-lg flex justify-center items-center">
                  <FaFacebookF size={18} />
                </div>
                <div className="border-2 border-gray-400 h-10 w-10 rounded-lg flex justify-center items-center">
                  <FaGithub size={18} />
                </div>
                <div className="border-2 border-gray-400 h-10 w-10 rounded-lg flex justify-center items-center">
                  <FaLinkedinIn size={18} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
