import { NavLink } from "react-router-dom";

function PaymentFailure() {
  return (
    <div className="min-h-screen">
      <div className="w-96 m-auto flex flex-col items-center justify-center h-96 mt-20 shadow-slate-400 shadow-sm rounded-lg">
        <img
          src="https://icons.veryicon.com/png/o/education-technology/mobile-campus/fail-53.png"
          alt=""
          className="h-32"
        />
        <h1 className="font-bold text-[#10B981] text-3xl mt-4">
          Payment Failed!
        </h1>
        <NavLink to="/cart" className="py-2 px-7 bg-[#14B8A6] text-white mt-6 rounded-xl">Try Again</NavLink>
      </div>
    </div>
  );
}

export default PaymentFailure;
