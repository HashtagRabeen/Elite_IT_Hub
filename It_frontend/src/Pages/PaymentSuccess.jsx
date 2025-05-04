import { useSearchParams } from "react-router-dom";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const givenData = searchParams.get("data");
  console.log(givenData);
  let decodedData = atob(givenData);
  console.log("Decoded Data", decodedData);
  const parseData = JSON.parse(decodedData);
  console.log("Parse Data", parseData);

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
          <span className="text-red-400 font-bold">Rs.
            {parseData.total_amount}
          </span>
        </h1>
      </div>
    </div>
  );
}

export default PaymentSuccess;
