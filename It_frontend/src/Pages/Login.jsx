// import { useContext, useState } from "react";
// import { FaFacebookF, FaGithub, FaLinkedinIn, FaUser } from "react-icons/fa";
// import { RiLockPasswordFill } from "react-icons/ri";
// import { RiGoogleFill } from "react-icons/ri";
// import { Navigate, NavLink, useNavigate } from "react-router-dom";
// import { Bounce, toast, Zoom } from "react-toastify";
// import { AuthContext } from "../Context/AuthProvider";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const { dispatch } = useContext(AuthContext);

//   const navigate = useNavigate();

//   const formSubmit = async (e) => {
//     try {
//       e.preventDefault();

//       let response = await fetch("http://localhost:9000/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           password,
//         }),
//       });
//       const data = await response.json();
//       console.log(response);
//       if (response.ok) {
//         toast.success(data.message, {
//           position: "top-right",
//           autoClose: 1500,
//           hideProgressBar: false,
//           closeOnClick: false,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//           transition: Zoom,
//         });
//         console.log(data.token);
//         dispatch({ type: "Login", payload: { token: data.token } });
//         // localStorage.setItem("auth-token",response.token)
//         navigate("/");
//       } else {
//         console.log("Login Failed");
//         toast.error(data.message, {
//           position: "top-right",
//           autoClose: 1500,
//           hideProgressBar: false,
//           closeOnClick: false,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//           transition: Bounce,
//         });
//         setPassword("")
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Server not responding", {
//         position: "top-right",
//         autoClose: 2000,
//         transition: Bounce,
//       });
//     }
//   };
//   return (
//     <div className=" font-sans bg-gray-300 min-h-screen flex">
//       <div className="flex max-w-5xl mx-auto h-[550px]  bg-white rounded-3xl overflow-hidden flex flex-col md:flex-row">
//         <div className="md:flex md:w-1/2 flex flex-col justify-center items-center gap-5 text-white bg-blue-400 rounded-tr-[150px] rounded-br-[150px] rounded-l-3xl">
//           <h1 className="text-4xl font-bold">Hello, Welcome!</h1>
//           <p>Don't have an account?</p>
//           <NavLink
//             to="/signup"
//             className="border-2 border-white py-2 px-12 rounded-lg font-semibold"
//           >
//             Register
//           </NavLink>
//         </div>
//         <div className="w-[50%] flex flex-col items-center">
//           <div className=" mt-15">
//             <h1 className="text-4xl font-bold text-[#212529]">Login</h1>
//           </div>
//           <div className="mt-4">
//             <form onSubmit={formSubmit} className="flex flex-col">
//               <label htmlFor="email"></label>
//               {email === "" && (
//                 <FaUser
//                   size={16}
//                   className="relative top-13 left-80  flex text-gray-600"
//                 />
//               )}
//               <input
//                 value={email}
//                 onChange={(e) => {
//                   setEmail(e.target.value);
//                 }}
//                 type="email"
//                 placeholder="Email"
//                 required
//                 id="email"
//                 className="outline-none py-[10px] w-90 bg-gray-100 rounded-xl p-4 mt-5"
//               />
//               <label htmlFor="password"></label>
//               {password === "" && (
//                 <RiLockPasswordFill
//                   size={18}
//                   className="relative top-11 left-80 flex text-gray-600"
//                 />
//               )}
//               <input
//                 value={password}
//                 onChange={(e) => {
//                   setPassword(e.target.value);
//                 }}
//                 type="password"
//                 placeholder="Password"
//                 required
//                 id="password"
//                 className=" outline-none py-[10px] w-90 bg-gray-100 rounded-xl p-4 mt-3"
//               />

//               <h1 className=" text-center mt-4">Forget password?</h1>
//               <button
//                 type="submit"
//                 className="py-[10px] bg-blue-400 font-semibold text-white text-lg mt-5 rounded-xl cursor-pointer"
//               >
//                 Login
//               </button>
//               <p className=" text-center mt-5">
//                 or login with social platforms
//               </p>

//               <div className="flex justify-center gap-4 mt-5">
//                 <div className="border-2 border-gray-400 h-10 w-10 rounded-lg flex justify-center items-center">
//                   <RiGoogleFill size={18} />
//                 </div>
//                 <div className="border-2 border-gray-400 h-10 w-10 rounded-lg flex justify-center items-center">
//                   <FaFacebookF size={18} />
//                 </div>
//                 <div className="border-2 border-gray-400 h-10 w-10 rounded-lg flex justify-center items-center">
//                   <FaGithub size={18} />
//                 </div>
//                 <div className="border-2 border-gray-400 h-10 w-10 rounded-lg flex justify-center items-center">
//                   <FaLinkedinIn size={18} />
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

import { useContext, useState } from "react";
import { FaFacebookF, FaGithub, FaLinkedinIn, FaUser } from "react-icons/fa";
import { RiLockPasswordFill, RiGoogleFill } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { Bounce, toast, Zoom } from "react-toastify";
import { AuthContext } from "../Context/AuthProvider";
import { motion } from "framer-motion"; // ✅ ADDED (animation)

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response = await fetch("http://localhost:9000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message, { transition: Zoom, autoClose: 1500 });
        dispatch({ type: "Login", payload: { token: data.token } });
        navigate("/");
      } else {
        toast.error(data.message, { transition: Bounce });
        setPassword("");
      }
    } catch {
      toast.error("Server not responding", { transition: Bounce });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }} // ANIMATION
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="flex w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-xl"
      >
        <motion.div
          initial={{ x: -100, opacity: 0 }} // ANIMATION
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="hidden md:flex md:w-1/2 flex-col justify-center items-center gap-5
                     text-white bg-blue-400 rounded-tr-[150px] rounded-br-[150px]"
        >
          <h1 className="text-4xl font-bold">Hello, Welcome!</h1>
          <p>Don't have an account?</p>
          <NavLink
            to="/signup"
            className="border-2 border-white py-2 px-12 rounded-lg font-semibold
                       hover:bg-white hover:text-blue-400 transition"
          >
            Register
          </NavLink>
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }} // ANIMATION
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 flex flex-col items-center justify-center py-10"
        >
          <h1 className="text-4xl font-bold text-[#212529] mb-5">Login</h1>

          <form onSubmit={formSubmit} className="w-full max-w-sm">
            <div className="relative">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                required
                className="w-full bg-gray-100 rounded-xl p-4 outline-none"
              />
              <FaUser className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" />
            </div>

            <div className="relative mt-4">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                required
                className="w-full bg-gray-100 rounded-xl p-4 outline-none"
              />
              <RiLockPasswordFill className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" />
            </div>

            <p className="text-center mt-4 text-sm cursor-pointer">
              Forget password?
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }} // BUTTON ANIMATION
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className={`w-full py-3 bg-blue-400 text-white font-semibold rounded-xl mt-5 ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-400"
              } `}
            >
              {loading ? "logging in" : "Login"}
            </motion.button>

            <p className="text-center mt-5 text-sm">
              or login with social platforms
            </p>

            <div className="flex justify-center gap-4 mt-5">
              {[RiGoogleFill, FaFacebookF, FaGithub, FaLinkedinIn].map(
                (Icon, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.2 }} // HOVER ANIMATION
                    className="border-2 border-gray-400 h-10 w-10 rounded-lg flex justify-center items-center cursor-pointer"
                  >
                    <Icon size={18} />
                  </motion.div>
                )
              )}
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Login;
