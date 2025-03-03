import React from 'react'
import Navbar from '../layout/Navbar'
import Switch from '../components/Switch'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";



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
    return (
        <div>
            <Navbar name={'Request rooms'} />
            <div className='flex flex-col items-center justify-center space-y-8 mt-8'>
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
                                            <Field type="time" name="checkin" step="60" className="border border-[var(--border-color)] p-2 w-full rounded-md"  />
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
                    <div>
                        kuy
                    </div>
                )}
            </div>
        </div>
    )
}

export default RequestRooms