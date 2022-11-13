import { useState, useEffect, useReducer, createContext } from 'react'
import {locationToCoordinates} from '../services/geocode'

const SearchContext = createContext({location: '', changeLocation: () => {}})

const SearchContextProvider = (props) => {
    const [location, setLocation] = useState('')
    
    const changeLocation = (location) => {
        console.log(location)
        setLocation(location)
        locationToCoordinates(location)
    }

    const searchContext = {
        location: location,
        changeLocation: changeLocation
    }

    return (
        <SearchContext.Provider value={searchContext}>
            {props.children}
        </SearchContext.Provider>
    )

}

export {SearchContext, SearchContextProvider}