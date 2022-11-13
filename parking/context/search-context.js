import { useState, useEffect, useReducer, createContext } from 'react'
import {locationToCoordinates} from '../services/geocode'
import { getLots } from '../services/lots'
import { tempBearerToken } from '../services/token'

const SearchContext = createContext({
    location: '', 
    changeLocation: () => {}, 
    lots: [], 
    setLots: () => {}
})

const SearchContextProvider = (props) => {
    const [location, setLocation] = useState('')
    const [lots, setLots] = useState([])
    
    const changeLocation = (location) => {
        console.log(location)
        setLocation(location)
        locationToCoordinates(location[0])
    }

    const searchContext = {
        location: location,
        changeLocation: changeLocation,
        lots: lots,
        changeLots: setLots
    }

    return (
        <SearchContext.Provider value={searchContext}>
            {props.children}
        </SearchContext.Provider>
    )

}

export {SearchContext, SearchContextProvider}