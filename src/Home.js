import { React, useState, useEffect } from "react";
import { Form, FormControl, Button, Container, Alert } from "react-bootstrap";
import { getCityList } from "./data/city";
import Posts from "./components/Posts"
import MyPagination from "./components/MyPagination"
import Local from "./Local";

export default function Home({ viewedCity }) {

    const [mount, setMount] = useState(true);
    const [cityList, setCityList] = useState([]);
    const [input, setInput] = useState(null);
    const [fetchedCities, setFetchedCities] = useState([]);
    const [error, setError] = useState("");

    /**pagination hooks */
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(3);

    useEffect(() => {
        getCityList().then(setCityList);
        setLoading(false);
    }, [fetchedCities]);


    function onChangeHandler(e) {
        setInput(e.target.value);
    }

    function submitHandler(e) {
        e.preventDefault();
        if (input.trim() == '') {
            setError("Please enter value");
        }
        else {
            getData(input);
        }
    }

    function getData(cityName) {
        var idList = getCitiesID(cityName);

        // city found
        if (idList.length !== 0) {
            // fetchData will be called after CitiesID state is done
            fetchData(idList);
        }
        else {
            setError("Please enter a valid city. Ex: Toronto or Toronto, CA");
        }
    }

    async function fetchData(citiesID) {
        setLoading(true);
        await fetch(`https://api.openweathermap.org/data/2.5/group?id=${citiesID}&units=metric&appid=e41d6ae36eeea5e12188edc91fa39d53`)
            .then((res) => {
                if (res.status === 404) {
                    setError("Please enter a valid city. Ex: Toronto or Toronto, CA");
                }
                else {
                    res.json().then((res) => {
                        setMount(false);
                        setFetchedCities(res.list);
                        setCurrentPage(1);
                        setError('');
                    })
                }
            })
            .catch(error => {
                setError(error);
            });

    }

    function getCitiesID(cityName) {
        var cityIDList = [];
        var found = cityName.indexOf(',');

        for (let i = 0; i < cityList.length; i++) {
            if (found === -1) { // only city name
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

    // Change page
    const paginate = (pageNum) => setCurrentPage(pageNum);
    const prevPage = () => {
        if (currentPage > 1)
            setCurrentPage((currentPage) => currentPage - 1);
    }

    const nextPage = (totalPage) => {
        if (currentPage < totalPage)
            setCurrentPage((currentPage) => currentPage + 1);
    }

    // get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = fetchedCities.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <div className="main">
            <Container className="mainForm">
                <div id="searchBar">
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
                </div>
                <br />
                <div id="warning"> {error ? <Alert variant="warning" >{error}</Alert> : ''}</div>
            </Container>

            {mount ? <Local /> : ''}
            {!error ? <Posts currentPosts={currentPosts} loading={loading} viewedCity={viewedCity} /> : ''}
            {mount === false && !error ? <MyPagination postsPerPage={postsPerPage} totalPosts={fetchedCities.length} currentPage={currentPage} paginate={paginate} prevPage={prevPage} nextPage={nextPage} /> : ''}

        </div>

    )
}
