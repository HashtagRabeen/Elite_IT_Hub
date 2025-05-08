import { useEffect, useState } from "react";
import { Bounce, Slide, toast } from "react-toastify";
function AdminEnrollment() {
  const [enrollment, setEnrollment] = useState([]);
  const getEnrollment = async () => {
    try {
      let response = await fetch("http://localhost:9000/api/getEnrollment", {
        method: "GET",
        // headers:{
        //    Authorization:`Bearer ${state.token}`
        // }
      });
      response = await response.json();
      console.log(response.showEnrollment);
      setEnrollment(response.showEnrollment);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getEnrollment();
  }, []);
  const deleteEnrollment = async (id) => {
    try {
      let response = await fetch(
        `http://localhost:9000/api/deleteEnrollment/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        response = await response.json();
        console.log(response.message);
        toast.info(response.message, {
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
        getEnrollment();
      } else {
        toast.info("Couldn't delete enrollment", {
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
    } catch (error) {
      console.log(error);
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
          },
          body: JSON.stringify({ paymentStatus: newStatus }),
        }
      );
      if (response.ok) {
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
        getEnrollment();
      } else {
        toast.error("Failed to update status", {
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
    } catch (error) {
      console.log(error);
    }
  };
  const pending = enrollment.filter((item) => item.paymentStatus === "pending");
  const completed = enrollment.filter(
    (item) => item.paymentStatus === "completed"
  );
  const failed = enrollment.filter((item) => item.paymentStatus === "failed");

  return (
    <div className="w-[90%] m-auto">
      <Section
        title="Pending Enrollments"
        data={pending}
        onDelete={deleteEnrollment}
        onUpdate={updateStatus}
      />
      <Section
        title="Completed Enrollments"
        data={completed}
        onDelete={deleteEnrollment}
        onUpdate={updateStatus}
      />
      <Section
        title="Failed Enrollments"
        data={failed}
        onDelete={deleteEnrollment}
        onUpdate={updateStatus}
      />
    </div>
  );
}
const Section = ({ title, data, onDelete, onUpdate }) => {
  const [openId, setOpenId] = useState(null);
  return (
    <div className=" mt-5 shadow-xl py-5">
      <h1 className="text-center text-3xl font-bold mt-5 underline">{title}</h1>
      {data.length > 0 ? (
        <div className="flex flex-wrap gap-10">
          {data.map((item) => {
            return (
              <div
                key={item._id}
                className="flex flex-col w-96 m-auto h-full justify-center space-y-4 mt-10 shadow-lg p-3 rounded-xl  border-gray-300 border-2"
              >
                <h1>UserID:{item.userId}</h1>
                <h1>CourseID:{item.courseId}</h1>
                <h1>Course: {item.course}</h1>
                <h1>Name: {item.name}</h1>
                <h1>Phone: {item.phone}</h1>
                <h1>Address: {item.address}</h1>
                <h1>Email: {item.email}</h1>
                <p>Academic Level: {item.academic}</p>
                <h1>
                  Payment Status:{" "}
                  <span className="font-bold"> {item.paymentStatus}</span>
                </h1>
                <h1>Date: {new Date(item.enrolledAt).toLocaleString()}</h1>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => {
                      onDelete(item._id);
                    }}
                    className="py-1 bg-red-500 text-white rounded-xl w-40"
                  >
                    Delete
                  </button>
                </div>
                <div className="text-center">
                  <button
                    onClick={() => {
                      setOpenId(openId === item._id ? null : item._id);
                    }}
                    className="py-1 bg-blue-600 text-white rounded w-40"
                  >
                    Change Status
                  </button>
                </div>
                {openId === item._id && (
                  <div className="flex gap-2 flex-wrap flex-col justify-center items-center bg-gray-200 py-4">
                    {item.paymentStatus !== "completed" && (
                      <button
                        onClick={() => {
                          onUpdate(item._id, "completed");
                        }}
                        className="py-1 bg-green-400 text-white rounded w-40"
                      >
                        Completed
                      </button>
                    )}
                    {item.paymentStatus !== "pending" && (
                      <button
                        onClick={() => {
                          onUpdate(item._id, "pending");
                        }}
                        className="py-1 bg-orange-500 text-white rounded w-40"
                      >
                        Set to Pending
                      </button>
                    )}
                    {item.paymentStatus !== "failed" && (
                      <button
                        onClick={() => {
                          onUpdate(item._id, "failed");
                        }}
                        className="py-1 bg-yellow-500 text-white rounded w-40"
                      >
                        Set to Failed
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default AdminEnrollment;
