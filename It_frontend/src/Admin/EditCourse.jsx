import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import { Bounce, toast } from "react-toastify";

function EditCourse() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.state);
  const id = location.state._id;
  console.log(id);

  const { state } = useContext(AuthContext);
  console.log(location.state.name);
  const [name, setName] = useState(location.state.name);
  const [overview, setOverview] = useState(location.state.overview);
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState(location.state.category);
  const [duration, setDuration] = useState(location.state.duration);
  const [scope, setScope] = useState(location.state.scope);
  const [fee, setFee] = useState(location.state.fee);
  const [technologies, setTechnologies] = useState(location.state.technologies);
  const [syllabus, setSyllabus] = useState(location.state.syllabus);
  const [benefits, setBenefits] = useState(location.state.benefits);

  const editCourse = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("overview", overview);
    formData.append("image", image);
    formData.append("category", category);
    formData.append("duration", duration);
    formData.append("scope", scope);
    formData.append("technologies", technologies);
    formData.append("fee", fee);
    formData.append("syllabus", syllabus);
    formData.append("benefits", benefits);

    let response = await fetch(`http://localhost:9000/api/editCourse/${id}`, {
      method: "PUT",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${state.token}`,
      },
      body:formData
    });
    if (response.ok) {
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
      navigate("/AdminDashboard/courses");
    } else {
      console.log("Error while editting course");
    }
  };

  return (
    <div>
      <form
        onSubmit={editCourse}
        className="flex w-[70%] m-auto p-7 gap-y-5 mt-10 rounded-md flex-wrap shadow-md"
      >
        <div className="flex flex-col w-80">
          <label htmlFor="name" className="font-semibold mb-1">
            Course Name:
          </label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            id="name"
            placeholder="Enter course name"
            className="w-80 outline-none border-2 border-gray-300 p-1 rounded-lg px-4 py-2"
          />
        </div>
        <div className="flex flex-col w-80 ml-18">
          <label htmlFor="category" className="font-semibold mb-1">
            Category:
          </label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            name="category"
            id="category"
            className="px-4 py-2 border-gray-300 border-2 w-80 rounded-lg"
          >
            <option value="">Select Category</option>
            <option value="Programming">Programming</option>
            <option value="Web Development">Web Development</option>
            <option value="AI">AI</option>
            <option value="Designing">Designing</option>
          </select>
        </div>
        <div className="flex flex-col w-80">
          <label htmlFor="duration" className="font-semibold mb-1">
            Course Duration:
          </label>
          <input
            value={duration}
            onChange={(e) => {
              setDuration(e.target.value);
            }}
            type="text"
            placeholder="Eg. 2.5 Months"
            id="duration"
            className="border-2 border-gray-300 outline-none w-80 p-1 rounded-lg px-4 py-2"
          />
        </div>
        <div className="flex flex-col w-80 ml-18">
          <label htmlFor="scope" className="font-semibold mb-1">
            Scope:
          </label>
          <input
            value={scope}
            onChange={(e) => {
              setScope(e.target.value);
            }}
            type="text"
            placeholder="Eg. AI developer Data Analyst"
            id="scope"
            className="border-2 border-gray-300 outline-none w-80 p-1 rounded-lg px-4 py-2"
          />
        </div>
        <div className="flex flex-col w-[84%]">
          <label htmlFor="technologies" className="font-semibold mb-1">
            Technologies:
          </label>
          <input
            value={technologies}
            onChange={(e) => {
              setTechnologies(e.target.value);
            }}
            type="text"
            placeholder="Eg. React, Node.js, MongoDB"
            id="technologies"
            className="border-2 border-gray-300 outline-none w-full p-1 rounded-lg px-4 py-2"
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="fee" className="font-semibold mb-1">
            Fee:
          </label>
          <input
            value={fee}
            onChange={(e) => {
              setFee(e.target.value);
            }}
            type="number"
            placeholder="Eg. 10,000"
            id="fee"
            className="border-2 border-gray-300 outline-none w-full p-1 rounded-lg px-4 py-2"
          />
        </div>
        <div className="flex flex-col w-[84%]">
          <label htmlFor="image" className="font-semibold mb-1">
            Image:
          </label>
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
            placeholder="Enter course's image"
            id="image"
            className="outline-none border-gray-300 border-2 px-4 py-2 file:bg-blue-500 file:text-white file:px-3 file:py-1 file:rounded-md"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="overview" className="font-semibold mb-1">
            Course Overview:
          </label>
          <textarea
            value={overview}
            onChange={(e) => {
              setOverview(e.target.value);
            }}
            type="text"
            placeholder="Enter description here"
            id="overview"
            required
            className="border-2 border-gray-300 outline-none h-44 w-full rounded-lg p-2"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="benefits" className="font-semibold mb-1">
            Course Benefits:
          </label>
          <textarea
            value={benefits}
            onChange={(e) => {
              setBenefits(e.target.value);
            }}
            type="text"
            placeholder="Enter benefits here Eg.Demand for mern stack developers is high in the job market.,"
            id="benefits"
            required
            className="border-2 border-gray-300 outline-none h-44 w-full rounded-lg p-2"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="syllabus" className="font-semibold mb-1">
            Course Syllabus:
          </label>
          <textarea
            value={syllabus}
            onChange={(e) => {
              setSyllabus(e.target.value);
            }}
            type="syllabus"
            placeholder="Enter syllabus here"
            id="syllabus"
            required
            className="border-2 border-gray-300 outline-none h-44 w-full rounded-lg p-2"
          />
        </div>
        <button
          type="submit"
          className="p-3 bg-green-500 rounded-xl text-white w-full"
        >
           Submit
        </button>
      </form>
    </div>
  );
}

export default EditCourse;
