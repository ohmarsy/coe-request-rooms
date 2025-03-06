import React from "react";

// Define the type for the props
interface CardProps {
  image: string; // URL of the image
  name: string; // Name to display as the title
  email: string; // Email to display in the description
}

const Card: React.FC<CardProps> = ({ image, name, email }) => {
  return (
    <div className=" bg-white flex flex-col rounded-2xl shadow-sm overflow-hidden md:w-full h-full md:max-h-xs">
      <div className="flex h-3/4">
        <img
          className="max-h-48 w-full object-cover"
          src={image}
          alt={`${name}'s profile`}
        />
      </div>
      <div className="h-1/4 flex flex-col justify-center items-center py-2">
        <h2 className="antialiased mx-auto text-sm sm:text-base font-bold text-gray-600">
          Name : {name}
        </h2>
        <p className="mx-auto text-sm text-clip text-gray-600 mt-2">
          Email : {email}
        </p>
      </div>
    </div>
  );
};

export default Card;
