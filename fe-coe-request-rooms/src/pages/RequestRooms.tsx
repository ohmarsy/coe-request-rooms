import React, { useEffect, useState, useCallback } from 'react'
import Navbar from '../layout/Navbar'
import Switch from '../components/Switch'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import Table from '../components/Table';
import Swal from 'sweetalert2';

interface UserInfo {
    message: string;
    user: {
        id: number;
        email: string;
        first_name: string;
        last_name: string;
        role: string;
    };
}

const RequestRooms = () => {
    const today = new Date().toISOString().split('T')[0]; // Gets today's date in YYYY-MM-DD format

    const [activeComponent, setActiveComponent] = React.useState<"RequestRoom" | "History">("RequestRoom");
    const [rooms, setRooms] = useState<string[]>([]);
    const [historyData, setHistoryData] = useState<[]>([]);
    const [userInfo, setUserInfo] = useState<UserInfo>();
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const handleLeft = () => {
        setActiveComponent("RequestRoom")
    }
    const handleRight = () => {
        setActiveComponent("History")
    }
    const fetchRooms = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5003/rooms');

            if (!response.ok) {
                throw new Error('Failed to fetch rooms');
            }

            const data = await response.json();

            const roomIds = data.map((room: { room_id: string }) => room.room_id);
            setRooms(roomIds);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    const fetchUserInfo = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('access_token');

            if (!token) {
                throw new Error('No token found');
            }

            const response = await fetch('http://127.0.0.1:5002/protected', {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                if (response.status === 401) {
                    // Token expired or invalid
                    localStorage.removeItem('access_token');
                    window.location.href = '/login';
                    return;
                }
                throw new Error(`Failed to fetch user info: ${response.status}`);
            }

            const data = await response.json();
            setUserInfo(data);
        } catch (error) {
            console.error('Error fetching user info:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchHistoryData = useCallback(async () => {
        try {
            if (!userInfo || !userInfo.user) {
                console.error('User information not available');
                return;
            }
            const userId = userInfo.user.id;
            const response = await fetch(`http://127.0.0.1:5003/access-list/user/${userId}`);

            if (!response.ok) {
                throw new Error('Failed to fetch history data');
            }

            const data = await response.json();

            const formattedData = data.map((item: { id: number, room_id: string, date: string, checkin: string, checkout: string, approved: string }) => {
                const dateObj = new Date(item.date);
                const formattedDate = dateObj.toISOString().split('T')[0];


                const checkinTime = item.checkin.substring(0, 5);
                const checkoutTime = item.checkout.substring(0, 5);

                const status = item.approved == "approved" ? 'Approved' : 'Pending';

                return {
                    key: item.id.toString(),
                    roomID: item.room_id,
                    date: formattedDate,
                    checkin: checkinTime,
                    checkout: checkoutTime,
                    status: status
                };
            });

            setHistoryData(formattedData);
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    }, [userInfo]);

    useEffect(() => {
        fetchRooms();
        fetchUserInfo();
    }, []);


    useEffect(() => {
        if (activeComponent === "History") {
            fetchHistoryData();
        }
    }, [activeComponent, fetchHistoryData]);

    const initialValues = {
        room: [],
        date: '',
        checkin: '',
        checkout: '',
        firstName: userInfo?.user.first_name,
        lastName: userInfo?.user.last_name,
    }

    const validationSchema = Yup.object({
        room: Yup.array().of(Yup.string()).min(1, 'Select at least one room'),
        date: Yup.string().required('Date is required'),
        checkin: Yup.string()
            .required('Check-in time is required')
            .test('is-valid-time', 'Cannot select a past time for today', function (value) {
                if (!value) return true;

                const { date } = this.parent;
                if (!date) return true;

                const today = new Date().toISOString().split('T')[0];
                if (date !== today) return true;

                const now = new Date();
                const hours = now.getHours();
                const minutes = now.getMinutes();

                const [inputHours, inputMinutes] = value.split(':').map(Number);

                if (inputHours < hours) return false;
                if (inputHours === hours && inputMinutes < minutes) return false;

                return true;
            }),        checkout: Yup.string()
            .required('Check-out time is required')
            .test('is-after-checkin', 'Check-out time must be after check-in time', function (value) {
                const { checkin } = this.parent;
                if (!checkin || !value) return true; // Let required validation handle empty case
                return value > checkin;
            }), firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
    })
    const handleSubmit = async (values: typeof initialValues, { resetForm }: FormikHelpers<typeof initialValues>) => {
        Swal.fire({
            title: 'Submitting...',
            text: 'Please wait',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        try {
            if (!userInfo || !userInfo.user) {
                throw new Error('User information not available');
            }

            const requestBody = {
                rooms: values.room,
                date: values.date,
                checkin: values.checkin,
                checkout: values.checkout,
                user_id: userInfo.user.id,
            }
            const response = await fetch('http://127.0.0.1:5003/access-list/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            })

            if (!response.ok) {
                throw new Error('Failed to submit')
            }

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Your request has been submitted successfully',
                confirmButtonText: 'OK',
                confirmButtonColor: '#3085d6'
            }).then(() => {
                resetForm();
            }
            );
        } catch {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to submit your request. Please try again.',
                confirmButtonText: 'OK',
                confirmButtonColor: '#d33'
            });
        }
    }
    const columns = [
        { header: 'Room ID', accessor: 'roomID', title: 'Room ID', dataIndex: 'roomID', key: 'roomID' },
        { header: 'Date', accessor: 'date', title: 'Date', dataIndex: 'date', key: 'date' },
        { header: 'Check in', accessor: 'checkin', title: 'Check in', dataIndex: 'checkin', key: 'checkin' },
        { header: 'Check out', accessor: 'checkout', title: 'Check out', dataIndex: 'checkout', key: 'checkout' },
        { header: 'Status', accessor: 'status', title: 'Status', dataIndex: 'status', key: 'status' },
    ]
    return (
        <div>
            {isLoading ? (
                <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center bg-white">
                    <svg className="animate-spin h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="mt-4 text-lg font-medium text-gray-600">Loading...</p>
                </div>
            )
                :
                (
                    <div>
                        <Navbar name={'Request rooms'} isMobile={false} />
                        <div className='flex flex-col items-center justify-center space-y-8 pt-16'>
                            <Switch leftname={'Request Rooms'} rightname={'Request History'} onClick_left={handleLeft} onClick_right={handleRight} />
                            <h1 className='text-xl font-medium'>{activeComponent === 'RequestRoom' ? 'Request to join rooms' : 'Request History'}</h1>
                            {activeComponent === 'RequestRoom' ? (
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ values }) => {
                                        const now = new Date();
                                        const currentHours = now.getHours().toString().padStart(2, '0');
                                        const currentMinutes = now.getMinutes().toString().padStart(2, '0');
                                        const currentTime = `${currentHours}:${currentMinutes}`;
                                        const isToday = values.date === today;
                                        const minCheckinTime = isToday ? currentTime : '';
                                        return (
                                            (
                                                <Form className='flex flex-row w-full px-8 space-x-8'>
                                                    <div className='flex-1 flex flex-col bg-white shadow-sm rounded-2xl p-8 h-full max-h-[28rem]'>
                                                        <p className='text-center text-lg font-medium text-nowrap'>Room can join</p>
                                                        <div className='flex flex-col space-y-4 mt-8 h-full overflow-y-auto scrollbar-hidden'>
                                                            {rooms.map((room, index) => (
                                                                <label key={index} className='flex flex-row items-center space-x-4'>
                                                                    <Field type='checkbox' name='room' value={room} className="form-checkbox h-5 w-5 text-blue-600" />
                                                                    <span className='text-nowrap'>{room}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                        <div className='mt-6'>
                                                            <ErrorMessage name="room" component="div" className="text-red-500 text-sm" />
                                                        </div>
                                                    </div>
                                                    <div className='flex-4 bg-white shadow-sm rounded-2xl p-8 flex flex-col justify-between'>
                                                        <div className='flex flex-col space-y-4'>
                                                            <div className='grid grid-cols-1 gap-4'>
                                                                <div className='h-20'>
                                                                    <label htmlFor="date">Date</label>
                                                                    <Field min={today} type="date" name="date" className="border border-[var(--border-color)] p-2 w-full rounded-md" />
                                                                    <ErrorMessage name="date" component="div" className="text-red-500 text-sm" />
                                                                </div>
                                                            </div>
                                                            <div className='grid grid-cols-2 gap-4'>
                                                                <div className='h-20'>
                                                                    <label htmlFor="checkin">Check in</label>
                                                                    <Field min={minCheckinTime} type="time" name="checkin" step="60" className="border border-[var(--border-color)] p-2 w-full rounded-md" />
                                                                    <ErrorMessage name="checkin" component="div" className="text-red-500 text-sm" />
                                                                </div>
                                                                <div className='h-20'>
                                                                    <label htmlFor="checkout">Check out</label>
                                                                    <Field min={values.checkin || minCheckinTime}  type="time" name="checkout" step="60" className="border border-[var(--border-color)] p-2 w-full rounded-md" />
                                                                    <ErrorMessage name="checkout" component="div" className="text-red-500 text-sm" />
                                                                </div>
                                                            </div>
                                                            <div className='grid grid-cols-2 gap-4'>
                                                                <div className='h-20'>
                                                                    <label htmlFor="firstName">FirstName</label>
                                                                    <Field type="text" name="firstName" className="border border-[var(--border-color)] p-2 w-full rounded-md" />
                                                                    <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
                                                                </div>
                                                                <div className='h-20'>
                                                                    <label htmlFor="lastname">LastName</label>
                                                                    <Field type="text" name="lastName" className="border border-[var(--border-color)] p-2 w-full rounded-md" />
                                                                    <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='flex flex-row w-full justify-center items-center'>
                                                            <button
                                                                type="submit"
                                                                className="mt-8 bg-blue-500 text-white py-2 px-16 rounded-md disabled:bg-gray-400"
                                                            >
                                                                Submit
                                                            </button>
                                                        </div>
                                                    </div>
                                                </Form>
                                            )
                                        )
                                    }}
                                </Formik>
                            ) : (
                                <div className='flex flex-col w-full px-8 space-y-8'>
                                    {historyData.length > 0 ? (
                                        <div>
                                            <div className='flex flex-row space-x-4 justify-evenly items-center px-32 mb-16'>
                                                <div className='flex flex-col justify-center items-center h-24 min-w-40 rounded-md bg-white shadow-md'>
                                                    <p className='text-sm'>Inprogress</p>
                                                    <p className='text-2xl font-bold'>0</p>
                                                </div>
                                                <div className='flex flex-col justify-center items-center h-24 min-w-40 rounded-md bg-white shadow-md'>
                                                    <p className='text-sm'>Approved</p>
                                                    <p className='text-2xl font-bold'>0</p>
                                                </div>
                                                <div className='flex flex-col justify-center items-center h-24 min-w-40 rounded-md bg-white shadow-md'>
                                                    <p className='text-sm'>Reject</p>
                                                    <p className='text-2xl font-bold'>0</p>
                                                </div>
                                            </div>
                                            <Table columns={columns} data={historyData} maxRows={5} />
                                        </div>
                                    ) : (
                                        <div className='flex flex-row justify-center items-center h-96'>
                                            <p className='text-xl font-medium'>No data</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
        </div>
    )
}

export default RequestRooms