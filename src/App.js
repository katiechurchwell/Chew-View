import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Movie from "./components/Movie";
import Restaurant from "./components/Restaurant";
import ZipcodeForm from "./components/ZipcodeForm";
import { React, useState } from "react";

function App() {
  const [zipcode, setZipcode] = useState();

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Hero />
        </Row>
        <Row>
          <Col>{/* <Movie /> */}</Col>
          <Col>
            <Restaurant />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
