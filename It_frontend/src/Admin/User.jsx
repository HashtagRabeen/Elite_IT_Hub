import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MdDelete, MdOutlineModeEdit, MdOutlinePhone } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { IoMailOutline } from "react-icons/io5";
import { GrStatusGoodSmall } from "react-icons/gr";

function User() {
  const [student, setStudent] = useState("");
  const { state } = useContext(AuthContext);

  const [changeView, setChangeView] = useState(false);
  console.log(changeView);

  const navigate = useNavigate();

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
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
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
      <div className="text-center p-4">
        <h1 className="text-3xl font-bold text-[#032415]">Users Details</h1>
      </div>
      <div className="text-center space-x-2 py-2 border-b border-gray-300">
        <button
          className={`px-3 py-1 ${
            changeView === false ? "border-b-4 rounded-md border-[#008EB0]" : ""
          }`}
          onClick={() => setChangeView(false)}
        >
          Grid View
        </button>
        <button
          className={`px-3 py-1 ${
            changeView === true ? "border-b-4 rounded-md border-[#008EB0]" : ""
          }`}
          onClick={() => setChangeView(true)}
        >
          List View
        </button>
      </div>
      {changeView === false && (
        <div>
          {student?.length > 0 ? (
            <div className="flex gap-10 flex-wrap justify-center my-10">
              {student.map((item) => {
                return (
                  <div
                    key={item._id}
                    className=" h-52 w-96 flex flex-col justify-center pl-10 shadow-lg shadow-gray-200 rounded-lg bg-white"
                  >
                    <h1>
                      <span className="text-[#008EB0] py-1 px-4 rounded-4xl font-semibold">
                        {item.role?.toUpperCase()}
                      </span>
                    </h1>
                    <div className="mt-5">
                      <h1 className="flex items-center gap-2">
                        <span>
                          <CiUser size={20} />
                        </span>{" "}
                        {item.name}
                      </h1>
                      <h1 className="flex items-center gap-2">
                        <span>
                          <MdOutlinePhone size={20} />
                        </span>{" "}
                        {item.phone}
                      </h1>
                      <h1 className="flex items-center gap-2">
                        {" "}
                        <span>
                          <IoMailOutline size={20} />
                        </span>{" "}
                        {item.email}
                      </h1>
                      <h1 className="flex items-center gap-2">
                        {" "}
                        <span>
                          <GrStatusGoodSmall />
                        </span>{" "}
                        {item.status}
                      </h1>
                      <div className="space-x-4 mt-2">
                        <button
                          onClick={() => {
                            navigate("/AdminDashboard/edituser", {
                              state: item,
                            });
                          }}
                          className="bg-gray-700 text-white px-4 py-1 rounded-md text-sm hover:cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            deleteUser(item._id);
                          }}
                          className="bg-red-500 text-white px-4 py-1 rounded-md text-sm hover:cursor-pointer"
                        >
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
      )}
      {changeView === true &&
        (student?.length > 0 ? (
          <div>
            <table className="shadow w-32 md:w-96 lg:w-full">
              <thead className="border bg-[#18b1af] text-white">
                <tr>
                  <th className="text-left px-6 py-3">Name</th>
                  <th className="text-left px-6 py-3">Role</th>
                  <th className="text-left px-6 py-3">Email</th>
                  <th className="text-left px-6 py-3">Phone</th>
                  <th className="text-left px-6 py-3">Status</th>
                  <th className="text-left px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {student.map((user) => (
                  <tr key={user._id} className="">
                    <td className="text-left px-6 py-3">{user.name}</td>
                    <td className="text-left px-6 py-3">{user.role}</td>
                    <td className="text-left px-6 py-3">{user.email}</td>
                    <td className="text-left px-6 py-3">{user.phone}</td>
                    <td className="text-left px-6 py-3">{user.status}</td>
                    <td className="space-x-2 text-center">
                      <button
                        onClick={() => {
                          navigate("/AdminDashboard/edituser", {
                            state: user,
                          });
                        }}
                        className="bg-gray-700 text-white px-4 py-1 rounded-lg"
                      >
                        <MdOutlineModeEdit />
                      </button>
                      <button
                        onClick={() => {
                          deleteUser(user._id);
                        }}
                        className="bg-red-500 text-white px-4 py-1 rounded-lg"
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <></>
        ))}
    </div>
  );
}

export default User;
