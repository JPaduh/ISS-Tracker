import { useState, useEffect } from 'react'
import {
    ComposableMap,
    Geographies,
    Geography,
    Graticule,
    Marker
  } from "react-simple-maps";

  import axios from 'axios'

function Map() {
    const [loading, setLoading] = useState(false)
    const [longitude, setLongitude] = useState(0.1278)
    const [latitude, setLatitude] = useState(51.5074)

    useEffect(() => {
        getLocation()

        const intervalId = setInterval(() => {
            getLocation();
          }, 5000);
      
          // Clean up the interval when the component unmounts
          return () => clearInterval(intervalId);
    }, [])

    const getLocation = async () => {
        setLoading(true)
        const res = await axios.get('http://api.open-notify.org/iss-now.json')

        // console.log(res)
        const { longitude, latitude } = await res.data.iss_position

        setLongitude(parseFloat(longitude))
        setLatitude(parseFloat(latitude))
        setLoading(false)

    }


    return (
        <ComposableMap projectionConfig={{ scale: 147 }}>
          <Graticule stroke="#F53" />
          <Geographies geography="/features.json">
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            }
          </Geographies>
          <Marker coordinates={[longitude, latitude]}>
            <circle r={8} fill="#F53" />
          </Marker>
    
        </ComposableMap>
      );
}

export default Map;
