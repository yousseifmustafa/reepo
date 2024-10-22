import { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { useParams } from "react-router-dom";
import { TokenAuthContext } from "../Context/Tokencontext";
import { cartcontext } from "../Context/Cartcontext";
import Loading from "../Loading/Loading";

export default function ProductDetails() {
  const { id } = useParams();
  const { token } = useContext(TokenAuthContext);
  const { setmoney, money } = useContext(cartcontext);
  const [productData, setProductData] = useState(null);
  const [similarBooks, setSimilarBooks] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);



  useEffect(() => {
    getProductById(id);
  }, [id]);

  useEffect(() => {
    if (productData) {
      setTotalPrice(productData.price * quantity);
    }
  }, [productData, quantity]);

  async function getProductById(id) {
    try {
      const res = await axios.get(
        `https://book-store-back-end-d-mohamedmostafa427s-projects.vercel.app/books/getAllBooks/${id}`,
        {

          headers: {
            Authorization: token,
          },

        }
      );
      const fetchedBook = res.data.data;
      setProductData(fetchedBook);
  
      if (fetchedBook) {
        getSimilarBooks(fetchedBook.genres[0]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getSimilarBooks(genre) {
    try {
      const res = await axios.get(
        `http://localhost:3001/books/similar/${genre}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setSimilarBooks(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

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

  const img1 = productData?.coverImg;
  const product = {
    pid :productData?._id,
    title: productData?.title,
    description: productData?.description,
    ratingsAverage: productData?.rating,
    price: productData?.price,
    imageCover: productData?.coverImg,
    images: [img1, img1, img1],
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    arrow: false,
    vertical: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      {product.pid ?    <div className="container mx-auto my-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col md:flex-row md:gap-5 items-start overflow-hidden">
          <div className="w-full md:w-2/3">
            <img className="w-full h-auto" src={product?.imageCover} alt={product?.title} />
          </div>
          <div className="flex gap-3 flex-col md:w-1/3">
            <div className="slider-container">
              <Slider {...settings}>
                {product.images.map((image, index) => (
                  <div key={index} className="mt-4">
                    <img className="w-full h-auto" src={image} alt={product?.title} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="product_desc mb-6">
            <h2 className="font-bold text-4xl">{product?.title}</h2>
            <p className="mt-4">{product?.description}</p>
          </div>

          <div className="product_rating border-b-2 pb-6">
            <div className="flex items-start justify-between pt-3">
              <div className="flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-yellow-300 me-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">
                  {product?.ratingsAverage}
                </p>
              </div>
            </div>
          </div>

          <div className="price py-6 border-b-2">
            <h2 className="font-bold text-2xl">
              <span className="text-orange-500 me-3">{totalPrice} £</span>
              or
              <span className="text-orange-500 mx-3">{(totalPrice / 6).toFixed(2)} £</span>
              / month
            </h2>
            <p>Suggested payment with 6 months special financing</p>
          </div>

          <div className="buttons mb-6">
          
            <div>
              <div className="flex items-center gap-4">
                <button onClick={()=>{
                 carthandler(product.pid)
                }} className="text-emerald-700 rounded-3xl bg-white border-emerald-700 border px-8 py-3 hover:text-emerald-900">
                  Add to cart
                </button>
              </div>
            </div>
          </div>

          <div className="border-2 p-3 mt-4">
            <div className="flex items-center gap-3 text-2xl">
              <i className="fa-solid fa-truck-fast text-orange-400"></i>
              <p>FREE Delivery</p>
            </div>
            <p className="underline ps-10">
              Enter your postal code for Delivery availability
            </p>
          </div>
        </div>
      </div>

      {/* Similar Books Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-4">Similar Books</h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {similarBooks.map((book) => (
            <div
              key={book._id}
              className="overflow-hidden group my-6 bg-transparent shadow-2xl rounded-xl hover:scale-110 transition-transform duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  className="w-full h-60 object-cover"
                  src={book.coverImg}
                  alt={book.title}
                />
                <div
                  onClick={() => {}}
                  className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity duration-300"
                >
                  <h4 className="text-white text-lg font-bold">{book.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>: <Loading/>}
 
    </div>
  );
}
