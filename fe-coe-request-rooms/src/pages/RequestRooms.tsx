import React from 'react'
import Navbar from '../layout/Navbar'
import Switch from '../components/Switch'



const RequestRooms = () => {
    const [activeComponent, setActiveComponent] = React.useState<"RequestRoom" | "History">("RequestRoom");
    const handleLeft = () => {
        setActiveComponent("RequestRoom")
        console.log('left')
    }
    const handleRight = () => {
        setActiveComponent("History")
        console.log('right')
    }
    return (
        <div>
            <Navbar name={'Request rooms'} />
            <div className='flex flex-col items-center justify-center space-y-8 mt-8'>
                <Switch leftname={'Request Rooms'} rightname={'Request History'} onClick_left={handleLeft} onClick_right={handleRight} />
                <h1 className='text-xl font-medium'>{activeComponent === 'RequestRoom' ? 'Request to join rooms' : 'Request History'}</h1>
                <div className='flex flex-row w-full px-8 space-x-8'>
                    <div className='flex-1 flex flex-col'>
                        <p className='text-center text-lg font-medium'>Room can join</p>
                        <div className='flex flex-col space-y-4'>
                        </div>
                    </div>
                    <div className='flex-3 bg-yellow-500'>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default RequestRooms