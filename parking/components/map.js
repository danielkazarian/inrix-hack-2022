import React, {useState, useEffect} from 'react'
import Map, {Marker} from "react-map-gl";

const MAPBOX_TOKEN = 'pk.eyJ1IjoianVzdGluYzAyNTEiLCJhIjoiY2xhZWhuazVnMHM1dTNxdDR1d2p3aTh2NCJ9.17wKp6l8w4apQmD-R7q1rg'

const DefaultMap = () => {
    const [viewPort, setViewport] = useState()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
          setViewport({
            ...viewPort,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            zoom: 9,
          });
          console.log(pos.coords.latitude)
          console.log(pos.coords.longitude)
        });
      }, []);

      if (viewPort){
        return (
            <Map
                mapboxAccessToken={MAPBOX_TOKEN}
                initialViewState={viewPort}
                mapStyle="mapbox://styles/mapbox/streets-v11"
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
