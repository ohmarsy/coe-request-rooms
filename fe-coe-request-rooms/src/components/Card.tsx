import React from "react";

// Define the type for the props
interface CardProps {
  image: string; // URL of the image
  name: string; // Name to display as the title
  email: string; // Email to display in the description
}

const Card: React.FC<CardProps> = ({ image, name, email }) => {
  return (
    <div className="bg-white flex flex-col rounded-2xl shadow-md overflow-hidden md:w-full h-full w-full">
      <div className="h-1/1 flex justify-center">
        <img
          className="max-h-40 w-full object-cover rounded-t-2xl"
          src={image}
          alt={`${name}'s profile`}
        />
      </div>

      <div className="h-1/1 flex flex-col justify-center items-center p-4">
        <h2 className="text-base sm:text-lg font-semibold text-gray-700">
          {name}
        </h2>
        <p className="text-sm text-gray-500 mt-1 truncate w-full text-center">
          {email}
        </p>
      </div>
    </div>
  );
};

export default Card;
