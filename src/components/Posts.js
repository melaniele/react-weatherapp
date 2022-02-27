import React from 'react'
import { Accordion, Card, ListGroup, Container, Alert } from "react-bootstrap";
import "./../cite.css";

export default function Posts({ currentPosts, loading, viewedCity }) {
  if (loading) {
    return <h2><Alert variant="info" >loading...</Alert></h2>
  }

  return (
    currentPosts.map((city, index) => {
      var sr = new Date(city.sys.sunrise * 1000).toLocaleTimeString();
      var ss = new Date(city.sys.sunset * 1000).toLocaleTimeString();
      let flag = "https://openweathermap.org/images/flags/" + city.sys.country.toLowerCase() + ".png";
      var icon = "https://openweathermap.org/img/w/" + city.weather[0].icon + ".png";

      return (
        <Container className="mainForm" key={index}>
          <Accordion>
            <div id='post'>

              <Card border="secondary" id="card">
                <Card.Title id="card-title"> {city.name}, {city.sys.country} <img id="flag" src={flag} alt='country flag' /> </Card.Title>
                <Card.Text id="temp">{city.main.temp + '\u00B0C'}</Card.Text>
                <Card.Text id="summary">
                  {city.weather[0].description}
                  <img id="icon" src={icon} />
                </Card.Text>

                <Accordion.Item eventKey="0" onClick={() => viewedCity(city)}>
                  <Accordion.Header>See more/less</Accordion.Header>
                  <Accordion.Body>
                    <ListGroup variant="flush" id='list'>
                      <ListGroup.Item> <span>{"High/Low: "}</span> {city.main.temp_min + '\u00B0C' + " - " + city.main.temp_max + '\u00B0C'}</ListGroup.Item>
                      <ListGroup.Item> <span>{"Wind: "}</span> {city.wind.speed + "m/s"}  <span>{" Clouds: "}</span>{city.clouds.all + '%'}</ListGroup.Item>
                      <ListGroup.Item> <span>{"Hpa: "}</span>{city.main.pressure}</ListGroup.Item>
                      <ListGroup.Item> <span>{"Sunrise: "}</span>{sr}<br /><span>{"Sunset: "}</span>{ss}</ListGroup.Item>
                      <ListGroup.Item> <span>{'Geo coords:'}</span>{' [' + city.coord.lat + ', ' + city.coord.lon + ']'}</ListGroup.Item>
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>

              </Card>
            </div>
          </Accordion>
        </Container>

      )
    })
  )
}
