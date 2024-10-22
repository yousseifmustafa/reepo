import { useContext, useState, useEffect } from "react";
import img from "../../assets/logo.png";
import { TokenAuthContext } from "../Context/Tokencontext";
import axios from "axios";
import { cartcontext } from "../Context/Cartcontext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function Cart() {
  const { token } = useContext(TokenAuthContext);
  const { money } = useContext(cartcontext);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); 
  const navigator =useNavigate()
  
  async function getCart(token) {
    try {
      const response = await axios.get(
        "http://localhost:3001/books/PurchasedList",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setCart(response.data.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }

  async function removeHandler(bookId) {
    try {
      await axios.patch(`http://localhost:3001/books/PurchasedList/remove/${bookId}`, {}, {
        headers: {
          Authorization: token,
        },
      });

      
      setCart((prevCart) => prevCart.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error("Error removing book from cart:", error.message);
    }
  }


  async function removeallcart() {
    try {
      await axios.delete(`http://localhost:3001/books/PurchasedList`, {
        headers: {
          Authorization: token,
        },
      });

      
      setCart([]);
    } catch (error) {
      console.error("Error removing book from cart:", error.message);
    }
  }




  useEffect(() => {
    getCart(token);
  }, [token]);

  useEffect(() => {
    const total = cart.reduce((accumulator, product) => {
      return accumulator + (product?.price || 0); 
    }, 0);
    setTotalPrice(total);


  }, [cart]);

  return (
    <>
      <div className="flex my-12 gap-3 container m-auto ">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-2/3 ">
          {cart.length === 0 ? (
            <div className="flex flex-col text-5xl items-center mt-24 ">
              <i className="fa-solid fa-cart-shopping"></i>
              <h1>Empty Cart</h1>
            </div>
          ) : (
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 container m-auto ">
              <thead className="text-xs text-gray-700 uppercase bg-main dark:text-gray-400 ">
                <tr className="bg-gray-100">
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">product</th>
                  <th scope="col" className="px-6 py-3">price</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product) => {
                  return (
                    <tr key={product?.BookId} className="bg-gray-50 border-b ">
                      <td className="p-4">
                        <img
                          src={product?.coverImg}
                          className="w-16 md:w-32 max-w-full max-h-full"
                          alt="title"
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-950">
                        {product?.title}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-950">
                        {product?.price + "$"}
                      </td>
                      <td className="px-6 py-4">
                        <a
                          onClick={() => removeHandler(product._id)}
                          href="#"
                          className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        >
                          Remove
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <br />

        <div className="w-1/3 sticky top-8 border-gray-400 h-[100%] border-solid border-2 p-3 rounded-xl">
          <h2 className="font-bold text-lg mb-3 text-emerald-950">Order Summary</h2>

          <form className="max-w-md mx-auto ">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-950"
            >
              Search
            </label>
            <div className="relative">
              <input
                disabled
                type="text"
                id="default-search"
                className="block w-full p-4 text-sm rounded-lg bg-gray-100"
                placeholder="Coupon code"
                required
              />
              <button
                disabled
                type="submit"
                className="absolute text-gray-950 end-2.5 bottom-2.5 bg-main hover:bg-main focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 dark:bg-main"
              >
                Apply
              </button>
            </div>
          </form>

          <div className="group flex items-center gap-2 mt-3">
            <i className="fa-solid fa-circle-exclamation text-red-600"></i>
            <p className="text-gray-600">
              Coupons are temporarily unavailable.
            </p>
          </div>

          <div className="flex justify-between container mt-3">
            <div>
              <p className="text-gray-400 ">
                subtotal (<span className="font-bold">{cart.length}</span> items)
              </p>
            </div>
            <div>
              <p className="text-gray-400 ">
                EGP <span className="font-bold">{totalPrice.toFixed(2)}</span>
              </p>
            </div>
          </div>

          <div className="flex justify-between container my-3 ">
            <div>
              <p className="text-gray-400 "> Shipping Fee</p>
            </div>
            <div>
              <p className="text-emerald-600 font-bold ">FREE</p>
            </div>
          </div>
          <hr />
          <div className="flex justify-between container my-3">
            <div>
              <p className="text-emerald-950 font-bold text-lg">
                Total{" "}
                <span className="text-gray-400 text-sm">(Inclusive of VAT)</span>
              </p>
            </div>
            <div>
              <p className="text-emerald-950 font-bold text-lg">EGP {totalPrice.toFixed(2)}
              </p>
            </div>
          </div>

          <button
            className="w-full bg-gray-800 rounded-lg p-3 mt-4 text-white hover:bg-gray-900 "
            type="button"
            onClick={() => {
              removeallcart()
              navigator("/congratulations")
            }}
          >
            Check Out
          </button>

          <button
            className="w-full bg-gray-800 rounded-lg p-3 mt-4 text-white hover:bg-gray-900 "
            type="button"
            onClick={() => {
              removeallcart()
            }}
          >
            Clear All Cart{" "}
          </button>
        </div>
      </div>
    </>
  );
}