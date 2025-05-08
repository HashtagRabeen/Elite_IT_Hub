import { NavLink } from "react-router-dom";
import { TbTargetArrow } from "react-icons/tb";
import { TbBinocularsFilled } from "react-icons/tb";

function AboutUs() {
  return (
    <div>
      <div className="h-80 pl-40 text-lg bg-[#184f81] text-white">
        <div className=" flex pt-20 text-white">
          <NavLink to="/">
            Home &gt;<span></span>
          </NavLink>
          <h1 className="pl-2">Who are we?</h1>
        </div>
        <div className="mt-10 font-bold text-4xl">
          <h1>Who are we?</h1>
        </div>
      </div>
      <div className="flex bg-[#eef4f8]">
        <div className="ml-30 flex items-center my-10">
          <img
            src="https://www.arch2o.com/wp-content/uploads/2023/05/Arch2O-taikang-financial-centers-underground-construction-by-zaha-hadid-architects-is-finished-2.jpg"
            alt=""
            className="h-[700px] w-[1000px]"
          />
        </div>
        <div>
          <div className="ml-10 w-[90%] space-y-2 text-lg">
            <h1 className="text-4xl font-semibold mt-12">
              Launching Careers, Empowering Futures
            </h1>
            <p className="mt-5">
              <span className="font-bold text-[#04183F]">Elite It Hub </span>
              is a leading IT Learning Academy in Nepal, passionately committed
              to equipping individuals with the in-demand skills and knowledge
              to thrive in today's technology-driven world. Founded in 2017,
              we've made it our mission to bridge the gap between traditional
              education and the evolving needs of the IT industry.
            </p>
            <p>
              At <span className="font-bold text-[#04183F]">Elite IT Hub</span>,
              we believe in a practical, hands-on learning experience. Our
              extensive range of courses, led by experienced industry
              professionals, goes beyond theory, immersing you in real-world
              projects and interactive lab sessions. Whether you're passionate
              about programming, eager to master data science, or ready to build
              secure cloud solutions, we have a program to ignite your
              potential.
            </p>
            <p>
              More Than Just an Academy, we are your partners in success. We go
              the extra mile to provide:
            </p>
            <p>
              <span className="text-[#04183F] font-bold">
                Industry-Relevant Curriculum:{" "}
              </span>
              Our courses are carefully designed to align with the latest
              industry demands, ensuring you graduate with the most sought-after
              skills.
            </p>
            <p>
              <span className="font-bold text-[#04183F]">
                Expert Instructors:{" "}
              </span>
              Learn from seasoned IT professionals who bring their real-world
              experience and insights into the classroom.
            </p>
            <p>
              <span className="font-bold text-[#04183F]">
                High Tech Infrastructures:{" "}
              </span>
              Practice in a modern, tech-equipped environment that mirrors
              real-world IT workplaces.
            </p>
            <p>
              <span className="font-bold text-[#04183F]">
                Job Placement Assistance:{" "}
              </span>
              Job Placement Assistance: We're dedicated to helping you launch
              your career and connect with top employers in the industry.
            </p>
            <p>
              <span className="font-bold text-[#04183F]">
                Hybrid Learning:{" "}
              </span>
              We are focused on providing the best education aligning with your
              best favorable environment (Physical, Remote and Hybrid).
            </p>
            <p className="font-bold text-[#04183F]">
              At Elite IT Hub, we don't just teach technology, we empower
              individuals to become problem-solvers, innovators, and leaders.
              Join us and become part of a thriving community of learners,
              mentors, and tech enthusiasts. Your future in IT starts here.
            </p>
          </div>
        </div>
      </div>
      <div className="h-80 flex justify-center items-center">
        <div className="flex w-[40%] ml-20 justify-center items-center bg-[#184F81] text-white h-44 pl-2 rounded-lg">
          <div>
            <TbTargetArrow size={130} />
          </div>
          <div className="p-3">
            <p>
              Our vision is to be a premier IT Learning Academy, driving digital
              transformation through education and innovation, and empowering
              individuals and businesses to achieve their full potential in the
              digital world.
            </p>
          </div>
        </div>
        <div className="flex w-[40%] ml-20 justify-center items-center h-44 bg-[#EEF4F8] text-[#2E2E2E] rounded-lg">
          <div className="text-[#184F81]">
            <TbBinocularsFilled size={130} />
          </div>
          <div className="p-3">
            <p>
              Our mission is to empower individuals and elevate Nepal as a
              global digital leader by delivering exceptional IT education &
              knowledge. We provide comprehensive, industry-relevant training
              programs that equip learners with the cutting-edge skills and
              knowledge needed to thrive in the digital world.
            </p>
          </div>
        </div>
      </div>
      <div className="h-96 text-center">
        <div className=" mt-14 text-3xl font-bold text-[#212529]">
          <h1>
            <span className="border-b-4 border-[#184f81]">By </span>The Numbers
          </h1>
        </div>
        <div className="flex justify-center items-center gap-10 mt-15">
          <div className=" h-40 w-62 flex justify-center items-center flex-col space-y-3 shadow-lg rounded-xl shadow-red-50">
            <h1 className="text-5xl font-bold text-[#184f81]">5,000+</h1>
            <p className="text-lg">Students Trained</p>
          </div>
          <div className=" h-40 w-62 flex justify-center items-center flex-col space-y-3 shadow-lg rounded-xl shadow-red-50">
            <h1 className="text-5xl font-bold text-[#184f81]">85%</h1>
            <p className="text-lg">Placement Rate</p>
          </div>
          <div className=" h-40 w-62 flex justify-center items-center flex-col space-y-3 shadow-lg rounded-xl shadow-red-50">
            <h1 className="text-5xl font-bold text-[#184f81]">50+</h1>
            <p className="text-lg">Industry Partners</p>
          </div>
          <div className=" h-40 w-62 flex justify-center items-center flex-col space-y-3 shadow-lg rounded-xl shadow-red-50">
            <h1 className="text-5xl font-bold text-[#184f81]">12</h1>
            <p className="text-lg">Certified Instructors</p>
          </div>
        </div>
      </div>
      <div className="text-center mb-5">
         <h1 className="text-[#04183F] text-2xl font-bold">Our Values</h1>
      </div>
      <div className="flex min-h-screen pt-5">
        <div className=" w-full pl-32 space-y-10">
          <div className=" w-[90%] h-32 bg-[#EEF4F8] p-2 rounded-lg">
            <h1 className="font-semibold">Student/Trainees Success: OUR NORTH STAR</h1>
            <p>
              The success of our students is at the heart of everything we do.
              We measure our own achievements by the accomplishments of those we
              empower
            </p>
          </div>
          <div className="w-[90%] h-32 bg-[#184F81] text-white p-2 rounded-lg">
            <h1 className="font-semibold">Practical Experience: LEARNING BY DOING</h1>
            <p>
              We believe that true mastery comes from hands-on experience. We
              foster a learning environment rich in practical projects,
              simulations, and real-world applications.
            </p>
          </div>
          <div className=" w-[90%] h-32 p-2 bg-[#EEF4F8] rounded-lg">
            <h1 className="font-semibold">Continuous Learning and Growth</h1>
            <p>
              The world of technology never stands still, and neither do we. We
              promote a culture of lifelong learning, encouraging our students,
              instructors, and staff to continuously adapt and expand their
              skills.
            </p>
          </div>
          <div className=" w-[90%] h-32 bg-[#147AA7] text-white p-2 rounded-lg">
            <h1 className="font-semibold">Integrity and Transparency</h1>
            <p>
              We hold ourselves to the highest ethical standards, operating with
              honesty, transparency, and fairness in all our interactions
            </p>
          </div>
        </div>
        <div className="w-full mt-5 space-y-10">
          <div className=" w-[90%] h-32 bg-[#EEF4F8] p-2 rounded-lg">
            <h1 className="font-semibold">Student/Trainees Success: OUR NORTH STAR</h1>
            <p>
              The success of our students is at the heart of everything we do.
              We measure our own achievements by the accomplishments of those we
              empower
            </p>
          </div>
          <div className=" w-[90%] h-32 bg-[#184F81] text-white p-2 rounded-lg">
            <h1 className="font-semibold">Practical Experience: LEARNING BY DOING</h1>
            <p>
              We believe that true mastery comes from hands-on experience. We
              foster a learning environment rich in practical projects,
              simulations, and real-world applications.
            </p>
          </div>
          <div className="w-[90%] h-32 p-2 bg-[#EEF4F8] rounded-lg">
            <h1 className="font-semibold">Continuous Learning and Growth</h1>
            <p>
              The world of technology never stands still, and neither do we. We
              promote a culture of lifelong learning, encouraging our students,
              instructors, and staff to continuously adapt and expand their
              skills.
            </p>
          </div>
          <div className=" w-[90%] h-32 bg-[#147AA7] text-white p-2 rounded-lg">
            <h1 className="font-semibold">Integrity and Transparency</h1>
            <p>
              We hold ourselves to the highest ethical standards, operating with
              honesty, transparency, and fairness in all our interactions
            </p>
          </div>
        </div>
      
      </div>
    </div>
  );
}

export default AboutUs;
