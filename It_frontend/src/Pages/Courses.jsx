import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Search from "../Components/Courses/Search";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [filterCourses, setFilterCourses] = useState([]); // state to store courses

  const getCourse = async () => {
    try {
      let response = await fetch("http://localhost:9000/api/getCourse");
      if (response.ok) {
        response = await response.json();
        setCourses(response.showCourse);
        console.log(response);
      } else {
        console.log("Error fetching courses");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterProduct = async (category) => {
    const filterCourse = courses.filter((item) => {
      return item.category === category;
    });
    setFilterCourses(filterCourse);
  };

  useEffect(() => {
    getCourse();
    filterProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="">
      <div className=" h-96 flex justify-center flex-col items-center bg-[#184f81]">
        <div className="w-[70%]">
          <h1 className="text-5xl text-white py-3 px-40 font-bold">
            Explore Our IT Training Courses
          </h1>
        </div>
        <div className=" mt-5 w-[70%]">
          <p className="px-40 text-white text-xl font-serif">
            Enhance your skills with our industry-relevant courses taught by
            experienced professionals. Choose from a variety of programs to
            boost your career in technology.
          </p>
        </div>
      </div>
      <Search/>
      <div className="font-semibold text-[28px] text-[2C3E50] flex justify-center h-28 items-center">
        <h1>Browse by Category</h1>
      </div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => {
            filterProduct([]);
          }}
          className=" h-10 w-15 flex items-center justify-center rounded-2xl bg-[#E0E0E0] hover:bg-[#3498db] hover:text-white"
        >
          All
        </button>
        <button
          onClick={() => {
            filterProduct("Programming");
          }}
          className="h-10 w-36 flex items-center justify-center rounded-2xl bg-[#E0E0E0] hover:bg-[#3498db] hover:text-white"
        >
          Programming
        </button>
        <button
          onClick={() => {
            filterProduct("Web Development");
          }}
          className=" h-10 w-40 flex items-center justify-center rounded-2xl bg-[#E0E0E0] hover:bg-[#3498db] hover:text-white"
        >
          Web development
        </button>
        <button
          onClick={() => {
            filterProduct("AI");
          }}
          className=" h-10 w-36 flex items-center justify-center rounded-2xl bg-[#E0E0E0] hover:bg-[#3498db] hover:text-white"
        >
          AI Courses
        </button>
        <button
          onClick={() => {
            filterProduct("Designing");
          }}
          className="h-10 w-36 flex items-center justify-center rounded-2xl bg-[#E0E0E0] hover:bg-[#3498db] hover:text-white"
        >
          Designing
        </button>
      </div>
      <div className="mt-10">
        {filterCourses.length > 0 ? (
          <div>
            <div className="flex justify-center m-auto gap-15 p-5 flex-wrap">
              {filterCourses.map((filterCourse) => {
                return (
                  <div
                    key={filterCourse._id}
                    className="flex flex-col w-72 shadow-sm shadow-slate-300 rounded-xl h-auto pb-5"
                  >
                    <NavLink to={`/courseDescription/${filterCourse._id}`}>
                      <div className="flex justify-center">
                        <img
                          src={`http://localhost:9000/upload/${filterCourse.image}`}
                          alt=""
                          className="h-40 rounded-xl"
                        />
                      </div>
                      <div>
                        <h1 className="font-semibold text-xl mt-2 pl-10">
                          {filterCourse.name}
                        </h1>
                      </div>
                    </NavLink>
                    <div>
                      <h1 className="pl-10 font-bold text-xl text-[#f85704] mt-2">
                        Rs.{filterCourse.fee}
                      </h1>
                    </div>
                    <div>
                      <p className="pl-10 mt-2 text-sm">
                        Category: {filterCourse.category}
                      </p>
                    </div>
                    <div className="flex justify-center gap-x-3 mt-3">
                      <NavLink
                        to={`/courseDescription/${filterCourse._id}`}
                        className="px-4 py-2 rounded-xl bg-[#6C757D] text-white text-[15px]"
                      >
                        View Details
                      </NavLink>
                      <NavLink
                        to="/enrollment"
                        state={filterCourse}
                        className="px-4 py-2 rounded-xl bg-[#FD7E14] text-white text-[15px]"
                      >
                        Enroll Now
                      </NavLink>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="">
            {courses.length > 0 ? (
              <div className="flex justify-center m-auto gap-15 p-5 flex-wrap">
                {courses.map((course) => {
                  return (
                    <div
                      key={course._id}
                      className="flex flex-col w-72 h-auto shadow-sm shadow-slate-300 rounded-xl pb-5"
                    >
                      <NavLink to={`/courseDescription/${course._id}`}>
                        <div className="flex justify-center">
                          <img
                            src={`http://localhost:9000/upload/${course.image}`}
                            alt=""
                            className="h-40"
                          />
                        </div>
                        <div>
                          <h1 className="font-semibold text-xl mt-2 pl-10">
                            {course.name}
                          </h1>
                        </div>
                      </NavLink>
                      <div>
                        <h1 className="pl-10 font-bold text-xl text-[#f85704] mt-2">
                          Rs.{course.fee}
                        </h1>
                      </div>
                      <div>
                        <p className="pl-10 mt-2 text-sm">
                          Category: {course.category}
                        </p>
                      </div>
                      <div className="flex justify-center gap-x-3 mt-3">
                        <NavLink
                          to={`/courseDescription/${course._id}`}
                          className="px-4 py-2 rounded-xl bg-[#6C757D] text-white text-[15px]"
                        >
                          View Details
                        </NavLink>
                        <NavLink
                          to="/enrollment"
                          state={course}
                          className="px-4 py-2 rounded-xl bg-[#FD7E14] text-white text-[15px]"
                        >
                          Enroll Now
                        </NavLink>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center text-2xl font-semibold text-red-500 my-5">Product Not Founds</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses;
