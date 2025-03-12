import { PeopleData } from "../services/getPeople";

interface RoomStatusProps {
  peopleData: PeopleData;
}

const RoomStatus: React.FC<RoomStatusProps> = ({ peopleData }) => {
  const totalPeople = peopleData.totalMovements ?? 0;
  
  const roomStatus = totalPeople > 0 ? "Occupied" : "Available";
  return (
    <div className="flex flex-col items-center justify-center bg-white  shadow-sm rounded-2xl p-8 w-full space-y-2 h-full">
      <p
        className={`text-lg font-medium ${
          roomStatus === "Available" ? "text-green-500" : "text-red-500"
        }`}
      >
        {roomStatus ?? "No data"}
      </p>
      <p className="text-gray-500 font-medium text-lg">Room status</p>
    </div>
  );
};

export default RoomStatus;
