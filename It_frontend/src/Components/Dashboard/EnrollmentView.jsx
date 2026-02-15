import React from "react";

function EnrollmentView({ enrollment, onBack }) {
  return (
    <div className="">
      <div className="text-right w-full py-2">
        <button className="px-4 py-1 bg-[#003e3d] rounded-xl text-white" onClick={onBack}>
          Go back
        </button>
      </div>
      <div className="text-center p-4">
        <h1 className="text-3xl font-bold text-[#032415]">Enrollments Dashboard</h1>
      </div>
      <div>
        <table className=" shadow w-32 md:w-96 lg:w-full">
          <thead className="border bg-[#18b1af] text-white">
            <tr className="">
              <th className="text-left px-6 py-3">Name</th>
              <th className="text-left px-6 py-3">Email</th>
              <th className="text-left px-6 py-3">Phone</th>
              <th className="text-left px-6 py-3">Academic</th>
              <th className="text-left px-6 py-3">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {enrollment.map((item) => (
              <tr key={item._id} className="border-t border-gray-300">
                <td className="px-6 py-2">{item.name}</td>
                <td className="px-6 py-2">{item.email}</td>
                <td className="px-6 py-2">{item.phone}</td>
                <td className="px-6 py-2">{item.academic}</td>
                <td className="px-6 py-2">{item.paymentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EnrollmentView;
