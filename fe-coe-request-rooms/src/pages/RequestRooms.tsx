import React from 'react'
import Navbar from '../layout/Navbar'
import Switch from '../components/Switch'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Table from '../components/Table';



const RequestRooms = () => {
    
    const [activeComponent, setActiveComponent] = React.useState<"RequestRoom" | "History">("RequestRoom");
    const handleLeft = () => {
        setActiveComponent("RequestRoom")
    }
    const handleRight = () => {
        setActiveComponent("History")
    }
    const rooms = [
        'EN4101',
        'EN4102',
        'EN4103',
        'EN4104',
        'EN4105',
    ]
    const initialValues = {
        room: [],
        date: '',
        checkin: '',
        checkout: '',
        firstName: '',
        lastName: '',
    }
    const validationSchema = Yup.object({
        room: Yup.array().of(Yup.string()).min(1, 'Select at least one room'),
        date: Yup.string().required('Date is required'),
        checkin: Yup.string().required('Check-in time is required'),
        checkout: Yup.string().required('Check-out time is required'),
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
    })
    const handleSubmit = (values: typeof initialValues) => {
        console.log('Form values:', values)
    }
    const columns = [
        { header: 'Room ID', accessor: 'roomID', title: 'Room ID', dataIndex: 'roomID', key: 'roomID' },
        { header: 'Date', accessor: 'date', title: 'Date', dataIndex: 'date', key: 'date' },
        { header: 'Check in', accessor: 'checkin', title: 'Check in', dataIndex: 'checkin', key: 'checkin' },
        { header: 'Check out', accessor: 'checkout', title: 'Check out', dataIndex: 'checkout', key: 'checkout' },
        { header: 'Status', accessor: 'status', title: 'Status', dataIndex: 'status', key: 'status' },
    ]

    const data = [
        { key: '1', roomID: 'EN4101', date: '2025-03-01', checkin: '08:00', checkout: '10:00', status: 'Approved' },
        { key: '2', roomID: 'EN4102', date: '2025-03-02', checkin: '09:00', checkout: '11:00', status: 'Pending' },
        { key: '3', roomID: 'EN4103', date: '2025-03-03', checkin: '10:00', checkout: '12:00', status: 'Rejected' },
        { key: '3', roomID: 'EN4103', date: '2025-03-03', checkin: '10:00', checkout: '12:00', status: 'Rejected' },
        { key: '3', roomID: 'EN4103', date: '2025-03-03', checkin: '10:00', checkout: '12:00', status: 'Rejected' },
        { key: '3', roomID: 'EN4103', date: '2025-03-03', checkin: '10:00', checkout: '12:00', status: 'Rejected' },
        { key: '3', roomID: 'EN4103', date: '2025-03-03', checkin: '10:00', checkout: '12:00', status: 'Rejected' },
        { key: '3', roomID: 'EN4103', date: '2025-03-03', checkin: '10:00', checkout: '12:00', status: 'Rejected' },
    ]
    return (
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
                        <Form className='flex flex-row w-full px-8 space-x-8'>
                            <div className='flex-1 flex flex-col bg-white shadow-sm rounded-2xl p-8 h-full'>
                                <p className='text-center text-lg font-medium'>Room can join</p>
                                <div className='flex flex-col space-y-4 mt-8'>
                                    {rooms.map((room, index) => (
                                        <label key={index} className='flex flex-row items-center space-x-4'>
                                            <Field type='checkbox' name='room' value={room} className="form-checkbox h-5 w-5 text-blue-600" />
                                            <span>{room}</span>
                                        </label>
                                    ))}
                                    <ErrorMessage name="room" component="div" className="text-red-500 text-sm" />
                                </div>
                            </div>
                            <div className='flex-4 bg-white shadow-sm rounded-2xl p-8'>
                                <div className='flex flex-col space-y-4'>
                                    <div className='grid grid-cols-1 gap-4'>
                                        <div className='h-20'>
                                            <label htmlFor="date">Date</label>
                                            <Field type="date" name="date" className="border border-[var(--border-color)] p-2 w-full rounded-md" />
                                            <ErrorMessage name="date" component="div" className="text-red-500 text-sm" />
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-4'>
                                        <div className='h-20'>
                                            <label htmlFor="checkin">Check in</label>
                                            <Field type="time" name="checkin" step="60" className="border border-[var(--border-color)] p-2 w-full rounded-md" />
                                            <ErrorMessage name="checkin" component="div" className="text-red-500 text-sm" />
                                        </div>
                                        <div className='h-20'>
                                            <label htmlFor="checkout">Check out</label>
                                            <Field type="time" name="checkout" step="60" className="border border-[var(--border-color)] p-2 w-full rounded-md" />
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
                    </Formik>
                ) : (
                    <div className='flex flex-col w-full px-8 space-y-8'>
                        <div className='flex flex-row space-x-4 justify-evenly items-center px-32'>
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
                        <Table columns={columns} data={data} maxRows={5} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default RequestRooms