import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Bounce, Flip, toast } from "react-toastify";

function AdminCourses() {
  const [name, setName] = useState("");
  const [overview, setOverview] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [scope, setScope] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [fee, setFee] = useState("");
  const [syllabus, setSyllabus] = useState("");
  const [benefits, setBenefits] = useState("");

  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  const getCourses = async () => {
    let response = await fetch("http://localhost:9000/api/getCourse");
    response = await response.json();
    console.log(response.showCourse);
    setCourses(response.showCourse);
  };
  useEffect(() => {
    getCourses();
  }, []);

  const createCourse = async (e) => {
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

    try {
      let response = await fetch("http://localhost:9000/api/createCourse", {
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
      getCourses();
      setName("");
      setOverview("");
      setBenefits("");
      setDuration("");
      setFee("");
      setScope("");
      setTechnologies("");
      setCategory("");
      setSyllabus("");
    } catch (err) {
      console.log("Error", err);
    }
  };

  const deleteCourse = async (id) => {
    let response = await fetch(`http://localhost:9000/api/deleteCourse/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      response = await response.json();
      console.log(response);
      toast.warn(response.message, {
        transition: Flip,
      });
      getCourses();
    } else {
      toast("Course Not Found");
    }
  };
  return (
    <div>
       <div className="ml-48 font-bold text-4xl mt-10">
        <h1>Courses</h1>
      </div>
      <form
        onSubmit={createCourse}
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
            required
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
            required
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
            required
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
            required
            id="technologies"
            className="border-2 border-gray-300 outline-none w-full p-1 rounded-lg px-4 py-2"
          />
        </div>
        <div className="flex flex-col">
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
            required
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
            required
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
            type="text"
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
          Submit Course
        </button>
      </form>
      <div>
        {courses.length > 0 ? (
          <div className="flex justify-center m-auto gap-15 p-5 flex-wrap mt-15">
            {courses.map((course) => {
              return (
                <div
                  key={course._id}
                  className="flex flex-col w-72 h-[280px] shadow-sm shadow-slate-300 rounded-xl"
                >
                  <div className="flex justify-center">
                    <img
                      src={`http://localhost:9000/upload/${course.image}`}
                      alt=""
                      className="h-40"
                    />
                  </div>
                  <div>
                    <h1 className="font-semibold text-xl mt-2 flex justify-center">
                      {course.name}
                    </h1>
                  </div>
                  <div className="flex justify-center gap-x-3 mt-3">
                    <button
                      onClick={() => {
                        navigate("/AdminDashboard/editCourse", { state: course });
                      }}
                      className="px-4 py-2 rounded-xl bg-blue-500 text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        deleteCourse(course._id);
                      }}
                      className="px-4 py-2 rounded-xl bg-red-500 text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>Product Not Founds</div>
        )}
      </div>
    </div>
  );
}

export default AdminCourses;
