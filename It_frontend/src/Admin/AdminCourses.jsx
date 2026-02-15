
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, Flip, toast } from "react-toastify";
import { AuthContext } from "../Context/AuthProvider";

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

  const [category1, setCategory1] = useState([]);

  const { user } = useContext(AuthContext);
  console.log(user);

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

  useEffect(() => {
    const getCategory = async () => {
      try {
        let response = await fetch("http://localhost:9000/api/getCategory");
        response = await response.json();
        console.log(response.showCategory);
        setCategory1(response.showCategory);
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
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

  const deleteCourseCheck = async ({ id, isDeleted }) => {
    const isConfirmed = confirm("Are you sure you want to delete the course?");
    if (isConfirmed) {
      try {
        let response = await fetch(
          `http://localhost:9000/api/deleteCourseUpdate/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ isDeleted }),
          },
        );
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          console.log(data);
          toast.success(data.message, {
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
          getCourses();
        } else {
          console.log(response.message);
          toast.error("hi", {
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
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const deleteCourseBy = async ({ courseName, courseId }) => {
    let response = await fetch("http://localhost:9000/api/savedCourseDelete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: user.name,
        userId: user._id,
        courseId,
        courseName,
      }),
    });
    response = await response.json();
    console.log(response);
  };

  const activeCourses = courses.filter((course) => course.isDeleted !== true);
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="ml-0 sm:ml-12 lg:ml-48 font-bold text-2xl sm:text-3xl lg:text-4xl mt-6 sm:mt-8 lg:mt-10">
        <h1>Courses</h1>
      </div>
      <form
        onSubmit={createCourse}
        className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-7 mt-6 sm:mt-8 lg:mt-10 rounded-md shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
          <div className="flex flex-col w-full">
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
              className="w-full outline-none border-2 border-gray-300 p-1 rounded-lg px-4 py-2"
            />
          </div>
          <div className="flex flex-col w-full">
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
              className="px-4 py-2 border-gray-300 border-2 rounded-lg w-full"
            >
              {category1.map((item) => (
                <>
                  {item.isActive === true ? (
                    <>
                      <option key={item._id} value="">
                        {item.category}
                      </option>
                    </>
                  ) : (
                    <>No values</>
                  )}
                </>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-full">
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
              className="border-2 border-gray-300 outline-none w-full p-1 rounded-lg px-4 py-2"
            />
          </div>
          <div className="flex flex-col w-full">
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
              className="border-2 border-gray-300 outline-none w-full p-1 rounded-lg px-4 py-2"
            />
          </div>
          <div className="flex flex-col w-full">
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
          <div className="flex flex-col w-full">
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
          <div className="flex flex-col w-full md:col-span-2">
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
              className="outline-none border-gray-300 border-2 px-4 py-2 file:bg-blue-500 file:text-white file:px-3 file:py-1 file:rounded-md w-full"
            />
          </div>
          <div className="flex flex-col w-full md:col-span-2">
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
              className="border-2 border-gray-300 outline-none h-32 sm:h-40 lg:h-44 w-full rounded-lg p-2"
            />
          </div>
          <div className="flex flex-col w-full md:col-span-2">
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
              className="border-2 border-gray-300 outline-none h-32 sm:h-40 lg:h-44 w-full rounded-lg p-2"
            />
          </div>
          <div className="flex flex-col w-full md:col-span-2">
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
              className="border-2 border-gray-300 outline-none h-32 sm:h-40 lg:h-44 w-full rounded-lg p-2"
            />
          </div>
        </div>

        <button
          type="submit"
          className="p-3 bg-green-500 rounded-xl text-white w-full mt-6 hover:bg-green-600 transition-colors"
        >
          Submit Course
        </button>
      </form>
      <div>
        {activeCourses.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 p-4 sm:p-5 mt-8 sm:mt-10 lg:mt-15 max-w-7xl mx-auto">
            {activeCourses.map((course) => {
              return (
                <div
                  key={course._id}
                  className="flex flex-col w-full h-auto shadow-sm shadow-slate-300 rounded-xl overflow-hidden"
                >
                  <div className="flex justify-center bg-gray-50 p-4">
                    <img
                      src={`http://localhost:9000/upload/${course.image}`}
                      alt={course.name}
                      className="h-32 sm:h-36 lg:h-40 object-contain"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h1 className="font-semibold text-lg sm:text-xl text-center mb-4">
                      {course.name}
                    </h1>
                    <div className="flex justify-center gap-x-3 mt-auto">
                      <button
                        onClick={() => {
                          navigate("/admin/courses/edit", {
                            state: course,
                          });
                        }}
                        className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors text-sm sm:text-base"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          deleteCourseBy({
                            courseName: course.name,
                            courseId: course._id,
                          });
                          deleteCourseCheck({ isDeleted: true, id: course._id });
                        }}
                        className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors text-sm sm:text-base"
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
          <div className="text-center text-gray-500 mt-10 text-lg">Product Not Found</div>
        )}
      </div>
    </div>
  );
}

export default AdminCourses;
