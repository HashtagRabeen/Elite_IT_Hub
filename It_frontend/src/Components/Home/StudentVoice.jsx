import { useEffect, useState } from "react";

function StudentVoice() {
  const [voice, setVoice] = useState([]);

  const getTestimonial = async () => {
    try {
      const response = await fetch("http://localhost:9000/api/getTestimonial");
      const data = await response.json();
      setVoice(data.showTesti);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTestimonial();
  }, []);

  return (
    <section className="bg-[#146aa7] py-12 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

        {/* Header Section */}
        <div className="lg:w-1/3 text-white flex flex-col justify-center">
          <h1 className="text-3xl sm:text-4xl font-bold">Our Student Voice</h1>
          <p className="mt-6 text-[16px] sm:text-[18px] md:text-lg max-w-sm">
            Our team can assist you in transforming your skill through latest tech
            capabilities to stay ahead of the competition
          </p>
        </div>

        {/* Testimonials Section */}
        <div className="lg:w-2/3 flex gap-6 justify-start">
          {voice.length > 0 &&
            voice.slice(0, 2).map((item) => (
              <div
                key={item._id}
                className="flex flex-col w-full sm:w-[280px] md:w-[300px] lg:w-[48%] h-[300px] bg-white rounded-lg shadow-md overflow-hidden"
              >
                {/* Message */}
                <div className="p-4 flex-1 overflow-auto">
                  <p className="text-gray-800 relative">
                    <span className="text-6xl opacity-50 mr-1">"</span>
                    {item.message}
                  </p>
                </div>

                {/* Student Info */}
                <div className="flex items-center p-4 border-t border-gray-200">
                  <img
                    src={`http://localhost:9000/upload/${item.image}`}
                    alt={item.name}
                    className="h-20 w-20 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h2 className="font-semibold text-[#04183f]">{item.name}</h2>
                    <p className="text-[#04183FB3]">{item.course}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default StudentVoice;
