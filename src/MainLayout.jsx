import React from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "./components/navbar";
import { Container } from "react-bootstrap";

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
    </Container>
  );
}
