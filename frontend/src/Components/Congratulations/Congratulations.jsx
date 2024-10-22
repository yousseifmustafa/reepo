import React from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti"; 
import { useWindowSize } from 'react-use'; 

export default function Congratulations() {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r  to-indigo-500 text-white">
      <Confetti width={width/1.08} height={height} />
      <div className="text-center p-8 rounded-lg shadow-lg bg-white text-gray-900">
        <h1 className="text-5xl font-bold mb-6">Congratulations!</h1>
        <p className="text-lg mb-6">
          Your order was placed successfully. Thank you for shopping with us!
        </p>
        <button
          className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          onClick={() => navigate("/shop")}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
