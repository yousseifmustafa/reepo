import { useContext, useEffect, useState } from "react";
import book from "../../../public/images/download.jpeg";
import { ColorRing } from "react-loader-spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import { TokenAuthContext } from "../Context/Tokencontext";
import toast from "react-hot-toast";
import { cartcontext } from "./../Context/Cartcontext";

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [data, setData] = useState(null);
  const [flag, setflag] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { token, id, setId } = useContext(TokenAuthContext);
  const { setmoney, money } = useContext(cartcontext);

  const navigate = useNavigate();
  const categories = [
    "Classics",
    "Fiction",
    "Historical Fiction",
    "School",
    "Literature",
    "Young Adult",
    "Historical",
    "Novels",
    "Read For School",
    "High School",
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategoryChange = (category) => {
    setflag(true);
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  async function carthandler(bookId) {
    try {
      const res = await axios.patch(
        "http://localhost:3001/books/PurchasedList",
        { Book_Id: bookId },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (res.data.status === "Success") {
        toast.success("Book added to cart successfully", {
          position: "top-right",
        });
        const ps = res?.data.purchasedBooks;
        ps.forEach((pr) => {
          setmoney(pr?.price + money);
        });
      } else {
        toast.error(res.data.message || "Error adding to cart", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("Server error while adding to cart", {
        position: "top-right",
      });
    }
  }

  async function getAllProducts() {
    await axios
      .get("http://localhost:3001/books/getAllBooks", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getBooksByCategory(category) {
    await axios
      .get(`http://localhost:3001/books/getBooksByCat/${category}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setData(res.data.data);
        setflag(false);
      })
      .catch((err) => {
        console.log(err);
        setflag(false);
      });
  }

  function productHandler(idd) {
    navigate(`/productDetails/${idd}`);
    setId(idd);
  }


  useEffect(() => {
    if (selectedCategory) {
      getBooksByCategory(selectedCategory);
    } else {
      getAllProducts();
    }
  }, [selectedCategory]);

  return (
    <div>
      {flag == false ? (
        <div className="mt-12 flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-1/4 bg-600 sticky top-20 mb-6">
            <div className="w-full flex flex-col">
              <div className="border-b-2 mb-3">
                <p className="text-lg m-3">Filter by</p>
              </div>

              <div className="mb-3">
                <button
                  className="ms-3 text-lg flex items-center justify-between w-full"
                  onClick={toggleDropdown}
                >
                  {selectedCategory || "Category"}
                  <i
                    className={`fa-solid fa-caret-${
                      isDropdownOpen ? "up" : "down"
                    }`}
                  ></i>
                </button>

                {isDropdownOpen && (
                  <div className="w-full rounded-md mt-2 m-3 text-lg">
                    {categories.map((category, index) => (
                      <div
                        key={index}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => handleCategoryChange(category)}
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 justify-center w-full">
            {data == null ? (
              <Loading />
            ) : (
              data?.map((book) => (
                <div
                  key={book._id}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 overflow-hidden group my-6 bg-transparent shadow-2xl rounded-xl hover:scale-110 transition-transform duration-300"
                >
                  <div className="relative overflow-hidden group">
                    <img
                      className="w-full h-60 object-cover"
                      src={book?.coverImg}
                      alt={book?.title}
                    />
                    <div
                      onClick={() => productHandler(book?.bookId)}
                      className="bg-gray-400 w-full py-4 absolute text-xl opacity-0 group-hover:opacity-90 bottom-0 text-center text-white -translate-y-[-100%] cursor-pointer group-hover:translate-y-0 transition-all duration-500"
                    >
                      Quick View
                    </div>

                    <div className="absolute top-3 right-2 flex flex-col text-xl items-center justify-between gap-4">
                      <div onClick={() => carthandler(book?._id)}>
                        <i className="fa-solid fa-cart-plus hover:text-orange-900 cursor-pointer rounded-full bg-white p-2 mb-5 hover:scale-110 transition-transform duration-300"></i>
                      </div>
                    </div>
                  </div>
                  <p className="text-center mt-2">{book?.title}</p>
                  <div className="flex items-center justify-center mt-3">
                    <p className="border-b-2 border-transparent w-1/6"></p>
                  </div>

                  <div className="py-3 text-2xl flex items-center justify-between container m-auto">
                    <p className="text-center m-3 text-gray-400 text-2xl">
                      {book?.price ? `${book?.price} €` : "FREE"}
                    </p>

                    <div className="gap-1 flex items-center justify-center">
                      {book?.rating}
                      <i className="fa-solid fa-star text-yellow-300"></i>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
