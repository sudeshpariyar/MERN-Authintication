import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <Container className="my-4">
        <Outlet />
      </Container>
    </>
  );
};

export default App;
