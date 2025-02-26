import React from 'react'
import Navbar from '../layout/Navbar'
import Switch from '../components/Switch'

const RequestRooms = () => {
    return (
        <div>
            <Navbar name={'Request rooms'} />
            <div className='flex flex-col items-center justify-center'>
                <Switch leftname={'Request Rooms'} rightname={'Request History'} />
            </div>
        </div>
    )
}

export default RequestRooms