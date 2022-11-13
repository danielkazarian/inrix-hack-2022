import React, {useContext} from 'react'
import { SearchContext } from '../context/search-context'

const LocationCards = (props) => {
    const {location, changeLocation, lots, changeLots} = useContext(SearchContext)

    if (lots != undefined && lots.length > 0) {
        return (
            <div className='flex flex-col overflow-y-auto content-center mt-[2rem] space-y-[2rem]'>
                 {lots.map((lot, index) => (
                    <div key={index} className='flex flex-col justify-center w-[35rem] bg-[#EDF5FD] border-[0.13rem] border-[#648690] rounded-xl'>
                        <div className='font-bold'>{lot.name}</div>
                        <div className=''>{lot.data.hourlyRate}</div>
                        <div className=''>{lot.data.hours[0]}</div>
                        <div className=''>{"Address: " + lot.data.navigationAddress.street + ", " + lot.data.navigationAddress.city + ", " + lot.data.navigationAddress.state + ', ' + lot.data.navigationAddress.postal}</div>
                        <div className=''>{'Occupancy: ' + lot.data.occupancy.pct}</div>
                    </div>
                ))}
            </div>
        )

    } else {
        return (
            <></>
        )
    }
}

export default LocationCards