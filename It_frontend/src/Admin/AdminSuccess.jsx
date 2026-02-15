import React, { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";

function AdminSuccess() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [work, setWork] = useState("");
  const [college, setCollege] = useState("");
  const [faculty, setFaculty] = useState("");
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState([]);

  const getSuccess = async () => {
    try {
      let response = await fetch("http://localhost:9000/api/getSuccess");
      response = await response.json();
      setSuccess(response.showSucess || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSuccess();
  }, []);

  const deleteSuccess = async (id) => {
    try {
      let response = await fetch(
        `http://localhost:9000/api/deleteSuccess/${id}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        const data = await response.json();
        toast.info(data.message, {
          position: "top-right",
          autoClose: 1500,
          transition: Bounce,
        });
        getSuccess();
      } else {
        toast.error("Couldn't delete testimonial");
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
      let response = await fetch(
        "http://localhost:9000/api/createSuccess",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      toast.success(data.message, {
        position: "top-right",
        autoClose: 2000,
        transition: Bounce,
      });

      getSuccess();
      setName("");
      setPosition("");
      setWork("");
      setCollege("");
      setFaculty("");
      setImage(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full pb-20">

      <div className="text-center sm:text-left sm:ml-36 font-bold text-2xl sm:text-4xl mt-10">
        <h1>Student Success Voice</h1>
      </div>

      <form
        onSubmit={createSuccess}
        className="w-[95%] sm:w-[90%] lg:w-[70%] mx-auto mt-10 p-6 grid grid-cols-1 sm:grid-cols-2 gap-5 rounded-md shadow-md"
      >
        <div className="flex flex-col">
          <label>Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-gray-400 p-2 rounded-xl outline-none"
            required
          />
        </div>

        <div className="flex flex-col">
          <label>Position</label>
          <input
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="border-2 border-gray-400 p-2 rounded-xl outline-none"
            required
          />
        </div>

        <div className="flex flex-col">
          <label>Works At</label>
          <input
            value={work}
            onChange={(e) => setWork(e.target.value)}
            className="border-2 border-gray-400 p-2 rounded-xl outline-none"
            required
          />
        </div>

        <div className="flex flex-col">
          <label>Faculty</label>
          <input
            value={faculty}
            onChange={(e) => setFaculty(e.target.value)}
            className="border-2 border-gray-400 p-2 rounded-xl outline-none"
            required
          />
        </div>

        <div className="flex flex-col sm:col-span-2">
          <label>College</label>
          <input
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            className="border-2 border-gray-400 p-2 rounded-xl outline-none"
            required
          />
        </div>

        <div className="flex flex-col sm:col-span-2">
          <label>Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="border-2 border-gray-300 p-2 rounded-xl
              file:bg-blue-500 file:text-white file:px-3 file:py-1 file:rounded-md"
            required
          />
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded-xl w-full hover:bg-green-700 transition"
          >
            Submit
          </button>
        </div>
      </form>

      <div className="mt-14 px-6 sm:px-36">
        <h1 className="text-[#212529] font-bold text-xl">
          Success Gallery of Our Students
        </h1>
        <p className="text-[#495057]">
          Thousands of students have completed their training and are placed
          worldwide.
        </p>
      </div>

      {success.length > 0 && (
        <div className="w-[95%] sm:w-[90%] lg:w-[75%] mx-auto my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {success.map((item) => (
            <div
              key={item._id}
              className="flex flex-col items-center p-6 shadow-md rounded-lg"
            >
              <div className="h-24 w-24 rounded-full overflow-hidden">
                <img
                  src={`http://localhost:9000/upload/${item.image}`}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <h1 className="mt-4 font-semibold text-lg text-center">
                {item.name}
              </h1>
              <p>{item.position}</p>
              <p className="text-blue-600">@{item.workAt}</p>

              <p className="mt-4 text-sm text-gray-600">
                {item.college} / {item.faculty}
              </p>

              <div className="mt-5 flex gap-4">
                <button className="px-4 py-2 bg-gray-500 text-white rounded-xl">
                  Edit
                </button>
                <button
                  onClick={() => deleteSuccess(item._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-xl"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminSuccess;
