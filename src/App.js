import React from 'react';
import ChartWrapper from './ChartWrapper'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'

function App() {
  return (
    <div className="">
      <header className="App-header">
      <Navbar bg="light">
        <Navbar.Brand>Barchartly</Navbar.Brand>
      </Navbar>
      <ChartWrapper />
      </header>
    </div>
  );
}

export default App;
