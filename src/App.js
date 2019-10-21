import React from 'react';
import ChartWrapper from './ChartWrapper'
import { Row, Col, Container } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'

function App() {
  return (
    <div className="">
      <header className="App-header">
      <Navbar bg="light">
        <Navbar.Brand>Barchartly</Navbar.Brand>
      </Navbar>
      <Container>
        <Row>
          <Col xs={12}></Col>
        </Row>
        <Row>
          <Col xs={12}><ChartWrapper /></Col>
        </Row>
      </Container>
      </header>
    </div>
  );
}

export default App;
