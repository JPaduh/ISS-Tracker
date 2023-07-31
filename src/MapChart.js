import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Marker
} from "react-simple-maps";

const MapChart = () => {
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
      <Marker coordinates={[-74.006, 40.7128]}>
        <circle r={8} fill="#F53" />
      </Marker>

    </ComposableMap>
  );
};

export default MapChart;
