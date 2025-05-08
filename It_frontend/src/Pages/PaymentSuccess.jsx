import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const givenData = searchParams.get("data");
  console.log(givenData);
  let decodedData = atob(givenData);
  console.log("Decoded Data", decodedData);
  const parseData = JSON.parse(decodedData);
  console.log("Parse Data", parseData);

  const { user,state } = useContext(AuthContext);

  useEffect(() => {
    const recordPayment = async () => {
      try {
        const res = await fetch("http://localhost:9000/api/createPayment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.token}`,
          },
          body: JSON.stringify({
            transaction_code: parseData.transaction_code,
            status: parseData.status,
            total_amount: parseData.total_amount,
            userId: user._id,
            userName: user.name,
          }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        console.log("Payment saved", await res.json());
      } catch (err) {
        console.error("Failed to record payment:", err);
      }
    };

    if (user && parseData) recordPayment();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parseData, user]);

  return (
    <div className="min-h-screen">
      <div className="w-96 m-auto flex flex-col items-center justify-center h-96 mt-20 shadow-lg shadow-slate-200">
        <img
          src="https://www.shutterstock.com/image-vector/valid-seal-icon-blue-tick-600nw-775336747.jpg"
          alt=""
          className="h-32"
        />
        <h1 className="font-bold text-[#10B981] text-3xl">
          Payment Successful!
        </h1>
        <h1 className="mt-2">Thank you for your purchase</h1>
        <h1>
          Transaction Code:{" "}
          <span className="text-red-400 font-bold">
            {parseData.transaction_code}
          </span>
        </h1>
        <h1>
          Status:{" "}
          <span className="text-red-400 font-bold">{parseData.status}</span>
        </h1>
        <h1>
          Total Amount:{" "}
          <span className="text-red-400 font-bold">
            Rs.
            {parseData.total_amount}
          </span>
        </h1>
      </div>
    </div>
  );
}

export default PaymentSuccess;
