import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";

function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const { state } = useContext(AuthContext);

  const getPayments = async () => {
    try {
      let response = await fetch("http://localhost:9000/api/getPayment", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      response = await response.json();
      console.log(response.showPayment);
      setPayments(response.showPayment);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPayments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  return (
    <div>
      <div className="text-4xl font-bold mt-10 text-center underline text-[#212529]">
        <h1>Customers Payments History</h1>
      </div>
      {payments.length > 0 ? (
        <div className="flex m-auto w-[80%] gap-10 justify-center mt-10 flex-wrap">
          {payments.map((payment) => {
            return (
              <div key={payment._id} className=" space-y-3 font-semibold p-4 shadow-xl rounded-lg">
                <h1>User Name: Mr/Ms {payment.userName}</h1>
                <h1>User Id: {payment.userId}</h1>
                <h1>Transaction Code: {payment.transaction_code}</h1>
                <h1>Payment Status: <span className="px-6 bg-green-500 text-white rounded-xl py-1">{payment.status}</span> </h1>
                <h1>Total Amount Received: Rs.{payment.total_amount}</h1>
                <h1>Date: {new Date(payment.createdAt).toLocaleString()}</h1>
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

export default AdminPayments;
