import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import "./styles.css";


import MapChart from "./MapChart";

function App() {
  return (
    <div>
      <MapChart />
    </div>
  );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
