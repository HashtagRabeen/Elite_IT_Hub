import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";

function Payment() {
  const location = useLocation();
  console.log(location);
  const { totalWithVat, total_items } = location.state || {};
  let transaction_uuid = uuidv4();
  console.log(transaction_uuid);

  let Message = `total_amount=${totalWithVat},transaction_uuid=${transaction_uuid},product_code=EPAYTEST`;
  var hash = CryptoJS.HmacSHA256(Message, "8gBm/:&EnhH.1/q");
  var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
  console.log(totalWithVat, total_items);
  return (
    <div className="min-h-screen">
      <form
        className=" h-80 m-auto w-96 flex flex-col justify-center space-y-5 items-center bg-gray-200 mt-20 rounded-xl"
        action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        method="POST"
      >
        <input
          type="hidden"
          id="amount"
          name="amount"
          value={totalWithVat}
          required
        />
        <input
          type="hidden"
          id="tax_amount"
          name="tax_amount"
          value="0"
          required
        />
        <input
          type="hidden"
          id="total_amount"
          name="total_amount"
          value={totalWithVat}
          required
        />
        <input
          type="hidden"
          id="transaction_uuid"
          name="transaction_uuid"
          value={transaction_uuid}
          required
        />
        <input
          type="hidden"
          id="product_code"
          name="product_code"
          value="EPAYTEST"
          required
        />
        <input
          type="hidden"
          id="product_service_charge"
          name="product_service_charge"
          value="0"
          required
        />
        <input
          type="hidden"
          id="product_delivery_charge"
          name="product_delivery_charge"
          value="0"
          required
        />
        <input
          type="hidden"
          id="success_url"
          name="success_url"
          value="http://localhost:5173/paymentSuccess"
          required
        />
        <input
          type="hidden"
          id="failure_url"
          name="failure_url"
          value="http://localhost:5173/paymentFailure"
          required
        />
        <input
          type="hidden"
          id="signed_field_names"
          name="signed_field_names"
          value="total_amount,transaction_uuid,product_code"
          required
        />
        <input
          type="hidden"
          id="signature"
          name="signature"
          value={hashInBase64}
          required
        />
        <h1 className=" font-semibold text-xl text-[#212529]">Payment Confirmation</h1>
        <h1 className=" font-semibold text-xl">Total Items: {total_items}</h1>
        <h1 className=" font-semibold text-xl">Total Amount:Rs. {totalWithVat}</h1>
        <input
          className="bg-orange-500 text-white p-2 rounded-lg px-8"
          value="Confirm Payment"
          type="submit"
        />
      </form>
    </div>
  );
}

export default Payment;
