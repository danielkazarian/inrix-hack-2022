import React, {useState, useEffect, useRef, useContext} from 'react'
import Map, {Marker} from "react-map-gl"

import { SearchContext } from '../context/search-context'
import Image from 'next/image'
import 'mapbox-gl/dist/mapbox-gl.css'
import {locationToCoordinates} from '../services/geocode'
import { getLots } from '../services/lots'
import { tempBearerToken } from '../services/token'

const MAPBOX_TOKEN = 'pk.eyJ1IjoianVzdGluYzAyNTEiLCJhIjoiY2xhZWhuazVnMHM1dTNxdDR1d2p3aTh2NCJ9.17wKp6l8w4apQmD-R7q1rg'

const DefaultMap = () => {
    const [viewPort, setViewport] = useState()

    const [currentLocation, setCurrentLocation] = useState('')
    const [currentLots, setCurrentLots] = useState([])
    const {location, changeLocation, changeLots} = useContext(SearchContext)

    const mapRef = useRef()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          setCurrentLocation({
            ...currentLocation,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        });
    }, []);

    useEffect(() => {
        const changeCurrentLocation = async () => {
            if (currentLocation){
                setViewport({
                    ...viewPort,
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                    zoom: 14,
                });

                console.log("current latitude: ", currentLocation.latitude)
                console.log("current longitude: ", currentLocation.longitude)

                try {
                    const newLots = await getLots(currentLocation.latitude, currentLocation.longitude, 1, tempBearerToken)
                    setCurrentLots(newLots)
                    changeLots(newLots)
                    console.log("newLots: ", lots)
                } catch (error) {

                }
            }
        }

        changeCurrentLocation()
    }, [currentLocation])

    useEffect(() => {
        const changeCurrentLocation = async() => {
            if (location){
                console.log("location search: ", location)
                const newLocation = await locationToCoordinates(location)
                console.log("current location search:" + newLocation)

                setCurrentLocation({
                    ...currentLocation,
                    longitude: newLocation.features[0].geometry.coordinates[0],
                    latitude: newLocation.features[0].geometry.coordinates[1],
                })
                console.log("current latitude search : ", currentLocation.latitude)
                console.log("current longitude search: ", currentLocation.longitude)
                
                // const newLots = await getLots(currentLocation.latitude, currentLocation.longitude, 1, tempBearerToken)
                // setLots(newLots)
            }
        }

        changeCurrentLocation()
    }, [location])

    if (viewPort){
        return (
            <div style={{height: '100vh'}}> 
                <Map
                    ref={mapRef}
                    initialViewState={viewPort}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    mapboxAccessToken={MAPBOX_TOKEN}
                >
                    <Marker
                        latitude={currentLocation.latitude}
                        longitude={currentLocation.longitude}
                        anchor="bottom"
                        color='red'
                    >
                    </Marker>
                    
                    {currentLots.length > 1 && (
                        currentLots.map((lot, index) => (
                            <Marker 
                                key={index}
                                latitude={lot.data.coordinates.latitude}
                                longitude={lot.data.coordinates.longitude}
                                anchor="bottom"
                            />
                        )
                        )
                        
                    )}
                </Map>
            </div>
            )
        } else {
        return (
            <div>Map Is Loading...</div>
        )
    }

      
}

export default DefaultMap
