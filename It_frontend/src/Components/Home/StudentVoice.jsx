import { useEffect, useState } from "react";

function StudentVoice() {
  const [voice, setVoice] = useState([]);

  const getTestimonial = async () => {
    let response = await fetch("http://localhost:9000/api/getTestimonial");
    response = await response.json();
    console.log(response.showTesti);
    setVoice(response.showTesti);
  };
  useEffect(() => {
    getTestimonial();
  }, []);
  return (
    <div className=" flex h-[450px] bg-[#146aa7]">
      <div className="w-[380px] mt-28 ml-52 h-52 text-white">
        <h1 className=" text-3xl font-bold">
          Our Student Voice
        </h1>
        <p className="mt-8 text-[18px]">
          Our team can assist you in transforming your skill through latest tech
          capabilities to stay ahead of the competition
        </p>
      </div>
      {voice.length > 0 ? (
        <div className="flex  my-5 flex-wrap gap-10 ml-12 mt-10">
          {voice.slice(0, 2).map((item) => {
            return (
              <div
                key={item._id}
                className="flex flex-col w-92 m-auto h-[300px] 
              items-center font-sans shadow-md shadow-slate-200 rounded-lg bg-[#F9F9FB]"
              >
                <div className="overflow-y-scroll">
                  <p className="h-44 w-80">
                    {" "}
                    <span className="text-6xl opacity-50">"</span>
                    {item.message}
                  </p>
                </div>
                <div className="flex mt-2 w-80">
                  <div className="" >
                    <img
                      src={`http://localhost:9000/upload/${item.image}`}
                      alt=""
                      className="h-24 rounded-full"
                    />{" "}
                  </div>
                  <div className=" w-44 flex flex-col justify-center ml-3">
                    <h1 className="font-semibold text-[#04183f]">{item.name}</h1>
                    <p className="text-[#04183FB3]">{item.course}</p>
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
  );
}

export default StudentVoice;
