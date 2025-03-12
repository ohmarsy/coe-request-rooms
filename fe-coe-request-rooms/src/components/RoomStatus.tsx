import { PeopleData } from "../services/getPeople";

interface RoomStatusProps {
  peopleData: PeopleData | null;
}

const RoomStatus: React.FC<RoomStatusProps> = ({ peopleData }) => {

  return (
    <div className="flex flex-col items-center justify-center bg-white  shadow-sm rounded-2xl p-8 w-full space-y-2 h-full">
      <p
        className={`text-lg font-medium ${peopleData?.totalMovements == null
            ? "text-gray-400" // No data case
            : peopleData.totalMovements > 0
              ? "text-red-500" // Occupied case
              : "text-green-500" // Available case
          }`}
      >
        {peopleData?.totalMovements == null
          ? "No data"
          : peopleData.totalMovements > 0
            ? "Occupied"
            : "Available"}
      </p>

      <p className="text-gray-500 font-medium text-lg">Room status</p>
    </div>
  );
};

export default RoomStatus;
