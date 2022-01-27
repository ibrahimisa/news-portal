import React, {useState} from "react";
import {
  Navbar,
  Form,
  FormControl,
  Button,
  Container,
  Nav,
} from "react-bootstrap";
import Link from "./Link";
import {NavLink, useNavigate, useSearchParams, useLocation} from 'react-router-dom'
import SearchLink from './SearchLink'

function NavigationBar({ categories, setQueryValue, queryValue }) {
  const [isOpen, setIsOpen] = React.useState(false);
  let navigate = useNavigate();
  let location = useLocation();
  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <Navbar expand="lg" color="faded" bg="light">
      <Container fluid>
        <Navbar.Brand
          as={NavLink}
          to="/"
          className="me-auto d-flex align-items-center fs-2"
          href="/"
        >
          <h2 className="blacked p-2 bg-dark rounded text-light">News</h2>
          Portal
        </Navbar.Brand>
        <Navbar.Toggle
          className="me-2"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        <Navbar.Collapse>
          <Nav className="mx-auto">
            {categories.map((link) => (
              <Link name={link} />
            ))}
          </Nav>
          <Form
            className="d-flex text-left"
            onSubmit={(event) => {
              event.preventDefault();
              navigate("search");
            }}
          >
            <FormControl
              type="text"
              placeholder="Search"
              value={queryValue}
              className="me-2"
              onChange={(event) => {
                setQueryValue(event.target.value);
              }}
            />
            <Button
              as={SearchLink}
              to="search"
              variant="outline-success"
              type="submit"
            >
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
