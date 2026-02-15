// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../Context/AuthProvider";
// import { FaReplyAll, FaUsers } from "react-icons/fa";
// import { RiArrowGoBackFill, RiQuestionAnswerLine } from "react-icons/ri";
// import { FaUserPlus } from "react-icons/fa";
// import { motion } from "framer-motion";

// import { PieChart, Pie, Tooltip, Cell } from "recharts";
// import { MdOutlinePending } from "react-icons/md";
// import { TbUrgent } from "react-icons/tb";
// import { NavLink, useNavigate } from "react-router-dom";

// function Dashboard() {
//   const { user, state } = useContext(AuthContext);

//   const [inquiry, setInquiry] = useState([]);
//   const [student, setStudent] = useState([]);
//   const [enrollment, setEnrollment] = useState([]);
//   const [showInquiry, setShowInquiry] = useState(false);

//   const [activeView, setActiveView] = useState("dashboard");

//   const [activeIndex, setActiveIndex] = useState(-1);

//   const navigate = useNavigate();

//   const getInquiry = async () => {
//     try {
//       let response = await fetch("http://localhost:9000/api/getInquiry", {
//         method: "GET",
//       });
//       response = await response.json();
//       console.log(response.showInquiry);
//       setInquiry(response.showInquiry);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const countInquiries = inquiry?.length;
//   console.log(countInquiries);

//   const countRespond = inquiry.filter((item) => item.status === "responded").length;
//   const countUrgent = inquiry.filter((item) => item.status === "urgent").length;
//   const countPending = inquiry.filter((item) => item.status === "pending").length;

//   const InquiryStatus = [
//     {
//       title: "Responded",
//       value: countRespond,
//       icon: <FaReplyAll size={45} />,
//       color: "#FFBB28",
//     },
//     {
//       title: "Urgent",
//       value: countUrgent,
//       icon: <TbUrgent size={45} />,
//       color: "#FFBB28",
//     },
//     {
//       title: "Pending",
//       value: countPending,
//       icon: <MdOutlinePending size={45} />,
//       color: "#FFBB28",
//     },
//   ];
//   const getAllUser = async () => {
//     let response = await fetch("http://localhost:9000/api/getAllUser", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${state.token}`,
//       },
//     });
//     response = await response.json();
//     console.log(response);
//     setStudent(response.showUser);
//   };

//   const countUsers = student?.length;
//   console.log(countUsers);

//   const getEnrollment = async () => {
//     try {
//       let response = await fetch("http://localhost:9000/api/getEnrollment", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${state.token}`,
//         },
//       });
//       response = await response.json();
//       console.log(response.showEnrollment);
//       setEnrollment(response.showEnrollment);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getInquiry();
//     getAllUser();
//     getEnrollment();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const countEnrollment = enrollment.length;
//   console.log(countEnrollment);

//   const handleInquiry = () => {
//     setShowInquiry(!showInquiry);
//     console.log(showInquiry);
//   };

