import React from "react";
import Image from "../../assets/headerBook1.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick/lib/slider";

export default function Home() {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    pauseOnHover: true,
    fade: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div
        style={{ backgroundColor: "#FAF9FE" }}
        className="py-24 w-full overflow-hidden"
      >
        <Slider {...settings} arrows autoplay autoplaySpeed={500} infinite>
          <div>
            <div className="w-5/6 mx-auto flex justify-center items-center slider-container h-[450px]">
              <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-10">
                <div className="text-center md:text-left space-y-4">
                  <h1 className="text-4xl font-bold">Life Of The Wild</h1>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    eu feugiat amet, libero ipsum enim pharetra hac. Urna
                    commodo, lacus ut magna velit eleifend. Amet, quis urna, a
                    eu.
                  </p>
                  <button className="mt-4 px-6 py-3 bg-gray-700 text-white rounded hover:bg-gray-700">
                    Learn More
                  </button>
                </div>
                <div className="mt-6 md:mt-0">
                  <img
                    src={Image}
                    alt="Life Of The Wild"
                    className="max-h-[250px] w-full object-cover shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="w-5/6 mx-auto flex justify-center items-center slider-container h-[450px]">
              <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-10">
                <div className="text-center md:text-left space-y-4">
                  <h1 className="text-4xl font-bold">The Hunger Games</h1>
                  <p className="text-gray-600">
                    In the ruins of a place once known as North America lies the
                    nation of Panem, shining Capitol surrounded by twelve
                    outlying districts. The Capitol is harsh and cruel and keeps
                    the districts in line by forcing them all to send one boy
                    and one girl between the ages of twelve and eighteen to
                    participate in the annual Hunger Games, a fight to the death
                    on live TV.
                  </p>
                  <button className="mt-4 px-6 py-3 bg-gray-700 text-white rounded hover:bg-gray-700">
                    Learn More
                  </button>
                </div>
                <div className="mt-6 md:mt-0">
                  <img
                    src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1586722975l/2767052.jpg"
                    alt="The Hunger Games"
                    className="max-h-[250px] w-full object-cover shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="w-5/6 mx-auto flex justify-center items-center slider-container h-[450px]">
              <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-10">
                <div className="text-center md:text-left space-y-4">
                  <h1 className="text-4xl font-bold">
                    Harry Potter and the Order of the Phoenix
                  </h1>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    eu feugiat amet, libero ipsum enim pharetra hac. Urna
                    commodo, lacus ut magna velit eleifend. Amet, quis urna, a
                    eu.
                  </p>
                  <button className="mt-4 px-6 py-3 bg-gray-700 text-white rounded hover:bg-gray-700">
                    Learn More
                  </button>
                </div>
                <div className="mt-6 md:mt-0">
                  <img
                    src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1546910265l/2.jpg"
                    alt="Harry Potter and the Order of the Phoenix"
                    className="max-h-[250px] w-full object-cover shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="w-5/6 mx-auto flex justify-center items-center slider-container h-[450px]">
              <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-10">
                <div className="text-center md:text-left space-y-4">
                  <h1 className="text-4xl font-bold">To Kill a Mockingbird</h1>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    eu feugiat amet, libero ipsum enim pharetra hac. Urna
                    commodo, lacus ut magna velit eleifend. Amet, quis urna, a
                    eu.
                  </p>
                  <button className="mt-4 px-6 py-3 bg-gray-700 text-white rounded hover:bg-gray-700">
                    Learn More
                  </button>
                </div>
                <div className="mt-6 md:mt-0">
                  <img
                    src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1553383690l/2657.jpg"
                    alt="To Kill a Mockingbird"
                    className="max-h-[250px] w-full object-cover shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </>
  );
}
