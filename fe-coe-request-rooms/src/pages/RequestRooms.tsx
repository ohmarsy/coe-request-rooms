import React from 'react'
import Navbar from '../layout/Navbar'
import Switch from '../components/Switch'

const RequestRooms = () => {
    return (
        <div>
            <Navbar name={'Request rooms'} />
            <div className='flex flex-col items-center justify-center space-y-4 mt-8'>
                <Switch leftname={'Request Rooms'} rightname={'Request History'} />
                <h1 className='text-xl font-medium'>Request to join rooms</h1>
                <div className='flex flex-row'>
                    <div className='flex-1'>

                    </div>
                    <div className='flex-1'>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default RequestRooms