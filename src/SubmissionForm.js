import React, { Component } from 'react';
import countryList from 'react-select-country-list';
import { Container, Button, Form } from 'react-bootstrap';
import './index.css';

class SubmissionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            publicationYear: "",
            genre: "",
            author: "",
            authorBirthYear: "",
            authorGender: "Male",
            authorNationality: "",
            member: "Cole",
            message: ""
        };

        this.countryList = countryList().getLabels();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        fetch('https://calm-basin-99109.herokuapp.com/books', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "title": this.state.title,
                "year": this.state.publicationYear,
                "genre": this.state.genre,
                "authorName": this.state.author,
                "authorBirthYear": this.state.authorBirthYear,
                "authorNationality": this.state.authorNationality,
                "authorGender": this.state.authorGender,
                "memberName": this.state.member
            })
        })
            // .then(res => res.json())
            .then(response => 
                // console.log(response)
                this.setState({
                    message: "Successfully added!"
                })
            ).catch(err =>
                // console.log("Error: " + error)
                this.setState({
                    message: "Error: " + err
                })
            );

        this.setState({
            title: "",
            publicationYear: "",
            genre: "",
            author: "",
            authorBirthYear: "",
            authorGender: "",
            authorNationality: "",
            member: "",
            // message: "good job"
        })
    }

    render() {
        return (
            <Container className="form">
                <h3>Time for the Next Read?</h3>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Label>
                        Book Title:
                    <Form.Control as="textarea" rows="1" name="title" value={this.state.title} onChange={this.handleChange} required />
                    </Form.Label>
                    <br />

                    <Form.Label>
                        Publication Year:
                    <Form.Control as="textarea" rows="1" name="publicationYear" placeholder="YYYY" value={this.state.publicationYear} onChange={this.handleChange} required />
                    </Form.Label>
                    <br />

                    <Form.Label>
                        Genre:
                    <Form.Control as="textarea" rows="1" name="genre" value={this.state.genre} onChange={this.handleChange} required />
                    </Form.Label>
                    <br />
                    <hr />

                    <Form.Label>
                        Author:
                    <Form.Control as="textarea" rows="1" name="author" value={this.state.author} onChange={this.handleChange} required />
                    </Form.Label>
                    <br />

                    <Form.Label>
                        Author Birth Year:
                    <Form.Control as="textarea" rows="1" name="authorBirthYear" placeholder="YYYY" value={this.state.authorBirthYear} onChange={this.handleChange} required />
                    </Form.Label>
                    <br />

                    <Form.Label>
                        Author Nationality:
                    <Form.Control as="select" name="authorNationality" value={this.state.authorNationality} onChange={this.handleChange}>
                            {this.countryList.map((country, i) =>
                                <option key={i} value={country}>{country}</option>
                            )};
                    </Form.Control>
                    </Form.Label>
                    <br />

                    <Form.Label>
                        Author Gender:
                        
                    <div className="form-inline">
                            <Form.Check className="ml-1" type="radio"
                                name="authorGender"
                                value="Male"
                                checked={this.state.authorGender === "Male"}
                                onChange={this.handleChange} />Male
    
                            <Form.Check className="ml-1" type="radio"
                                name="authorGender"
                                value="Female"
                                checked={this.state.authorGender === "Female"}
                                onChange={this.handleChange} />Female
                    </div>

                    <div className="form-inline">
                            <Form.Check className="ml-1" type="radio"
                                name="authorGender"
                                value=""
                                checked={this.state.authorGender !== "Male" && this.state.authorGender !== "Female"}
                                onChange={this.handleChange} /><Form.Control as="textarea" rows="1" name="authorGender" value={this.state.authorGender === "Male" || this.state.authorGender === "Female" ? "" : this.state.authorGender} onChange={this.handleChange} />
                            
                    </div>
                    </Form.Label>
                    <hr />

                    <Form.Label>
                        Member:
                    <Form.Control as="select" value={this.state.member} name="member" onChange={this.handleChange}>
                            <option value="Cole">Cole</option>
                            <option value="Dylan">Dylan</option>
                            <option value="Grant">Grant</option>
                            <option value="Jason">Jason</option>
                        </Form.Control>
                    </Form.Label>
                    <br />

                    <Button variant="primary" type="submit">Submit</Button>
                    <Form.Label className="message">{this.state.message}</Form.Label>
                </Form>
            </Container>
        )
    }
}

export default SubmissionForm;