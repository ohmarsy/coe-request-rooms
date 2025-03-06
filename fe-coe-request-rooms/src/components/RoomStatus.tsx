interface RoomStatusProps {
  status?: string;
}

const RoomStatus: React.FC<RoomStatusProps> = ({ status = "Available" }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white  shadow-sm rounded-2xl p-8 w-full space-y-2 h-full">
      <p
        className={`text-lg font-medium ${
          status === "Available" ? "text-green-500" : "text-red-500"
        }`}
      >
        {status}
      </p>
      <p className="text-gray-500 font-medium text-lg">Room status</p>
    </div>
  );
};

export default RoomStatus;
