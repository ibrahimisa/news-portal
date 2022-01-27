import React from 'react'
import {Nav} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'

export default function Link({ name }){
    return (
      <Nav.Link
        as={NavLink}
        to={name.toLowerCase()}
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        {name}
      </Nav.Link>
    );
}