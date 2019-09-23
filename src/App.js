import React, { Component } from 'react';
import './App.css';
import SubmissionForm from './SubmissionForm';
import CurrentBook from './CurrentBook';
import { Container, Row, Col } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <Container className="App">
        <Row>
          <Col><SubmissionForm /></Col>
          <Col><CurrentBook /></Col>
          <Col>
            <h3>What is this?</h3>
            A web app for a book club; a database with some simple data visualizations for Cole, Dylan, Grant, and Jason to look back at the books they've read and think about books to come.
          </Col>
        </Row>
      </Container>
    )
  }

}

export default App;