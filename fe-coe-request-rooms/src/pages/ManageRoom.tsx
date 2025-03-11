import React, { useState } from "react";
import AllRoom, { RoomProps } from "../components/AllRoom";
import DateBox from "../components/DateBox";
import TimeBox from "../components/TimeBox";
import Switch from "../components/Switch";
import { useEffect } from "react";
import Table from "../components/Table";
import { Modal } from "../components/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addRoom } from "../services/addRoom";
import { getRooms } from "../services/getRooms";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  AccessListData,
  getAccessListByRoom,
} from "../services/getAccessListByRoom";
import { getUserById, UserData } from "../services/getUserById";
import { putAccessApproved } from "../services/putAccessApproved";
import { deleteAccess } from "../services/deleteAccess";

const ManageRoomPage = () => {
  const navigate = useNavigate();

  const [selectedRoom, setSelectedRoom] = useState("");
  const [accessListData, setAccessListData] = useState<AccessListData[]>([]);
  const [addClick, setAddClick] = useState(false);
  const [roomData, setRoomData] = useState<RoomProps[]>([]);
  const [userData, setUserData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  const columns_request = [
    { header: "Name", accessor: "name" },
    { header: "Date", accessor: "date" },
    { header: "Time", accessor: "time" },
    { header: "Room", accessor: "room" },
  ];

  const columns_history = [
    { header: "Name", accessor: "name" },
    { header: "Date", accessor: "date" },
    { header: "Time", accessor: "time" },
    { header: "Room", accessor: "room" },
    { header: "Approved", accessor: "approved" },
  ];

  const data_request = accessListData
    .filter((item) => item.approved == false)
    .map((item) => {
      const user = userData.find((user) => user.id === item.user_id);
      return {
        name: user?.first_name ?? "Unknown",
        time: item.checkin,
        date: item.date,
        room: item.room_id,
        id: `${item.id}`,
      };
    });

  const data_history = accessListData
    .filter((item) => item.approved)
    .map((item) => {
      const user = userData.find((user) => user.id === item.user_id);

      return {
        name: user ? user.first_name : "Unknown",
        time: item.checkin,
        date: item.date,
        room: item.room_id,
        approved: item.approved ? "Approved" : "Pending",
      };
    });

  const initialValues = {
    room_id: "",
  };
  const validationSchema = Yup.object({
    room_id: Yup.string()
      .required("Room name is required")
      .trim()
      .min(1, "Room name cannot be empty"),
  });

  const handleClickRoom = (name: string) => {
    setSelectedRoom(name);
  };

  const handleClickAdd = () => {
    setAddClick(!addClick);
  };

  const handleSubmit = async (values: typeof initialValues) => {
    console.log("Form values:", values);
    try {
      const roomData = await addRoom(values.room_id);
      console.log("Room added successfully: ", roomData);
      Swal.fire({
        title: "Add room successfully",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        navigate("/main?menu=manage-room");
        window.location.reload();
      });
      setAddClick(false);
    } catch (error) {
      console.error("Error adding room:", error);
    }
  };

  const handleApprove = (id: string) => {
    const putData = putAccessApproved(true, id);
    console.log("Approve: ", putData);
    Swal.fire({
      title: "Approve access successfully",
      icon: "success",
      confirmButtonText: "Ok",
    }).then(() => {
      navigate("/main?menu=manage-room");
      window.location.reload();
    });
  };

  const handleReject = async (id:string) => {
    const deleteData = await deleteAccess(id);
    console.log("Delete: ", deleteData);
    Swal.fire({
      title: "Delete access successfully",
      icon: "success",
      confirmButtonText: "Ok",
    }).then(() => {
      navigate("/main?menu=manage-room");
      window.location.reload();
    });
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRooms();
        if (selectedRoom) {
          const accessData = await getAccessListByRoom(selectedRoom);
          setAccessListData(accessData);

          const userIds = accessData.map((item) => item.user_id);

          const userPromises = userIds.map((id) => getUserById(id));
          const users = await Promise.all(userPromises);

          const flattenedUsers = users.flat();

          setUserData(flattenedUsers);
        }
        setRoomData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [selectedRoom]);

  const [activeComponent, setActiveComponent] = React.useState<
    "RequestRooms" | "RequestHistory"
  >("RequestRooms");

  const [animate, setAnimate] = useState(false);

  const handleLeft = () => {
    setActiveComponent("RequestRooms");
    console.log("left");
  };
  const handleRight = () => {
    setActiveComponent("RequestHistory");
    console.log("right");
  };

  useEffect(() => {
    if (selectedRoom) {
      setAnimate(false);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true);
        });
      });
    }
  }, [selectedRoom]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full flex gap-3 overflow-x-scroll p-1">
      <div className="w-full flex flex-col flex-1/3 h-full gap-3">
        <div className="w-full flex gap-3 items-center justify-center max-[1024px]:flex-col">
          <DateBox />
          <TimeBox />
        </div>
        <AllRoom
          rooms={roomData}
          handleClickRoom={handleClickRoom}
          selectedRoom={selectedRoom}
          classNameOuter={"h-full"}
          classNameInner={
            "max-h-[58vh] max-xl:max-h-[59vh] overflow-auto rounded-lg"
          }
          addRoom={true}
          handleClickAdd={handleClickAdd}
        />
      </div>
      <div className="flex-2/3 h-full">
        <Modal isOpen={addClick} onClose={handleClickAdd} title="Add new room">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="flex flex-col space-y-4">
              {/* Room Name Input */}
              <div>
                <label htmlFor="room_id" className="block text-sm font-normal">
                  Room Name
                </label>
                <Field
                  type="text"
                  name="room_id"
                  className="border border-gray-300 p-2 w-full rounded-md focus:ring focus:ring-blue-300"
                />
                <ErrorMessage
                  name="room_id"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-8 rounded-md transition disabled:bg-gray-400 cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </Form>
          </Formik>
        </Modal>
        <div
          className={`h-full bg-white shadow-sm rounded-2xl text-[var(--text-color)] duration-300 ${
            animate ? "fade-in" : ""
          }`}
        >
          {selectedRoom ? (
            <div className="flex flex-col">
              <p className="text-xl font-medium max-[1024px]:text-lg flex items-center gap-2 min-w-[200px] px-8 py-4 border-b border-b-gray-200">
                Room :
                <span
                  className={`${
                    selectedRoom ? "bg-gray-100" : ""
                  } px-3 py-1 text-lg rounded-md`}
                >
                  {selectedRoom ?? " "}
                </span>
              </p>
              <div className="w-full flex items-center justify-center flex-col">
                <Switch
                  leftname={"Request Rooms"}
                  rightname={"Request History"}
                  onClick_left={handleLeft}
                  onClick_right={handleRight}
                />
                <div className="flex flex-col w-full px-8 ">
                  <p className="text-start">
                    {activeComponent === "RequestRooms"
                      ? "RequestRooms"
                      : "RequestHistory"}
                  </p>
                  {activeComponent === "RequestRooms" ? (
                    <Table
                      columns={columns_request}
                      data={data_request}
                      maxRows={10}
                      buttonShow={true}
                      handleApprove={(id: string) =>
                        handleApprove(id)
                      }
                      handleReject={(id:string)=>{
                        handleReject(id)
                      }}
                    />
                  ) : (
                    <Table
                      columns={columns_history}
                      data={data_history}
                      maxRows={10}
                      buttonShow={false}
                    />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <p className="text-center">Please select the room</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageRoomPage;
