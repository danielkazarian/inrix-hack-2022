import React, {useState, useEffect, useRef, useContext} from 'react'
import Map, {Marker} from "react-map-gl"

const MAPBOX_TOKEN = 'pk.eyJ1IjoianVzdGluYzAyNTEiLCJhIjoiY2xhZWhuazVnMHM1dTNxdDR1d2p3aTh2NCJ9.17wKp6l8w4apQmD-R7q1rg'

const DefaultMap = () => {
    const [viewPort, setViewport] = useState()

    const [currentLocation, setCurrentLocation] = useState()

    const mapRef = useRef()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
          setCurrentLocation({
            ...currentLocation,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          })
        });
      }, []);

      useEffect(() => {
        if (currentLocation){
            setViewport({
                ...viewPort,
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                zoom: 9,
            });

            console.log("current latitude: ", currentLocation.latitude)
            console.log("current longitude: ", currentLocation.longitude)
        }
      }, [currentLocation])

      if (viewPort){
        return (
            <Map
                ref={mapRef}
                initialViewState={viewPort}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxAccessToken={MAPBOX_TOKEN}
              >
                <Marker
                  longitude={viewPort.longitude}
                  latitude={viewPort.latitude}
                />
            </Map>
          )
      } else {
        return (
            <div>Map Is Loading...</div>
        )
      }

      
}

export default DefaultMap
