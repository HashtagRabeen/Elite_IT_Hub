import { useEffect, useState } from "react";
import { Bounce, Flip, toast } from "react-toastify";

function AdminTestimonial() {
  const [name, setName] = useState("");
  const [courseEnrolled, setCourseEnrolled] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");

  const [testimonial, setTestimonial] = useState([]);

  const getTestimonial = async () => {
    try {
      let response = await fetch("http://localhost:9000/api/getTestimonial");
      response = await response.json();
      console.log(response.showTesti);
      setTestimonial(response.showTesti);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTestimonial();
  }, []);

  const createTestimonial = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("course", courseEnrolled);
    formData.append("message", message);
    formData.append("image", image);

    try {
      let response = await fetch(
        "http://localhost:9000/api/createTestimonial",
        {
          method: "POST",
          body: formData,
        }
      );
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
      getTestimonial();
      setName("");
      setMessage("");
      setCourseEnrolled("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTestimonial = async (id) => {
    try {
      let response = await fetch(
        `http://localhost:9000/api/deleteTestimonial/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        response = await response.json();
        toast.warn(response.message, {
          transition: Flip,
        });
        getTestimonial();
      } else {
        toast.info("Couldn't Delete Testimonial", {
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="ml-48 font-bold text-4xl mt-10">
        <h1>Student Testimonial</h1>
      </div>
      <div className="flex">
        <form
          onSubmit={createTestimonial}
          className="flex w-[70%] m-auto p-7 gap-y-5 mt-10 rounded-md flex-wrap shadow-md flex-col"
        >
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
          <label htmlFor="course">course Enrolled:</label>
          <input
            value={courseEnrolled}
            onChange={(e) => {
              setCourseEnrolled(e.target.value);
            }}
            type="text"
            placeholder="Enter course what he/she read"
            required
            id="course"
            className="outline-none border-2 border-gray-400 w-72 py-2 rounded-xl p-2"
          />
          <label htmlFor="message">Message:</label>
          <textarea
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            name="message"
            id="message"
            placeholder="Enter testimonial"
            required
            className="h-40 border-2 border-gray-400 p-2 rounded-xl outline-none"
          />
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
          <button
            type="submit"
            className="bg-orange-600 text-white py-2 rounded-xl"
          >
            Submit
          </button>
        </form>
      </div>
      <div>
        {testimonial.length > 0 ? (
          <div className="flex  my-5 flex-wrap gap-10 ml-12 mt-10">
            {testimonial.map((item) => {
              return (
                <div
                  key={item._id}
                  className="flex flex-col w-[40%] m-auto h-[500px]
              items-center font-sans shadow-md shadow-slate-200 rounded-lg bg-[#F9F9FB]"
                >
                  <div className="">
                    <p className="h-80 w-80">
                      {" "}
                      <span className="text-6xl opacity-50">"</span>
                      {item.message}
                    </p>
                  </div>
                  <div className="flex mt-2 w-80">
                    <div className="">
                      <img
                        src={`http://localhost:9000/upload/${item.image}`}
                        alt=""
                        className="h-24 rounded-full"
                      />{" "}
                    </div>
                    <div className=" w-44 flex flex-col justify-center ml-3">
                      <h1 className="font-semibold text-[#04183f]">
                        {item.name}
                      </h1>
                      <p className="text-[#04183FB3]">{item.course}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      deleteTestimonial(item._id);
                    }}
                    className="px-6 py-2 bg-red-500 w-full text-white rounded-xl mt-1"
                  >
                    Delete
                  </button>
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

export default AdminTestimonial;
