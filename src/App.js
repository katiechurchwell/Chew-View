import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Movie from "./components/Movie";
import Restaurant from "./components/Restaurant";
import ZipcodeForm from "./components/ZipcodeForm";
import React from 'react'

function App() {
  return (
    <>
      <Header />
      <Hero />
      <ZipcodeForm />
      <Container>
        <Row>
          <Col>
            <Movie />
          </Col>
          <Col>
            <Restaurant />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
