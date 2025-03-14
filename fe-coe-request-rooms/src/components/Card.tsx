import React from "react";

// Define the type for the props
interface CardProps {
  image: string; // URL of the image
  date :string;
  page: "dashboard" | "imageAnalyze"; // Page type to control aspect ratio
}

const Card: React.FC<CardProps> = ({ image, date, page }) => {
  return (
    <div
      className={`bg-white flex-col rounded-2xl shadow-md overflow-hidden  flex-grow ${
        page === "imageAnalyze"
          ? "h-full  w-[80%] mx-auto "
          : " w-full h-[300px] "
      }`}
    >
      <img
        className={`h-3/4 w-full object-cover rounded-t-2xl ${
          page === "imageAnalyze" ? "aspect-[3/2]" : " "
        }`}
        src={image}
      />
      <div className="flex-col flex justify-center space-y-4 h-1/4 items-center ">
        <h2 className="  text-center antialiased text-md font-bold text-gray-600 ">
          Date : {date}
        </h2>
        {/* <p className="text-md text-gray-500 truncate w-full text-center">
          {email}
        </p> */}
      </div>
    </div>
  );
};

export default Card;
