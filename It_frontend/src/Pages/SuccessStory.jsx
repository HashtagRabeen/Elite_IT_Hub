import React, { useEffect, useState } from "react";

function SuccessStory() {
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
  return (
    <div>
      <div className="h-96 font-bold text-4xl flex items-center flex-wrap">
            <div className=" ml-48 w-96 space-y-2">
                <h1>Meet Our <span className="text-[#0054C0]">Students</span> </h1>
                <h1>Read their success <span className="text-red-600 ">stories</span></h1>
            </div>
            <div className="ml-64">
                <img 
                className="h-56"
                src="https://media.istockphoto.com/id/1464123629/vector/student-graduation-cap-with-gold-tassel-and-ribbon.jpg?s=612x612&w=0&k=20&c=0Qk53SALe-1VveK__2if2coZOdZg0yurjVd3A9cFx_Q=" alt="" />
            </div>
      </div>
      <div className="h-32">
        <div className="mt-10 pl-36">
           <h1 className="text-[#212529] font-bold text-[22px]">Success Gallery of Our Students</h1>
           <p className="text-[#495057]">Thousands of students have completed their training with us & have been placed on jobs worldwide.</p>
        </div>
      </div>
      {success.length > 0 ? (
        <div className="flex w-[75%] m-auto gap-15 my-5 flex-wrap">
          {success.map((item) => {
            return (
              <div key={item._id} className="flex flex-col w-80 m-auto h-[350px] items-center font-sans shadow-md shadow-slate-200 rounded-lg">
                <div className="rounded-full h-24 w-24 overflow-hidden mt-8">
                  <img
                    src={`http://localhost:9000/upload/${item.image}`}
                    alt=""
                    className="h-24 rounded-full"
                  />{" "}
                </div>
                <div className=" mt-4 w-60 flex items-center flex-col">
                  <h1 className=" text-[#212529] font-semibold text-[18px] w-60 text-center h-8">{item.name}</h1>
                  <h1>{item.position}</h1>
                  <h1 className=" text-blue-700 w-60 text-center">@{item.workAt}</h1>
                  <h1 className=" mt-5 font-semibold text-[14px] text-[#495057]">College/Faculty</h1>
                  <h1 className=" text-[12px] mt-3">{item.college}/{item.faculty}</h1>
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

export default SuccessStory;
