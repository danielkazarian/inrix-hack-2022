import React, {useContext} from 'react'
import { SearchContext } from '../context/search-context'

const LocationCards = (props) => {
    const {location, changeLocation, lots, changeLots} = useContext(SearchContext)

    if (lots != undefined && lots.length > 0) {
        return (
            <div className='flex flex-col mt-[4rem]'>
                <div>{lots[0].name}</div>
            </div>
        )

    } else {
        return (
            <></>
        )
    }
}

export default LocationCards