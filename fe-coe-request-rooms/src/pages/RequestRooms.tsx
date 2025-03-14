import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../layout/Navbar";
import Switch from "../components/Switch";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import Table from "../components/Table";
import Swal from "sweetalert2";
import Button from "../components/Button";
import { getRooms } from "../services/getRooms";
import { RoomProps } from "../components/AllRoom";
import { getUserName } from "../services/getUserName";
import { User } from "./ShowName";
import { GetHistoryData } from "../services/getHistoryData";
import { submitAccessListRequest } from "../services/postAccess";
import Loading from "../components/Loading";

const RequestRooms = () => {
  const today = new Date().toISOString().split("T")[0];

  const [activeComponent, setActiveComponent] = React.useState<
    "RequestRoom" | "History"
  >("RequestRoom");
  const [rooms, setRooms] = useState<RoomProps[]>([]);
  const [historyData, setHistoryData] = useState<[]>([]);
  const [userInfo, setUserInfo] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLeft = () => {
    setActiveComponent("RequestRoom");
  };
  const handleRight = () => {
    setActiveComponent("History");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomData = await getRooms();
        const userInfo = await getUserName();
        if (activeComponent === "History") {
          const userId = userInfo.id;
          const data = await GetHistoryData(userId);
          setHistoryData(data);
        }
        setUserInfo(userInfo);
        setRooms(roomData);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [activeComponent]);

  const initialValues = {
    room: [],
    date: "",
    checkin: "",
    checkout: "",
    firstName: userInfo?.first_name,
    lastName: userInfo?.last_name,
  };

  const validationSchema = Yup.object({
    room: Yup.array().of(Yup.string()).min(1, "Select at least one room"),
    date: Yup.string().required("Date is required"),
    checkin: Yup.string()
      .required("Check-in time is required")
      .test(
        "is-valid-time",
        "Cannot select a past time for today",
        function (value) {
          if (!value) return true;

          const { date } = this.parent;
          if (!date) return true;

          const today = new Date().toISOString().split("T")[0];
          if (date !== today) return true;

          const now = new Date();
          const hours = now.getHours();
          const minutes = now.getMinutes();

          const [inputHours, inputMinutes] = value.split(":").map(Number);

          if (inputHours < hours) return false;
          if (inputHours === hours && inputMinutes < minutes) return false;

          return true;
        }
      ),
    checkout: Yup.string()
      .required("Check-out time is required")
      .test(
        "is-after-checkin",
        "Check-out time must be after check-in time",
        function (value) {
          const { checkin } = this.parent;
          if (!checkin || !value) return true; // Let required validation handle empty case
          return value > checkin;
        }
      ),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
  });
  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    Swal.fire({
      title: "Submitting...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      if (!userInfo) {
        throw new Error("User information not available");
      }

      const requestBody = {
        rooms: values.room,
        date: values.date,
        checkin: values.checkin,
        checkout: values.checkout,
        user_id: userInfo.id,
      };
      await submitAccessListRequest(requestBody);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your request has been submitted successfully",
        confirmButtonText: "OK",
        confirmButtonColor: "#2a7be4",
      }).then(() => {
        resetForm();
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to submit your request. Please try again.",
        confirmButtonText: "OK",
        confirmButtonColor: "#d33",
      });
    }
  };
  const columns = [
    {
      header: "Room ID",
      accessor: "roomID",
      title: "Room ID",
      dataIndex: "roomID",
      key: "roomID",
    },
    {
      header: "Date",
      accessor: "date",
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      header: "Check in",
      accessor: "checkin",
      title: "Check in",
      dataIndex: "checkin",
      key: "checkin",
    },
    {
      header: "Check out",
      accessor: "checkout",
      title: "Check out",
      dataIndex: "checkout",
      key: "checkout",
    },
    {
      header: "Status",
      accessor: "status",
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];
  const getStatusCounts = useCallback(() => {
    if (!historyData || historyData.length === 0) {
      return { pending: 0, approved: 0, rejected: 0 };
    }

    return historyData.reduce(
      (counts, item: { status: string }) => {
        if (item.status === "Approved") {
          counts.approved += 1;
        } else if (item.status === "Pending") {
          counts.pending += 1;
        } else if (item.status === "Rejected") {
          counts.rejected += 1;
        }
        return counts;
      },
      { pending: 0, approved: 0, rejected: 0 }
    );
  }, [historyData]);

  return (
    <div className="max-w-[1556px] min-[1280px]:mx-auto">
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="w-full fixed left-0 right-0 bg-[var(--primary-color)]">
            <Navbar name={"Request rooms"} isMobile={false} />
          </div>
          <div className="flex flex-col items-center justify-center space-y-8 pt-16 h-fit">
            <Switch
              leftname={"Request Rooms"}
              rightname={"Request History"}
              onClick_left={handleLeft}
              onClick_right={handleRight}
            />
            <h1 className="text-xl font-medium">
              {activeComponent === "RequestRoom"
                ? "Request to join rooms"
                : "Request History"}
            </h1>
            {activeComponent === "RequestRoom" ? (
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values }) => {
                  const now = new Date();
                  const currentHours = now
                    .getHours()
                    .toString()
                    .padStart(2, "0");
                  const currentMinutes = now
                    .getMinutes()
                    .toString()
                    .padStart(2, "0");
                  const currentTime = `${currentHours}:${currentMinutes}`;
                  const isToday = values.date === today;
                  const minCheckinTime = isToday ? currentTime : "";
                  return (
                    <Form className="flex flex-row w-full px-8 space-x-8 max-md:flex-col max-md:space-x-0 max-md:space-y-8">
                      <div className="flex-1 flex flex-col bg-white shadow-sm rounded-2xl p-8 h-full max-h-[28rem]">
                        <p className="text-center text-lg font-medium text-nowrap">
                          Room can join
                        </p>
                        <div className="flex flex-col space-y-4 mt-8 h-full overflow-y-auto scrollbar-hidden">
                          {rooms.map((room, index) => (
                            <label
                              key={index}
                              className="flex flex-row items-center space-x-4"
                            >
                              <Field
                                type="checkbox"
                                name="room"
                                value={room.room_id}
                                className="form-checkbox h-5 w-5 text-blue-600"
                              />
                              <span className="text-nowrap">
                                {room.room_id}
                              </span>
                            </label>
                          ))}
                        </div>
                        <div className="mt-6">
                          <ErrorMessage
                            name="room"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </div>
                      <div className="flex-4 bg-white shadow-sm rounded-2xl p-8 flex flex-col justify-between">
                        <div className="flex flex-col space-y-4">
                          <div className="grid grid-cols-1 gap-4">
                            <div className="h-20">
                              <label htmlFor="date">Date</label>
                              <Field
                                min={today}
                                type="date"
                                name="date"
                                className="border border-[var(--border-color)] p-2 w-full rounded-md"
                              />
                              <ErrorMessage
                                name="date"
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                            <div className="h-20">
                              <label htmlFor="checkin">Check in</label>
                              <Field
                                min={minCheckinTime}
                                type="time"
                                name="checkin"
                                step="60"
                                className="border border-[var(--border-color)] p-2 w-full rounded-md"
                              />
                              <ErrorMessage
                                name="checkin"
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>
                            <div className="h-20">
                              <label htmlFor="checkout">Check out</label>
                              <Field
                                min={values.checkin || minCheckinTime}
                                type="time"
                                name="checkout"
                                step="60"
                                className="border border-[var(--border-color)] p-2 w-full rounded-md"
                              />
                              <ErrorMessage
                                name="checkout"
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                            <div className="h-20">
                              <label htmlFor="firstName">FirstName</label>
                              <Field
                                type="text"
                                name="firstName"
                                className="border border-[var(--border-color)] p-2 w-full rounded-md"
                              />
                              <ErrorMessage
                                name="firstName"
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>
                            <div className="h-20">
                              <label htmlFor="lastname">LastName</label>
                              <Field
                                type="text"
                                name="lastName"
                                className="border border-[var(--border-color)] p-2 w-full rounded-md"
                              />
                              <ErrorMessage
                                name="lastName"
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row w-full justify-center items-center mt-6">
                          <Button>Sign in</Button>
                        </div>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            ) : (
              <div className="flex flex-col w-full px-8 space-y-8">
                {historyData.length > 0 ? (
                  <div>
                    <div className="flex flex-row space-x-4 justify-evenly items-center px-32 mb-16 w-full max-lg:px-0 max-md:flex-col max-md:space-x-0 max-md:space-y-6">
                      <div className="flex flex-col justify-center items-center h-24 min-w-40 rounded-md bg-white shadow-md max-md:w-full max-md:px-24">
                        <p className="text-sm">Pending</p>
                        <p className="text-2xl font-bold">
                          {getStatusCounts().pending}
                        </p>
                      </div>
                      <div className="flex flex-col justify-center items-center h-24 min-w-40 rounded-md bg-white shadow-md max-md:w-full max-md:px-24">
                        <p className="text-sm">Approved</p>
                        <p className="text-2xl font-bold">
                          {getStatusCounts().approved}
                        </p>
                      </div>
                      <div className="flex flex-col justify-center items-center h-24 min-w-40 rounded-md bg-white shadow-md max-md:w-full max-md:px-24">
                        <p className="text-sm">Reject</p>
                        <p className="text-2xl font-bold">
                          {getStatusCounts().rejected}
                        </p>
                      </div>
                    </div>
                    <Table columns={columns} data={historyData} maxRows={5} />
                  </div>
                ) : (
                  <div className="flex flex-row justify-center items-center h-96">
                    <p className="text-xl font-medium">No data</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestRooms;
