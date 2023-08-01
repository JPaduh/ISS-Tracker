import { useState, useEffect } from 'react'
import {
    ComposableMap,
    Geographies,
    Geography,
    Graticule,
    ZoomableGroup,
    Marker
  } from "react-simple-maps";

  import axios from 'axios'

  import issIcon from './iss.png'

function Map() {
    const [loading, setLoading] = useState(false)
    const [longitude, setLongitude] = useState()
    const [latitude, setLatitude] = useState()
    const [astronauts, setAstronauts] = useState([]);

    useEffect(() => {
        getLocation()
        getCrew()

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

    const getCrew = async () => {
        setLoading(true)
        try {
            const res = await axios.get('http://api.open-notify.org/astros.json');
            const astronautsData = res.data;
      
            console.log('Astronaut Data:', astronautsData.people); // Add this console.log
      
            const astronautsInfo = astronautsData.people.map((astronaut) => ({
              name: astronaut.name,
              craft: astronaut.craft,
            }));
      
            console.log('Astronaut Info:', astronautsInfo);
      
            setAstronauts(astronautsInfo);
          } catch (error) {
            console.error('Error fetching astronaut data:', error);
          } finally {
            setLoading(false);
          }
        
    }


    return (
        <div>
            <h1 style={{ color: "white", fontFamily: "Courier New" }}>Total Astronauts: {astronauts.length}</h1>
            <ul style={{ color: "white", fontFamily: "Courier New" }}>
            {astronauts.map((astronaut, index) => (
            <li key={index}>
                {astronaut.name} - {astronaut.craft}
            </li>
            ))}
        </ul>

        <ComposableMap projectionConfig={{ scale: 147 }}>
            <ZoomableGroup 
                // center={[longitude, latitude]} 
                // zoom={9}
                >
          <Graticule stroke="#1056d7" />
          <Geographies geography="/features.json">
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography 
                key={geo.rsmKey} 
                geography={geo} 
                style={{
                    background:"#000000",
                    default: {
                      fill: "#218d26",
                    },
                    hover: {
                      fill: "#F53",
                    },
                    pressed: {
                      fill: "#E42",
                    },
                  }}
                />
              ))
            }
          </Geographies>
          <Marker coordinates={[longitude, latitude]}>
            {/* <circle 
                r={8} 
                fill="#F53" 
            /> */}
            <image
                href={issIcon}
                width="30"
                height="30"
                x="-15"
                y="-15"
            />
          </Marker>
          </ZoomableGroup>
    
        </ComposableMap>
        </div>
      );
}

export default Map;
