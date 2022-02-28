import { React, useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import Post from "./components/Post"

export default function Local() {
    const [status, setStatus] = useState(null);
    const [local, setLocal] = useState(null);

    useEffect(() => {
        if (local === null)
            getLocation();
    }, []);


    const getLocation = () => {
        if (!navigator.geolocation)
            setStatus("Geolocation is not supported by your browser");
        else {
            setStatus("Locating...");
            navigator.geolocation.getCurrentPosition((pos) => {

                fetchLocal(pos.coords.latitude, pos.coords.longitude)
                setStatus(null);

            }, setStatus("Locating...")
            )
        }
    }

    async function fetchLocal(lat, long) {
        await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=e41d6ae36eeea5e12188edc91fa39d53`)
            .then((res) => {
                res.json().then(res => {
                    setStatus("Loading...");
                    setLocal(res);
                })
            }).catch(console.log)
    }


    return (
        <div className="Local">
            {local !== null ? <Post city={local} /> :  <Alert variant="info" >{status}</Alert>}
        </div>
    )

}