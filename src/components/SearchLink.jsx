import React from 'react';
import { useLocation, NavLink } from 'react-router-dom'

export default function SearchLink({to, ...props}){
    let location = useLocation();
    return (
        <NavLink to={ to + location.search } {...props} />
    )
}