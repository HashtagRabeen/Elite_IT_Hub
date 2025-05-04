import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function User() {
  const [student, setStudent] = useState("");
  const { state } = useContext(AuthContext);

  const navigate=useNavigate();

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
  useEffect(() => {
    getAllUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteUser = async (id) => {
    try {
      let response = await fetch(`http://localhost:9000/api/deleteUser/${id}`, {
        method: "DELETE",
        headers:{
            Authorization:`Bearer ${state.token}`
        }
      });
      if (response.ok) {
        response = await response.json();
        toast.success(response.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
        getAllUser();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        {student.length > 0 ? (
          <div className="flex gap-10 flex-wrap justify-center my-10">
            {student.map((item) => {
              return (
                <div
                  key={item._id}
                  className=" h-52 w-80 flex flex-col justify-center pl-10 shadow-lg shadow-gray-200 rounded-lg"
                >
                  <h1>
                    <span className="bg-green-500 text-white py-1 px-4 rounded-4xl">
                      {item.role}
                    </span>
                  </h1>
                  <div className="mt-5 font-semibold">
                    <h1 className="">Name: {item.name}</h1>
                    <h1>Phone: {item.phone}</h1>
                    <h1>Email: {item.email}</h1>
                    <div className="space-x-4 mt-2">
                      <button
                        onClick={() => {
                           navigate("/AdminDashboard/edituser",{state:item})
                        }}
                        className="bg-gray-700 text-white px-4 py-1 rounded-lg"
                      >
                        Edit
                      </button>
                      <button 
                      onClick={()=>{
                           deleteUser(item._id)
                      }}
                      className="bg-red-500 text-white px-4 py-1 rounded-lg">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default User;
