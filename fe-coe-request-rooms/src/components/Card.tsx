import React from "react";

// Define the type for the props
interface CardProps {
  image: string; // URL of the image
  name: string; // Name to display as the title
  email: string; // Email to display in the description
  page: "dashboard" | "imageAnalyze"; // Page type to control aspect ratio
}

const Card: React.FC<CardProps> = ({ image, name, email, page }) => {
  return (
    <div className="bg-white flex-col rounded-2xl shadow-md overflow-hidden w-full h-[336px] flex-grow ">
      <img
        className={`max-h-2/3 w-full object-cover rounded-t-2xl ${
          page === "imageAnalyze" ? "aspect-[3/2]" : " "
        }`}
        src={image}
        alt={`${name}'s profile`}
      />
      <div className="flex-col flex justify-center space-y-4 h-1/3 ">
        <h2 className="text-center antialiased text-md font-bold text-gray-600 ">
          Name : {name}
        </h2>
        <p className="text-md text-gray-500 truncate w-full text-center">
          {email}
        </p>
      </div>
    </div>
  );
};

export default Card;
