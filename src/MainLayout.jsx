import React from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "./components/navbar";
import WeatherWidget from "./components/WeatherWidget";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";

export default function MainLayout({
  categories,
  setQueryValue,
  queryValue,
  user,
  signOut,
}) {
  return (
    <Container className="p-0" fluid>
      <NavigationBar
        setQueryValue={setQueryValue}
        queryValue={queryValue}
        categories={categories}
      />
      <Container className="p-16" fluid>
        <Outlet />
      </Container>
      <Footer user={user} signOut={signOut} />
    </Container>
  );
}
