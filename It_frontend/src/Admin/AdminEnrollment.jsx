// import { useContext, useEffect, useState } from "react";
// import { Bounce, Slide, toast } from "react-toastify";
// import { AuthContext } from "../Context/AuthProvider";
// function AdminEnrollment() {
//   const [enrollment, setEnrollment] = useState([]);
//   const{state}=useContext(AuthContext)
//   const getEnrollment = async () => {
//     try {
//       let response = await fetch("http://localhost:9000/api/getEnrollment", {
//         method: "GET",
//         headers:{
//            Authorization:`Bearer ${state.token}`
//         }
//       });
//       response = await response.json();
//       console.log(response.showEnrollment);
//       setEnrollment(response.showEnrollment);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getEnrollment();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//   const deleteEnrollment = async (id) => {
//     try {
//       let response = await fetch(
//         `http://localhost:9000/api/deleteEnrollment/${id}`,
//         {
//           method: "DELETE",
//         }
//       );
//       if (response.ok) {
//         response = await response.json();
//         console.log(response.message);
//         toast.info(response.message, {
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
//         getEnrollment();
//       } else {
//         toast.info("Couldn't delete enrollment", {
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
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const updateStatus = async (id, newStatus) => {
//     try {
//       const response = await fetch(
//         `http://localhost:9000/api/updateEnrollmentStatus/${id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ paymentStatus: newStatus }),
//         }
//       );
//       if (response.ok) {
//         toast.success(response.message, {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: false,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//           transition: Slide,
//         });
//         getEnrollment();
//       } else {
//         toast.error("Failed to update status", {
//           position: "top-right",
//           autoClose: 1500,
//           hideProgressBar: false,
//           closeOnClick: false,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//           transition: Slide,
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const pending = enrollment.filter((item) => item.paymentStatus === "pending");
//   const completed = enrollment.filter(
//     (item) => item.paymentStatus === "completed"
//   );
//   const failed = enrollment.filter((item) => item.paymentStatus === "failed");

//   return (
//     <div className="w-[90%] m-auto">
//       <Section
//         title="Pending Enrollments"
//         data={pending}
//         onDelete={deleteEnrollment}
//         onUpdate={updateStatus}
//       />
//       <Section
//         title="Completed Enrollments"
//         data={completed}
//         onDelete={deleteEnrollment}
//         onUpdate={updateStatus}
//       />
//       <Section
//         title="Failed Enrollments"
//         data={failed}
//         onDelete={deleteEnrollment}
//         onUpdate={updateStatus}
//       />
//     </div>
//   );
// }
// const Section = ({ title, data, onDelete, onUpdate }) => {
//   const [openId, setOpenId] = useState(null);
//   return (
//     <div className=" mt-5 shadow-xl py-5">
//       <h1 className="text-center text-3xl font-bold mt-5 underline">{title}</h1>
//       {data.length > 0 ? (
//         <div className="flex flex-wrap gap-10">
//           {data.map((item) => {
//             return (
//               <div
//                 key={item._id}
//                 className="flex flex-col w-96 m-auto h-full justify-center space-y-4 mt-10 shadow-lg p-3 rounded-xl  border-gray-300 border-2"
//               >
//                 <h1>UserID:{item.userId}</h1>
//                 <h1>CourseID:{item.courseId}</h1>
//                 <h1>Course: {item.course}</h1>
//                 <h1>Name: {item.name}</h1>
//                 <h1>Phone: {item.phone}</h1>
//                 <h1>Address: {item.address}</h1>
//                 <h1>Email: {item.email}</h1>
//                 <p>Academic Level: {item.academic}</p>
//                 <h1>
//                   Payment Status:{" "}
//                   <span className="font-bold"> {item.paymentStatus}</span>
//                 </h1>
//                 <h1>Date: {new Date(item.enrolledAt).toLocaleString()}</h1>
//                 <div className="flex justify-center gap-2">
//                   <button
//                     onClick={() => {
//                       onDelete(item._id);
//                     }}
//                     className="py-1 bg-red-500 text-white rounded-xl w-40"
//                   >
//                     Delete
//                   </button>
//                 </div>
//                 <div className="text-center">
//                   <button
//                     onClick={() => {
//                       setOpenId(openId === item._id ? null : item._id);
//                     }}
//                     className="py-1 bg-blue-600 text-white rounded w-40"
//                   >
//                     Change Status
//                   </button>
//                 </div>
//                 {openId === item._id && (
//                   <div className="flex gap-2 flex-wrap flex-col justify-center items-center bg-gray-200 py-4">
//                     {item.paymentStatus !== "completed" && (
//                       <button
//                         onClick={() => {
//                           onUpdate(item._id, "completed");
//                         }}
//                         className="py-1 bg-green-400 text-white rounded w-40"
//                       >
//                         Set to Completed
//                       </button>
//                     )}
//                     {item.paymentStatus !== "pending" && (
//                       <button
//                         onClick={() => {
//                           onUpdate(item._id, "pending");
//                         }}
//                         className="py-1 bg-orange-500 text-white rounded w-40"
//                       >
//                         Set to Pending
//                       </button>
//                     )}
//                     {item.paymentStatus !== "failed" && (
//                       <button
//                         onClick={() => {
//                           onUpdate(item._id, "failed");
//                         }}
//                         className="py-1 bg-yellow-500 text-white rounded w-40"
//                       >
//                         Set to Failed
//                       </button>
//                     )}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       ) : (
//         <div></div>
//       )}
//     </div>
//   );
// };

// export default AdminEnrollment;



// import { useContext, useEffect, useState } from "react";
// import { Bounce, Slide, toast } from "react-toastify";
// import { AuthContext } from "../Context/AuthProvider";
// function AdminEnrollment() {
//   const [enrollment, setEnrollment] = useState([]);
//   const{state}=useContext(AuthContext)
//   const getEnrollment = async () => {
//     try {
//       let response = await fetch("http://localhost:9000/api/getEnrollment", {
//         method: "GET",
//         headers:{
//            Authorization:`Bearer ${state.token}`
//         }
//       });
//       response = await response.json();
//       console.log(response.showEnrollment);
//       setEnrollment(response.showEnrollment);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getEnrollment();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//   const deleteEnrollment = async (id) => {
//     try {
//       let response = await fetch(
//         `http://localhost:9000/api/deleteEnrollment/${id}`,
//         {
//           method: "DELETE",
//         }
//       );
//       if (response.ok) {
//         response = await response.json();
//         console.log(response.message);
//         toast.info(response.message, {
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
//         getEnrollment();
//       } else {
//         toast.info("Couldn't delete enrollment", {
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
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const updateStatus = async (id, newStatus) => {
//     try {
//       const response = await fetch(
//         `http://localhost:9000/api/updateEnrollmentStatus/${id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ paymentStatus: newStatus }),
//         }
//       );
//       if (response.ok) {
//         toast.success(response.message, {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: false,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//           transition: Slide,
//         });
//         getEnrollment();
//       } else {
//         toast.error("Failed to update status", {
//           position: "top-right",
//           autoClose: 1500,
//           hideProgressBar: false,
//           closeOnClick: false,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//           transition: Slide,
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const pending = enrollment.filter((item) => item.paymentStatus === "pending");
//   const completed = enrollment.filter(
//     (item) => item.paymentStatus === "completed"
//   );
//   const failed = enrollment.filter((item) => item.paymentStatus === "failed");

//   return (
//     <div className="w-[90%] m-auto">
//       <Section
//         title="Pending Enrollments"
//         data={pending}
//         onDelete={deleteEnrollment}
//         onUpdate={updateStatus}
//       />
//       <Section
//         title="Completed Enrollments"
//         data={completed}
//         onDelete={deleteEnrollment}
//         onUpdate={updateStatus}
//       />
//       <Section
//         title="Failed Enrollments"
//         data={failed}
//         onDelete={deleteEnrollment}
//         onUpdate={updateStatus}
//       />
//     </div>
//   );
// }
// const Section = ({ title, data, onDelete, onUpdate }) => {
//   const [openId, setOpenId] = useState(null);
//   return (
//     <div className=" mt-5 shadow-xl py-5">
//       <h1 className="text-center text-3xl font-bold mt-5 underline">{title}</h1>
//       {data.length > 0 ? (
//         <div className="flex flex-wrap gap-10">
//           {data.map((item) => {
//             return (
//               <div
//                 key={item._id}
//                 className="flex flex-col w-96 m-auto h-full justify-center space-y-4 mt-10 shadow-lg p-3 rounded-xl  border-gray-300 border-2"
//               >
//                 <h1>UserID:{item.userId}</h1>
//                 <h1>CourseID:{item.courseId}</h1>
//                 <h1>Course: {item.course}</h1>
//                 <h1>Name: {item.name}</h1>
//                 <h1>Phone: {item.phone}</h1>
//                 <h1>Address: {item.address}</h1>
//                 <h1>Email: {item.email}</h1>
//                 <p>Academic Level: {item.academic}</p>
//                 <h1>
//                   Payment Status:{" "}
//                   <span className="font-bold"> {item.paymentStatus}</span>
//                 </h1>
//                 <h1>Date: {new Date(item.enrolledAt).toLocaleString()}</h1>
//                 <div className="flex justify-center gap-2">
//                   <button
//                     onClick={() => {
//                       onDelete(item._id);
//                     }}
//                     className="py-1 bg-red-500 text-white rounded-xl w-40"
//                   >
//                     Delete
//                   </button>
//                 </div>
//                 <div className="text-center">
//                   <button
//                     onClick={() => {
//                       setOpenId(openId === item._id ? null : item._id);
//                     }}
//                     className="py-1 bg-blue-600 text-white rounded w-40"
//                   >
//                     Change Status
//                   </button>
//                 </div>
//                 {openId === item._id && (
//                   <div className="flex gap-2 flex-wrap flex-col justify-center items-center bg-gray-200 py-4">
//                     {item.paymentStatus !== "completed" && (
//                       <button
//                         onClick={() => {
//                           onUpdate(item._id, "completed");
//                         }}
//                         className="py-1 bg-green-400 text-white rounded w-40"
//                       >
//                         Set to Completed
//                       </button>
//                     )}
//                     {item.paymentStatus !== "pending" && (
//                       <button
//                         onClick={() => {
//                           onUpdate(item._id, "pending");
//                         }}
//                         className="py-1 bg-orange-500 text-white rounded w-40"
//                       >
//                         Set to Pending
//                       </button>
//                     )}
//                     {item.paymentStatus !== "failed" && (
//                       <button
//                         onClick={() => {
//                           onUpdate(item._id, "failed");
//                         }}
//                         className="py-1 bg-yellow-500 text-white rounded w-40"
//                       >
//                         Set to Failed
//                       </button>
//                     )}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       ) : (
//         <div></div>
//       )}
//     </div>
//   );
// };

// export default AdminEnrollment;



import { useContext, useEffect, useState } from "react";
import { Bounce, Slide, toast } from "react-toastify";
import { AuthContext } from "../Context/AuthProvider";

function AdminEnrollment() {
  const [enrollment, setEnrollment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { state } = useContext(AuthContext);

  const getEnrollment = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("http://localhost:9000/api/getEnrollment", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setEnrollment(data.showEnrollment || []);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      setError(error.message);
      toast.error("Failed to load enrollments", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEnrollment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteEnrollment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this enrollment?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:9000/api/deleteEnrollment/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message || "Enrollment deleted successfully", {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
          transition: Bounce,
        });
        getEnrollment();
      } else {
        toast.error("Couldn't delete enrollment", {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error("Error deleting enrollment:", error);
      toast.error("An error occurred while deleting", {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:9000/api/updateEnrollmentStatus/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.token}`,
          },
          body: JSON.stringify({ paymentStatus: newStatus }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast.success(
          data.message || `Status updated to ${newStatus} successfully`,
          {
            position: "top-right",
            autoClose: 2000,
            theme: "light",
            transition: Slide,
          }
        );
        getEnrollment();
      } else {
        toast.error("Failed to update status", {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
          transition: Slide,
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("An error occurred while updating status", {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
    }
  };

  const pending = enrollment.filter((item) => item.paymentStatus === "pending");
  const completed = enrollment.filter(
    (item) => item.paymentStatus === "completed"
  );
  const failed = enrollment.filter((item) => item.paymentStatus === "failed");

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading enrollments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h3 className="text-red-800 font-semibold text-lg mb-2">
            Error Loading Enrollments
          </h3>
          <p className="text-red-600">{error}</p>
          <button
            onClick={getEnrollment}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">
            Enrollment Management
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard
              title="Total Enrollments"
              value={enrollment.length}
              color="blue"
              icon="📊"
            />
            <StatCard
              title="Pending"
              value={pending.length}
              color="yellow"
              icon="⏳"
            />
            <StatCard
              title="Completed"
              value={completed.length}
              color="green"
              icon="✅"
            />
            <StatCard
              title="Failed"
              value={failed.length}
              color="red"
              icon="❌"
            />
          </div>
        </div>

        <Section
          title="Pending Enrollments"
          data={pending}
          onDelete={deleteEnrollment}
          onUpdate={updateStatus}
          statusColor="yellow"
        />
        <Section
          title="Completed Enrollments"
          data={completed}
          onDelete={deleteEnrollment}
          onUpdate={updateStatus}
          statusColor="green"
        />
        <Section
          title="Failed Enrollments"
          data={failed}
          onDelete={deleteEnrollment}
          onUpdate={updateStatus}
          statusColor="red"
        />
      </div>
    </div>
  );
}

const StatCard = ({ title, value, color, icon }) => {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 text-blue-800",
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-800",
    green: "bg-green-50 border-green-200 text-green-800",
    red: "bg-red-50 border-red-200 text-red-800",
  };

  return (
    <div
      className={`${colorClasses[color]} border-2 rounded-lg p-4 text-center shadow-sm`}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm font-medium">{title}</div>
    </div>
  );
};

const Section = ({ title, data, onDelete, onUpdate, statusColor }) => {
  const [expandedId, setExpandedId] = useState(null);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "failed":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gray-800 px-6 py-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          {title}
          <span className="text-sm font-normal bg-white text-gray-800 px-3 py-1 rounded-full">
            {data.length}
          </span>
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Student Info
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Course Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Enrolled Date
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <>
                <tr
                  key={item._id}
                  className={`hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="text-sm font-semibold text-gray-900">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-500 font-mono">
                        ID: {item.userId}
                      </div>
                      <div className="text-xs text-gray-600">
                        {item.academic}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-gray-900">
                        {item.course}
                      </div>
                      <div className="text-xs text-gray-500 font-mono">
                        Course ID: {item.courseId}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="text-sm text-gray-900 flex items-center gap-1">
                        <span>📧</span>
                        <span className="text-xs">{item.email}</span>
                      </div>
                      <div className="text-sm text-gray-900 flex items-center gap-1">
                        <span>📱</span>
                        <span className="text-xs">{item.phone}</span>
                      </div>
                      <div className="text-xs text-gray-600 flex items-center gap-1">
                        <span>📍</span>
                        <span>{item.address}</span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadgeColor(
                        item.paymentStatus
                      )}`}
                    >
                      {item.paymentStatus.toUpperCase()}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {formatDate(item.enrolledAt)}
                    </div>
                  </td>

=                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() =>
                          setExpandedId(
                            expandedId === item._id ? null : item._id
                          )
                        }
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors font-medium"
                      >
                        {expandedId === item._id ? "Close" : "Manage"}
                      </button>
                      <button
                        onClick={() => onDelete(item._id)}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>

                {expandedId === item._id && (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 bg-gray-100">
                      <div className="max-w-2xl mx-auto">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3 text-center">
                          Change Payment Status
                        </h4>
                        <div className="flex gap-3 justify-center flex-wrap">
                          {item.paymentStatus !== "completed" && (
                            <button
                              onClick={() => onUpdate(item._id, "completed")}
                              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium shadow-sm"
                            >
                              ✅ Mark as Completed
                            </button>
                          )}
                          {item.paymentStatus !== "pending" && (
                            <button
                              onClick={() => onUpdate(item._id, "pending")}
                              className="px-6 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors font-medium shadow-sm"
                            >
                              ⏳ Mark as Pending
                            </button>
                          )}
                          {item.paymentStatus !== "failed" && (
                            <button
                              onClick={() => onUpdate(item._id, "failed")}
                              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium shadow-sm"
                            >
                              ❌ Mark as Failed
                            </button>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminEnrollment;

