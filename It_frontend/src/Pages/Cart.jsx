import { useContext } from "react";
import { CartContext } from "../Context/CartProvider";
import { TiDelete } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

function Cart() {
  const { cartState, cartDispatch } = useContext(CartContext);
  console.log(cartState.CartItems);
  let sub_total = cartState.CartItems.reduce((acc, curr) => {
    return acc + curr.fee * curr.qty;
  }, 0);
  console.log(sub_total);

  const vat_rate = 0.13; //vat 13%
  const vatAmt = sub_total * vat_rate;
  const totalWithVat = sub_total + vatAmt;
  console.log(totalWithVat);

  let total_items = cartState.CartItems.reduce((acc, curr) => {
    return acc + curr.qty;
  }, 0);
  return (
    <div className=" min-h-screen pl-20">
      <div className=" mt-8">
        <h1 className="text-4xl font-bold text-[#212529]">Your Cart</h1>
      </div>
      <div className=" mt-10 mb-3">
        {cartState.CartItems.length > 0 ? (
          <div className="flex">
            <div className="">
              {cartState.CartItems.map((item) => {
                return (
                  <div
                    key={item._id}
                    className="flex h-72 w-[700px]  mt-10 pl-6 shadow-lg border-2 border-gray-200 rounded-lg "
                  >
                    <div className="h-40 mt-15">
                      <img
                        src={`http://localhost:9000/upload/${item.image}`}
                        alt=" "
                        className="h-40 border-2 border-gray-200"
                      />
                    </div>
                    <div className=" ml-4 w-52">
                      <div className="mt-15">
                        <h1 className="text-xl font-semibold">{item.name}</h1>
                      </div>
                      <div className="border-2 border-red-300 flex w-24 space-x-2 items-center h-10 mt-20">
                        <button
                          onClick={() => {
                            cartDispatch({
                              type: "Decrement",
                              payload: { _id: item._id },
                            });
                          }}
                          className="w-4  font-bold text-2xl ml-[4px]"
                        >
                          -
                        </button>
                        <span className="w-6  ml-2 mt-1">{item.qty}</span>
                        <button
                          onClick={() => {
                            cartDispatch({
                              type: "Increment",
                              payload: { _id: item._id },
                            });
                          }}
                          className="w-4 font-bold text-2xl flex justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className=" ml-16">
                      <div className="flex justify-center mt-5">
                        <button
                          onClick={() => {
                            cartDispatch({
                              type: "Delete",
                              payload: { _id: item._id, name: item.name },
                            });
                            toast.info(`${item.name} cart is deleted`, {
                              position: "top-center",
                              autoClose: 1500,
                              hideProgressBar: false,
                              closeOnClick: false,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "light",
                              transition: Bounce,
                            });
                          }}
                          className=""
                        >
                          <TiDelete size={32} />
                        </button>
                      </div>
                      <div className=" mt-32">
                        <h1 className="font-semibold text-xl text-[#f85704]">
                          Rs.{item.fee}
                        </h1>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="bg-[#FDFBD4] w-80 h-80 flex flex-col items-center justify-center mt-9 sticky top-20 ml-40 gap-4 rounded-md">
              <div className=" space-y-4 w-[80%]">
                <h1 className="text-2xl text-center">Order Summary</h1>
                <h1>Sub Total: Rs.{sub_total}</h1>
                <h1>VAT:13%</h1>
                <h1>Total with VAT Rs.{totalWithVat}</h1>
                <button className="py-2 w-full bg-[#212529] text-white cursor-pointer rounded-md mt-4">
                  <NavLink to="/payment" state={{totalWithVat:totalWithVat,total_items:total_items}}>Checkout ({total_items})</NavLink>
                </button>
              </div>
              <button
                onClick={() => {
                  cartDispatch({ type: "Clear_Cart" });
                }}
                className="h-10 px-5 rounded-md bg-red-500 text-white cursor-pointer w-[80%]"
              >
                Clear Cart
              </button>
            </div>
          </div>
        ) : (
          <div className="m-auto flex flex-col items-center">
            <div className="">
              <img
                src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
                alt=""
                className="h-64"
              />
            </div>
            <div className="mt-5 space-y-5 flex flex-col items-center">
              <h1 className="text-4xl font-semibold">
                Your Cart is <span className="text-red-600">Empty!</span>
              </h1>
              <p className="">
                Must add items on the cart before you proceed to checkout.
              </p>
              <NavLink
                to="/courses"
                className="py-2 px-6 bg-orange-500 text-white rounded-lg"
              >
                Buy Courses
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
