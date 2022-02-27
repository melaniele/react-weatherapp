import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useState } from 'react'
import Home from "./Home";
import Post from './components/Post';
import "./cite.css";

function App() {
  const [recentlyViewed, addViewedCity] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  function viewedCity(city) {
    var match = false;
    for (let i = 0; i < recentlyViewed.length; i++) {
      if (city.id === recentlyViewed[i].id) {
        match = true;
        break;
      }
    }

    if (!match) {
      var temp = recentlyViewed.concat(city);
      addViewedCity(temp);
    }
  }

  return (
    <div>
      <Navbar bg="light" expand="lg" inverse="true" collapseOnSelect statictop="true">
        <Container fluid>
          <Navbar.Brand href="/" className="navbar">Today's Weather</Navbar.Brand>
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}>

            <Nav.Link onClick={() => { navigate(`/`) }}>Home</Nav.Link>

            <NavDropdown title="Previously Viewed" id="navbarScrollingDropdown" >
              {recentlyViewed.length > 0 ?
                recentlyViewed.map((city, index) => (
                  <NavDropdown.Item onClick={() => { navigate(`/City/${city.id}`) }} key={index}>
                    {city.name}, {city.sys.country} {<img src={`http://openweathermap.org/images/flags/${city.sys.country.toLowerCase()}.png`} alt='' />}
                  </NavDropdown.Item>)) :
                <NavDropdown.ItemText>No city visited</NavDropdown.ItemText>}
            </NavDropdown>

          </Nav>
        </Container>
      </Navbar>

      {location.pathname.match(/\/City/g) !== null ? <Post city={(recentlyViewed.filter(obj => obj.id.toString() === params.id))[0]} /> : <Home viewedCity={viewedCity} />}

    </div>
  );
}

export default App;