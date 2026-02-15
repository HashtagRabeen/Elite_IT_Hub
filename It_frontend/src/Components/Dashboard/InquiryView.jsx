import React from "react";
import StatCard from "./StatCard";
import DashboardPie from "./DashboardPie";
import { Link } from "react-router-dom";

function InquiryView({ InquiryStatus, onBack }) {
  return (
    <div>
      <div className="text-right w-full py-2">
        <button
          className="px-4 py-1 bg-[#003e3d] rounded-xl text-white"
          onClick={onBack}
        >
          Go back
        </button>
      </div>
      <h1 className="shadow text-3xl  font-bold text-center p-2">Inquiry Status</h1>
      <div className="flex gap-4 p-4">
        {InquiryStatus.map((item, i) => (
          <Link to="inquiry">
            <StatCard key={i} {...item} />
          </Link>
        ))}
      </div>
      <DashboardPie data={InquiryStatus} />
    </div>
  );
}

export default InquiryView;
