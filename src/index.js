import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import "./styles.css";


const App = () => (
  <div>
    <ComposableMap>
      <Geographies geography="/features.json">
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
    </ComposableMap>
  </div>
);

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
