import { useEffect, useState } from "react";
import { Bounce, Slide, toast } from "react-toastify";

function AdminInquiry() {
  const [inquiry, setInquiry] = useState([]);
  const getInquiry = async () => {
    try {
      let response = await fetch("http://localhost:9000/api/getInquiry", {
        method: "GET",
        // headers:{
        //    Authorization:`Bearer ${state.token}`
        // }
      });
      response = await response.json();
      console.log(response.showInquiry);
      setInquiry(response.showInquiry);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getInquiry();
  }, []);
  const deleteInquiry = async (id) => {
    try {
      let response = await fetch(
        `http://localhost:9000/api/deleteInquiry/${id}`,
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
        getInquiry();
      } else {
        toast.info("Couldn't Delete Testimonial", {
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
        `http://localhost:9000/api/updateInquiryStatus/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (response.ok) {
        toast.success("🦄 Wow so easy!", {
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
        getInquiry();
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
  const pending = inquiry.filter((item) => item.status === "pending");
  const responded = inquiry.filter((item) => item.status === "responded");
  const urgent = inquiry.filter((item) => item.status === "urgent");

  return (
    <div className="w-[90%] m-auto">
      <Section
        title="Urgent Inquiries"
        data={urgent}
        onDelete={deleteInquiry}
        onUpdate={updateStatus}
      />
      <Section
        title="Pending Inquiries"
        data={pending}
        onDelete={deleteInquiry}
        onUpdate={updateStatus}
      />
      <Section
        title="Responded Inquiries"
        data={responded}
        onDelete={deleteInquiry}
        onUpdate={updateStatus}
      />
    </div>
  );
}
const Section = ({ title, data, onDelete, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
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
                <h1>Course: {item.course}</h1>
                <h1>Name: {item.name}</h1>
                <h1>Phone: {item.phone}</h1>
                <h1>Email: {item.email}</h1>
                <p>Message: {item.message}</p>
                <h1>Status: <span className="font-bold"> {item.status}</span></h1>
                <h1>Date: {new Date(item.createdAt).toLocaleString()}</h1>
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
                  onClick={()=>{
                     setIsOpen(!isOpen)
                  }}
                  className="py-1 bg-blue-600 text-white rounded w-40">
                    Change Status
                  </button>
                </div>
                {isOpen && (
                  <div className="flex gap-2 flex-wrap flex-col justify-center items-center bg-gray-200 py-4">
                    <button
                      onClick={() => {
                        onUpdate(item._id, "responded")
                      }}
                      className="py-1 bg-green-400 text-white rounded w-40"
                    >
                      Set to responded
                    </button>
                    <button
                      onClick={() => {
                        onUpdate(item._id, "urgent");
                      }}
                      className="py-1 bg-orange-500 text-white rounded w-40"
                    >
                      Set to Urgent
                    </button>
                    <button
                      onClick={() => {
                        onUpdate(item._id, "pending");
                      }}
                      className="py-1 bg-yellow-500 text-white rounded w-40"
                    >
                      Set to pending
                    </button>
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

export default AdminInquiry;
