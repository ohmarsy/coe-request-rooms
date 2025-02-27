import React from 'react'

// Define the type for the props
interface CardProps {
    image: string; // URL of the image
    name: string;  // Name to display as the title
    email: string; // Email to display in the description
}

const Card: React.FC<CardProps> = ({ image, name, email }) => {
    return (
       
        <div className='w-80 h-100 bg-white flex flex-col rounded-2xl shadow-lg overflow-hidden'>
            <div className=' h-3/5'>
                <img
                    className='h-full w-full object-cover'
                    src={image}
                    alt={`${name}'s profile`}
                />

            </div>
            <div className=' h-2/5 flex flex-col justify-center items-center'>
            <h2 className="text-base font-bold text-gray-600">Name : {name}</h2> 
               <p className="text-base text-gray-600 mt-2">Email : {email}</p> 
            </div>

        </div>
    );
};

export default Card;