//   // console.log(respondedCount)
//   const stats = [
//     {
//       title: "Total Inquiries",
//       value: countInquiries,
//       icon: <RiQuestionAnswerLine size={45} />,
//       color: "#FFBB28",
//       button: () => {
//         handleInquiry();
//       },
//       view:"inquiry"
//     },
//     {
//       title: "Total Users",
//       value: countUsers,
//       icon: <FaUsers className="text-green-500" size={45} />,
//       color: "#00C49F",
//       view:"users"
//     },
//     {
//       title: "Total Enrollment",
//       value: countEnrollment,
//       icon: <FaUserPlus className="text-blue-400" size={45} />,
//       color: "#0088FE",
//       view:"enrollment  "
//     },
//   ];
//   const onPieEnter = (_, index) => {
//     setActiveIndex(index);
//   };
//   return (
//     <div className="flex flex-col">
//       {showInquiry ? (
//         <>
//           <div className="p-5 text-center">
//             <h1 className="text-3xl font-bold text-[#243433]">
//               Inquiries Status
//             </h1>
//           </div>
//           <div className="">
//             <button
//               className="flex items-center w-full justify-end px-2 gap-1"
//               onClick={() => setShowInquiry(!showInquiry)}
//             >
//               <RiArrowGoBackFill />
//               Go back
//             </button>
//           </div>
//           <div className="flex mx-auto gap-4 flex-wrap p-4">
//             {InquiryStatus.map((stat, index) => (
//               <NavLink to="inquiry">
//                 <motion.div
//                   initial={{ x: 100, opacity: 0 }} // ✅ ANIMATION
//                   animate={{ x: 0, opacity: 1 }}
//                   transition={{ duration: 0.6 }}
//                   key={index}
//                   className="p-4 text-center w-full md:w-96 flex flex-col shadow-md shadow-slate-400 rounded"
//                 >
//                   <div className=" flex justify-center">
//                     <span className=" p-2 rounded-full bg-gray-100 shadow shadow-slate-500">
//                       {stat.icon}
//                     </span>
//                   </div>
//                   <h1 className="font-semibold ">{stat.title}</h1>
//                   <p className="font-extrabold text-4xl">{stat.value}</p>
//                 </motion.div>
//               </NavLink>
//             ))}
//           </div>
//           <div className="mx-auto">
//             <div className="flex p-2 gap-3 justify-center">
//               <div className="flex items-center gap-2">
//                 <div className="h-5 w-12 bg-[#FFBB28]"></div>
//                 <h1>Responded</h1>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className=" h-5 w-12 bg-[#0088FE]"></div>
//                 <h1>Pending</h1>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className=" h-5 w-12 bg-[#00C49F]"></div>
//                 <h1>Urgent</h1>
//               </div>
//             </div>
//           </div>
//           <div className="flex justify-center">
//             <PieChart width={700} height={420} className="outline-none">
//               <Pie
//                 activeIndex={activeIndex}
//                 data={InquiryStatus}
//                 dataKey="value"
//                 nameKey="title"
//                 outerRadius={200}
//                 fill="green"
//                 onMouseEnter={onPieEnter}
//                 style={{ cursor: "pointer", outline: "none" }} // Ensure no outline on focus
//               >
//                 {stats.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </div>
//         </>
//       ) : (
//         <>
//           <div className=" h-20 flex justify-center items-center mt-4 border border-gray-200">
//             <h1 className="text-xl font-semibold sm:text-xl md:text-3xl">
//               Welcome Admin, <span className="font-bold"> {user?.name}</span>
//             </h1>
//           </div>
//           <div className="flex mx-auto gap-4 flex-wrap p-4">
//             {stats.map((stat, index) => (
//               <button onClick={() => stat.button()}>
//                 <motion.div
//                   initial={{ x: 100, opacity: 0 }} // ✅ ANIMATION
//                   animate={{ x: 0, opacity: 1 }}
//                   transition={{ duration: 0.6 }}
//                   key={index}
//                   className="p-4 text-center w-full md:w-96 flex flex-col shadow-md shadow-slate-400 rounded"
//                 >
//                   <div className=" flex justify-center">
//                     <span className=" p-2 rounded-full bg-gray-100 shadow shadow-slate-500">
//                       {stat.icon}
//                     </span>
//                   </div>
//                   <h1 className="font-semibold ">{stat.title}</h1>
//                   <p className="font-extrabold text-4xl">{stat.value}</p>
//                 </motion.div>
//               </button>
//             ))}
//           </div>
//           <div className="mx-auto">
//             <div className="flex p-2 gap-3 justify-center">
//               <div className="flex items-center gap-2">
//                 <div className="h-5 w-12 bg-[#FFBB28]"></div>
//                 <h1>Inquiries</h1>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className=" h-5 w-12 bg-[#0088FE]"></div>
//                 <h1>Enrollments</h1>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className=" h-5 w-12 bg-[#00C49F]"></div>
//                 <h1>Users</h1>
//               </div>
//             </div>
//           </div>
//           <div className="flex justify-center">
//             <PieChart width={700} height={420} className="outline-none">
//               <Pie
//                 activeIndex={activeIndex}
//                 data={stats}
//                 dataKey="value"
//                 nameKey="title"
//                 outerRadius={200}
//                 fill="green"
//                 onMouseEnter={onPieEnter}
//                 style={{ cursor: "pointer", outline: "none" }} // Ensure no outline on focus
//               >
//                 {stats.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Dashboard;
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { FaReplyAll, FaUsers } from "react-icons/fa";
import { RiArrowGoBackFill, RiQuestionAnswerLine } from "react-icons/ri";
import { FaUserPlus } from "react-icons/fa";
import { motion } from "framer-motion";

