import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

import routingImg from "../../images/rideshare_routing.png";
import pickupImg from "../../images/rideshare_pickup.png";
import drivingImg from "../../images/rideshare_driving.png";
import sfuImg from "../../images/rideshare_sfu.png";

const PreviewPage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      title: "Plan Your Route",
      image: routingImg,
      blurb: "Smart navigation helps optimize your ride every time."
    },
    {
      title: "Seamless Pickups",
      image: pickupImg,
      blurb: "Coordinate with your rider in real-time for smooth pickups."
    },
    {
      title: "Drive with Ease",
      image: drivingImg,
      blurb: "Track your journey with confidence and clarity."
    },
    {
      title: "Get to SFU",
      image: sfuImg,
      blurb: "Your dependable rideshare solution for campus travel."
    }
  ];

  const goToNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const goToSignup = () => {
    navigate("/auth/Signup");
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: goToNext,
    onSwipedRight: goToPrevious,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <div
      className="h-screen w-screen flex items-center justify-center bg-white"
      {...swipeHandlers}
    >
      <div className="w-[90vw] max-w-md flex flex-col items-center text-center space-y-4 p-4">
        <h2 className="text-2xl sm:text-3xl font-semibold">
          {slides[currentIndex].title}
        </h2>

        <div className="w-[250px] h-[250px] border rounded-xl overflow-hidden flex items-center justify-center">
          <img
            src={slides[currentIndex].image}
            alt={slides[currentIndex].title}
            className="w-full h-full object-cover"
          />
        </div>

        <p className="text-gray-600 text-base sm:text-lg">
          {slides[currentIndex].blurb}
        </p>

        {/* Pagination Dots */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? "bg-red-500" : "border border-black"
              }`}
            />
          ))}
        </div>

        {/* Navigation Button */}
        <div className="flex justify-center w-full">
          {currentIndex === slides.length - 1 ? (
            <button
              className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all"
              style={{ margin: "0 auto" }}
              onClick={goToSignup}
            >
              Continue
            </button>
          ) : (
            <button
              className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all"
              style={{ margin: "0 auto" }}
              onClick={goToNext}
            >
              Tap or swipe →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;