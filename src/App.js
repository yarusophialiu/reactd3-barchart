import React, { Component } from 'react';
import ChartWrapper from './ChartWrapper'
import { Row, Col, Container } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import GenderDropdown from './GenderDropdown'

class App extends Component {
  state = {
    gender: "men"
  }

  genderSelected = (gender) => this.setState({ gender })

  render() {
    return (
      <div>
        <header className="App-header">
          <Navbar bg="light">
            <Navbar.Brand>Barchartly</Navbar.Brand>
          </Navbar>
          <Container>
            <Row>
              <Col xs={12}><GenderDropdown genderSelected={this.genderSelected} /></Col>
            </Row>
            <Row>
              <Col xs={12}><ChartWrapper gender={this.state.gender} /></Col>
            </Row>
          </Container>
        </header>
      </div>
    )
  }
}

export default App;
