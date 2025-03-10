import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface AllRoomProps {
  rooms: RoomProps[];
  handleClickRoom: (roomName: string) => void;
  selectedRoom?: string;
  classNameInner?: string;
  classNameOuter?: string;
  addRoom?: boolean;
}

interface RoomProps {
  name: string;
}
const AllRoom: React.FC<AllRoomProps> = ({
  rooms,
  handleClickRoom,
  selectedRoom,
  classNameInner,
  classNameOuter,
  addRoom = false,
}) => {
  return (
    <div
      className={`w-full bg-white shadow-sm rounded-2xl flex flex-col ${classNameOuter}`}
    >
      <div className="flex justify-between items-center border-b border-b-gray-200 px-8 py-4">
        <p className="text-xl max-[1024px]:text-lg">All rooms</p>
        {addRoom && (
          <button className="flex gap-2 items-center justify-center px-4 py-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300">
            <FontAwesomeIcon icon={faPlusCircle} /> Add
          </button>
        )}
      </div>
      <div
        className={`px-4 py-4 text-lg flex flex-col gap-2 overflow-scroll scrollbar-hidden ${classNameInner} max-[1280px]:max-h-[50vh]`}
      >
        {rooms.map((room, index) => (
          <p
            className={`duration-100 rounded-lg w-full px-6 py-2 font-medium cursor-pointer ${
              selectedRoom === room.name
                ? "hover:bg-[#2366d2] text-white bg-[var(--primary-color)]"
                : "bg-gray-100 hover:bg-gray-300 "
            }`}
            key={index}
            onClick={() => handleClickRoom(room.name)}
          >
            {room.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default AllRoom;
