import { React, useState, useEffect } from "react";
import { Form, FormControl, Button, Container, Accordion, Card, ListGroup } from "react-bootstrap";
import { getCityList } from "./data/city";
import "./Home.css"
import _ from "lodash"

export default function Home() {
    const [cityList, setCityList] = useState([]);
    const [input, setInput] = useState(null);
    const [fetchedCities, setFetchedCities] = useState([]);
    const [error, setError] = useState('');
    const [formattedData, setFormattedData] = useState([]);

    useEffect(() => {
        getCityList().then(setCityList);
    }, []);

    useEffect(() => {
        console.log(fetchedCities);
    }, [fetchedCities])

    function onChangeHandler(e) {
        setInput(e.target.value);
    }

    function submitHandler(e) {
        e.preventDefault();
        if (input === '')
            alert("pls enter value");
        else {
            console.log(input);
            getData(input);
        }
    }

    function getData(cityName) {
        var idList = getCitiesID(cityName);

        // city found
        if (idList.length != 0) {
            // fetchData will be called after CitiesID state is done
            fetchData(idList);
        }
        else {
            setError("City does not exist");
            console.log(error);
        }
    }

    async function fetchData(citiesID) {
        await fetch(`http://api.openweathermap.org/data/2.5/group?id=${citiesID}&units=metric&appid=e41d6ae36eeea5e12188edc91fa39d53`)
            .then((res) => {
                if (res.status == 404) {
                    console.log("pls enter a valid city");
                }
                else {
                    res.json().then((res) => {
                        setFetchedCities(res.list);
                    })
                }
            })
            .catch(error => setError(error));
    }

    function getCitiesID(cityName) {
        var cityIDList = [];
        var found = cityName.indexOf(',');

        for (let i = 0; i < cityList.length; i++) {
            if (found == -1) { // only city name
                if (cityList[i].name.toLowerCase() === cityName.toLowerCase())
                    cityIDList.push(cityList[i].id);
            }
            else {
                var city = cityName.substr(0, found).trim();
                var countryCode = cityName.substr(found + 1, cityName.length).trim();
                if (cityList[i].name.toLowerCase() === city.toLowerCase() && cityList[i].country === countryCode.toUpperCase()) {
                    cityIDList.push(cityList[i].id);
                }
            }
        }

        return cityIDList;
    }

    function display() {
        return (
            fetchedCities.map((city, index) => {
                var sr = new Date(city.sys.sunrise * 1000).toLocaleTimeString();
                var ss = new Date(city.sys.sunset * 1000).toLocaleTimeString();
                var flag = <img src={`http://openweathermap.org/images/flags/${city.sys.country.toLowerCase()}.png`} alt='' />;
                var icon = <img src={`https://openweathermap.org/img/wn/${city.weather[0].icon}.png`} alt='' />;

                return (
                    <Accordion key={index} id="card">
                        <Card border="secondary" >
                            <Card.Title id="card-title"> {city.name}, {city.sys.country} {flag}</Card.Title>
                            <Card.Text id="temp">{city.main.temp + '\u00B0C'}</Card.Text>
                            <Card.Text id="summary">
                                {city.weather[0].description}
                                {icon}
                            </Card.Text>

                            <Accordion.Item eventKey="0">
                                <Accordion.Header>See more/less</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item> <span>{"High/Low: " }</span> {city.main.temp_min + "/" + city.main.temp_max}</ListGroup.Item>
                                        <ListGroup.Item> <span>{"Wind: "}</span> {city.wind.speed}</ListGroup.Item>
                                        <ListGroup.Item> <span>{"Clouds: "}</span>{city.clouds.all + '%'}</ListGroup.Item>
                                        <ListGroup.Item> <span>{"hpa: "}</span>{city.main.pressure}</ListGroup.Item>
                                        <ListGroup.Item> <span>{"Sunrise: "}</span>{sr}</ListGroup.Item>
                                        <ListGroup.Item> <span>{"Sunset: "}</span>{ss}</ListGroup.Item>
                                        <ListGroup.Item> <span>{'Geo coords'}</span>{ ' ['+ city.coord.lat + ', ' + city.coord.lon + ']'}</ListGroup.Item>

                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Card>
                    </Accordion>
                )
            })
        )
    }

    return (
        <Container className="mainForm">
            <Form className="d-flex" method="post" onSubmit={submitHandler} onChange={onChangeHandler}>
                <FormControl
                    type="search"
                    placeholder="Search your city"
                    className="request"
                    aria-label="Search"
                    name="request"
                />
                <Button variant="outline-success" onClick={submitHandler}>Search</Button>
            </Form>

            {fetchedCities.length > 0 ? display() : ''}

        </Container>
    )
}
