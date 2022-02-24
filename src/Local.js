import { React, useState, useEffect } from "react";

export default function Local() {
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const [time, setTime] = useState(null);
    const [status, setStatus] = useState(null);

    const getLocation = () => {
        if (!navigator.geolocation)
            setStatus("Geolocation is not supported by your browser");
        else {
            setStatus("Locating...");
            navigator.geolocation.getCurrentPosition((pos) => {
                console.log(pos);
                setStatus(null);
                setLat(pos.coords.latitude);
                setLong(pos.coords.longitude);
                setTime(pos.timestamp);

            }, () => {
                setStatus("Unable to retrieve your location");
            })
        }
    }
    
    return (
        <div className="App">
            <button onClick={getLocation}>Get Location</button>
            <h1>Coordinates</h1>
            <p>{status}</p>
            {lat && <p>Latitude: {lat}</p>}
            {long && <p>Longitude: {long}</p>}
        </div>
    )

}