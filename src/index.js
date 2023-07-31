import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import "./styles.css";

import Map from "./components/Map";

function App() {
  return (
    <div>
      <Map />
    </div>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
