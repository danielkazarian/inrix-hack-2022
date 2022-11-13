import React, {useState, useEffect, useRef} from 'react'
import Map, {Marker} from "react-map-gl"
import Geocoder from 'react-map-gl-geocoder'

const MAPBOX_TOKEN = 'pk.eyJ1IjoianVzdGluYzAyNTEiLCJhIjoiY2xhZWhuazVnMHM1dTNxdDR1d2p3aTh2NCJ9.17wKp6l8w4apQmD-R7q1rg'

const DefaultMap = ({geocoderContainerRef}) => {
    const [viewPort, setViewport] = useState()

    const [currentLocation, setCurrentLocation] = useState()

    const mapRef = useRef()

    const handleResult = (event) => {
        console.log(event.result)
    }

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

            console.log(currentLocation.latitude)
            console.log(currentLocation.longitude)
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

                <Geocoder 
                    mapRef={mapRef}
                    containerRef={geocoderContainerRef}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                    inputValue={"santa clara"}
                    onResult={handleResult}
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

// return (
//     // <Map
//     //   initialViewState={{
//     //     longitude: -122.4,
//     //     latitude: 37.8,
//     //     zoom: 14
//     //   }}
//     //   style={{width: 600, height: 400}}
//     //   mapStyle="mapbox://styles/mapbox/streets-v9"
//     //   mapboxAccessToken={MY_ACCESS_TOKEN}
//     // />
//     <></>
//   );
