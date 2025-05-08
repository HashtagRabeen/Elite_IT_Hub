import React from "react";

function RefundPolicy() {
  return (
    <div>
      <div className="h-96 w-[60%] m-auto space-y-5 border-l-4 my-10 flex flex-col p-2 border-[#184F81]">
        <h1 className="font-bold text-4xl underline text-center mt-10">
         <span className="text-red-600"> No</span> Refund Policy
        </h1>
        <p>
          There is a strict no refund & no cancellation policy. You are entitled
          to a refund only in the case where you have not been allotted the
          course after payment.
        </p>
        <p>
          Non-negotiable: The institute does not offer refunds to students under
          any circumstances.
        </p>
        <p>
          Administrative Streamlining: Helps the institute avoid the
          administrative burden and costs associated with processing refunds.
        </p>
        <p>
          Commitment Encouragement: Encourages students to commit fully to the
          course, reducing impulsive enrollments.
        </p>
        <p>
          Resource Allocation: Ensures that once course materials and resources
          are provided or accessed, they cannot be retracted or redistributed.
        </p>
      </div>
    </div>
  );
}

export default RefundPolicy;
