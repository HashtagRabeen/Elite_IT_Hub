import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1324 },
    items: 3,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1324, min: 764 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 764, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

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
    <div className="flex flex-col lg:flex-row p-4 sm:p-8 lg:p-16 bg-[#146aa7] gap-6 lg:gap-8">
      <div className="w-full lg:w-[380px] lg:flex-shrink-0 text-white flex flex-col justify-center">
        <h1 className="text-2xl sm:text-3xl lg:text-3xl font-bold mb-3">
          Our Student Voice
        </h1>
        <p className="text-base sm:text-lg">
          Our team can assist you in transforming your skill through latest tech
          capabilities to stay ahead of the competition
        </p>
      </div>

      {voice.length > 0 ? (
        <div className="flex-1 min-w-0 w-full">
          <Carousel
            showDots={false}
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={4000}
            containerClass="carousel-container"
            itemClass="px-2 sm:px-3"
          >
            {voice.map((item) => {
              return (
                <div
                  key={item._id}
                  className="flex flex-col p-4 sm:p-6 lg:p-4 md:h-96 h-64
                   items-center font-sans shadow-md shadow-slate-200 rounded-lg bg-[#F9F9FB]"
                >
                  <div className="overflow-y-auto flex-grow mb-4">
                    <p className="min-h-[140px] sm:min-h-[160px] lg:min-h-[176px] w-full">
                      <span className="text-4xl sm:text-5xl lg:text-6xl opacity-50">
                        "
                      </span>
                      {item.message}
                    </p>
                  </div>

                  <div className="flex mt-2 w-full items-center gap-3 sm:gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={`http://localhost:9000/upload/${item.image}`}
                        alt={item.name}
                        className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 rounded-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col justify-center flex-1 min-w-0">
                      <h1 className="font-semibold text-[#04183f] text-sm sm:text-base truncate">
                        {item.name}
                      </h1>
                      <p className="text-[#04183FB3] text-xs sm:text-sm truncate">
                        {item.course}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-white">
          <p>No testimonials available</p>
        </div>
      )}
    </div>
  );
}

export default StudentVoice;
