import {
  Navbar, Nav, NavItem, NavDropdown, FormGroup, FormControl, Grid,
  Row, Col, Header, Container, Form, Button
} from "react-bootstrap";
import { Link, Routes, Redirect, Route, BrowserRouter } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useState } from 'react'
import Home from "./Home";

function App() {
  const [recentlyViewed, addViewedCity] = useState([]);
  const [searchId, updateSearchId] = useState("");

  function viewedCity(id) {
    var allRecentlyView = recentlyViewed;
    var match = false;
    for (let i = 0; i < allRecentlyView.length; i++) {
      if (id === allRecentlyView[i]) {
        match = true;
      }
    }

    if (!match) {
      allRecentlyView.push(id);
      addViewedCity(allRecentlyView);
    }
  }

  function searchedID(id) {

  }

  return (
    <div>
      <Navbar bg="light" expand="lg" inverse="true" collapseOnSelect statictop="true">
        <Container fluid>
          <Navbar.Brand href="/">BTI425 - Weather</Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>
              <NavDropdown title="Previously Viewed" id="navbarScrollingDropdown">

                {recentlyViewed.length > 0 ?
                  recentlyViewed.map((id, index) => (
                    <LinkContainer to={`/City/${id}`} key={index}>
                      <NavDropdown.Item >City: {id}</NavDropdown.Item>
                    </LinkContainer>)) :
                  <NavDropdown.Item> you haven't visited any city</NavDropdown.Item>}

              </NavDropdown>
            </Nav>

            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="City ID"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;