import React, { Component } from 'react';
import GenderDonut from './GenderDonut';
import NationalityBar from './NationalityBar';
import AgeBar from './AgeBar';
import { Container, Row, Col, Table } from 'react-bootstrap';

class Books extends Component {
    constructor(props) {
        super(props);

        this.state = {
            books: []
        };
    }

    componentDidMount() {
        fetch('https://calm-basin-99109.herokuapp.com/books')
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    books: data
                })
            })
            .catch(console.log)
    }

    render() {
        return (
            <Container className="books">
                {/* <h1>Books Page</h1> */}
                <Row>
                    <Col><GenderDonut /></Col>
                    <Col><NationalityBar /></Col>
                    <Col><AgeBar /></Col>
                </Row>
                <br />
                <Row>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Book</th>
                                <th>Author</th>
                                <th>Year</th>
                            </tr>
                        </thead>

                        <tbody>
                        {this.state.books.map((book, i) =>
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{book.title}</td>
                                <td>{book.authorName}</td>
                                <td>{book.year}</td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Row>

                
            </Container>
        )
    }
}

export default Books;