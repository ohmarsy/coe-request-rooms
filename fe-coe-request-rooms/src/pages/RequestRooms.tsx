import React from 'react'
import Navbar from '../layout/Navbar'
import Switch from '../components/Switch'

const RequestRooms = () => {
    return (
        <div>
            <Navbar name={'Request rooms'} />
            <div>
                <Switch leftname={'Request Rooms'} rightname={'Request History'} />
            </div>
        </div>
    )
}

export default RequestRooms