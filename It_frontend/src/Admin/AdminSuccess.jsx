import React, { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";

function AdminSuccess() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [work, setWork] = useState("");
  const [college, setCollege] = useState("");
  const [faculty, setFaculty] = useState("");
  const [image, setImage] = useState("");
  const [success, setSuccess] = useState([]);

  const getSuccess = async () => {
    let response = await fetch("http://localhost:9000/api/getSuccess");
    response = await response.json();
    console.log(response.showSucess);
    setSuccess(response.showSucess);
  };
  useEffect(() => {
    getSuccess();
  }, []);

  const deleteSuccess = async (id) => {
    try {
      let response = await fetch(
        `http://localhost:9000/api/deleteSuccess/${id}`,
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
        getSuccess();
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
  const createSuccess = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("position", position);
    formData.append("workAt", work);
    formData.append("college", college);
    formData.append("faculty", faculty);
    formData.append("image", image);
    try {
      let response = await fetch("http://localhost:9000/api/createSuccess", {
        method: "POST",
        body: formData,
      });
      response = await response.json();
      console.log(response.message);
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
      getSuccess();
      setName("");
      setPosition("");
      setWork("");
      setCollege("");
      setFaculty("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="ml-48 font-bold text-4xl mt-10">
        <h1>Student Success Voice</h1>
      </div>
      <form
        onSubmit={createSuccess}
        className="flex w-[70%] m-auto p-7 gap-y-5 mt-10 rounded-md flex-wrap shadow-md"
      >
        <div className="flex flex-col w-80">
          <label htmlFor="name">Full Name:</label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            placeholder="Enter Full Name"
            required
            id="name"
            className="outline-none border-2 border-gray-400 w-72 py-2 rounded-xl p-2"
          />
        </div>
        <div className="flex flex-col w-80 ml-18">
          <label htmlFor="position">Position:</label>
          <input
            value={position}
            onChange={(e) => {
              setPosition(e.target.value);
            }}
            type="text"
            placeholder="Enter current job position"
            required
            id="position"
            className="outline-none border-2 border-gray-400 w-72 py-2 rounded-xl p-2"
          />
        </div>
        <div className="flex flex-col w-80">
          <label htmlFor="work">Works At:</label>
          <input
            value={work}
            onChange={(e) => {
              setWork(e.target.value);
            }}
            type="text"
            placeholder="Current work office"
            required
            id="work"
            className="outline-none border-2 border-gray-400 w-72 py-2 rounded-xl p-2"
          />
        </div>
        <div className="flex flex-col w-80 ml-18">
          <label htmlFor="course">Faculty:</label>
          <input
            value={faculty}
            onChange={(e) => {
              setFaculty(e.target.value);
            }}
            type="text"
            placeholder="College Faculty eg:BCA,BSC CSIT,BIT.."
            required
            id="course"
            className="outline-none border-2 border-gray-400 w-72 py-2 rounded-xl p-2"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="text">College:</label>
          <input
            value={college}
            onChange={(e) => {
              setCollege(e.target.value);
            }}
            type="text"
            className="border-2 border-gray-400 p-2 rounded-xl outline-none"
            placeholder="Enter current college"
            required
          />
        </div>
        <div className="flex flex-col w-[84%]">
          <label htmlFor="image">Image:</label>
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
            placeholder="Enter user image"
            required
            id="image"
            className="outline-none w-96 border-gray-300 border-2 px-4 py-2 file:bg-blue-500 file:text-white file:px-3 file:py-1 file:rounded-md"
          />
        </div>
        <div className="w-full">
          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded-xl w-full"
          >
            Submit
          </button>
        </div>
      </form>
      <div className="font-bold text-4xl flex items-center flex-wrap"></div>
      <div className="mt-10 pl-36">
        <h1 className="text-[#212529] font-bold text-[22px]">
          Success Gallery of Our Students
        </h1>
        <p className="text-[#495057]">
          Thousands of students have completed their training with us & have
          been placed on jobs worldwide.
        </p>
      </div>
      {success.length > 0 ? (
        <div className="flex w-[75%] m-auto gap-15 my-5 flex-wrap">
          {success.map((item) => {
            return (
              <div
                key={item._id}
                className="flex flex-col w-80 m-auto h-[400px] items-center font-sans shadow-md shadow-slate-200 rounded-lg"
              >
                <div className="rounded-full h-24 w-24 overflow-hidden mt-8">
                  <img
                    src={`http://localhost:9000/upload/${item.image}`}
                    alt=""
                    className="h-24 rounded-full"
                  />{" "}
                </div>
                <div className=" mt-4 w-60 flex items-center flex-col">
                  <h1 className=" text-[#212529] font-semibold text-[18px] w-60 text-center h-8">
                    {item.name}
                  </h1>
                  <h1>{item.position}</h1>
                  <h1 className=" text-blue-700 w-60 text-center">
                    @{item.workAt}
                  </h1>
                  <h1 className=" mt-5 text-[14px] text-[#495057]">
                    College/Faculty
                  </h1>
                  <h1 className=" text-[12px] mt-3">
                    {item.college}/{item.faculty}
                  </h1>
                </div>
                <div className="mt-5 space-x-6">
                  <button className="px-5 py-2 bg-gray-500 text-white rounded-xl">
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      deleteSuccess(item._id);
                    }}
                    className="px-5 py-2 bg-red-500 text-white rounded-xl"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default AdminSuccess;
