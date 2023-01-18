import React from 'react'
import { Card, ListGroup, Container } from "react-bootstrap";
import "./../cite.css";

/* Display a single city: local, viewed city/ID */

export default function Post({ city }) {
    var sr = new Date(city.sys.sunrise * 1000).toLocaleTimeString();
    var ss = new Date(city.sys.sunset * 1000).toLocaleTimeString();
    let flag = "https://openweathermap.org/images/flags/" + city.sys.country.toLowerCase() + ".png";
    var icon = "https://openweathermap.org/img/w/" + city.weather[0].icon + ".png";

    return (
        <div className="main">
            <Container className="mainForm">
                <div id='post'>
                    <Card border="secondary" id="card">
                        <Card.Title id="card-title"> {city.name}, {city.sys.country} <img id="flag" src={flag} alt='country flag' /></Card.Title>
                        <Card.Text id="temp">{city.main.temp + '\u00B0C'}</Card.Text>
                        <Card.Text id="summary">
                            {city.weather[0].description}
                            <img id="icon" src={icon} alt="weather icon"/>
                        </Card.Text>

                        <ListGroup variant="flush" id='list'>
                            <ListGroup.Item> <span>{"High/Low: " + city.main.temp_min + '\u00B0C' + " - " + city.main.temp_max + '\u00B0C'}</span> </ListGroup.Item>
                            <ListGroup.Item> <span>{"Wind: " + city.wind.speed + "m/s" + " Clouds: "+ city.clouds.all + '%'}</span> </ListGroup.Item>
                            <ListGroup.Item> <span>{"Hpa: " + city.main.pressure}</span></ListGroup.Item>
                            <ListGroup.Item> <span>{"Sunrise: "+ sr}</span><br /><span>{"Sunset: "+ ss}</span></ListGroup.Item>
                            <ListGroup.Item> <span>{'Geo coords:' + ' [' + city.coord.lat + ', ' + city.coord.lon + ']'}</span></ListGroup.Item>
                        </ListGroup>

                    </Card>
                </div>
            </Container>
        </div>
    )
}