import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { MdOutlinePending } from "react-icons/md";
import { TbUrgent } from "react-icons/tb";
import StatCard from "../Components/Dashboard Components/StatCard";
import DashboardPie from "../Components/Dashboard Components/DashboardPie";
import InquiryView from "../Components/Dashboard Components/InquiryView";
import UserView from "../Components/Dashboard Components/UserView";
import EnrollmentView from "../Components/Dashboard Components/EnrollmentView";

function Dashboard() {
  const { user, state } = useContext(AuthContext);

  const [inquiry, setInquiry] = useState([]);
  const [student, setStudent] = useState([]);
  const [enrollment, setEnrollment] = useState([]);

  const [activeView, setActiveView] = useState("dashboard");

  const getInquiry = async () => {
    try {
      let response = await fetch("http://localhost:9000/api/getInquiry", {
        method: "GET",
      });
      response = await response.json();
      console.log(response.showInquiry);
      setInquiry(response.showInquiry);
    } catch (error) {
      console.log(error);
    }
  };

  const countInquiries = inquiry?.length;
  console.log(countInquiries);

  const countRespond = inquiry.filter(
    (item) => item.status === "responded"
  ).length;
  const countUrgent = inquiry.filter((item) => item.status === "urgent").length;
  const countPending = inquiry.filter(
    (item) => item.status === "pending"
  ).length;

  const InquiryStatus = [
    {
      title: "Responded",
      value: countRespond,
      icon: <FaReplyAll size={45} />,
      color: "#FFBB28",
    },
    {
      title: "Urgent",
      value: countUrgent,
      icon: <TbUrgent size={45} />,
      color: "#FFBB28",
    },
    {
      title: "Pending",
      value: countPending,
      icon: <MdOutlinePending size={45} />,
      color: "#FFBB28",
    },
  ];
  const getAllUser = async () => {
    let response = await fetch("http://localhost:9000/api/getAllUser", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    });
    response = await response.json();
    console.log(response);
    setStudent(response.showUser);
  };

  const countUsers = student?.length;
  console.log(countUsers);

  const getEnrollment = async () => {
    try {
      let response = await fetch("http://localhost:9000/api/getEnrollment", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      response = await response.json();
      console.log(response.showEnrollment);
      setEnrollment(response.showEnrollment);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getInquiry();
    getAllUser();
    getEnrollment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const countEnrollment = enrollment.length;
  console.log(countEnrollment);

  const stats = [
    {
      title: "Total Inquiries",
      value: countInquiries,
      icon: <RiQuestionAnswerLine size={45} />,
      color: "#FFBB28",
      view: "inquiry",
    },
    {
      title: "Total Users",
      value: countUsers,
      icon: <FaUsers className="text-green-500" size={45} />,
      color: "#00C49F",
      view: "users",
    },
    {
      title: "Total Enrollment",
      value: countEnrollment,
      icon: <FaUserPlus className="text-blue-400" size={45} />,
      color: "#0088FE",
      view: "enrollment",
    },
  ];

  return (
    <div className="flex flex-col">
      {activeView === "dashboard" && (
        <>
          <div className=" h-20 flex justify-center items-center mt-4 border border-gray-200">
            <h1 className="text-xl font-semibold sm:text-xl md:text-3xl">
              Welcome Admin, <span className="font-bold"> {user?.name}</span>
            </h1>
          </div>
          <div className="flex gap-4 flex-wrap mx-auto">
            {
              stats.map((item,i)=>(
                <StatCard
                key={i}
                title={item.title}
                value={item.value}
                icon={item.icon}
                onClick={()=>setActiveView(item.view)}
                />
              ))
            }
          </div>
          <DashboardPie data={stats}/>
        </>
      )}

      {/* inquiry view */}
      {
           activeView==="inquiry" &&(
              <InquiryView InquiryStatus={InquiryStatus} onBack={()=>setActiveView("dashboard")}/>
           )
      }
      {/* users view */}
      {

          activeView==="users" &&(
              <UserView users={student} onBack={()=>setActiveView("dashboard")}/>
          )
      }
      {/* enrollment view */}
      {
          activeView ==="enrollment" &&(
             <EnrollmentView enrollment={enrollment} onBack={()=>setActiveView("dashboard")}/>
          )
      }
    </div>
  );
}

export default Dashboard;
