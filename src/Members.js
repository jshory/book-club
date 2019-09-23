import React, { Component } from 'react';
import GenderDonutByMember from './GenderDonutByMember';
import NationalityBarByMember from './NationalityBarByMember';
import AgeBarByMember from './AgeBarByMember';
import { Container, Row, Col, Table } from 'react-bootstrap';
import './Members.css';

class Members extends Component {
    constructor(props) {
        super(props);

        this.state = {
            members: [],
            selectedMember: "Cole"
        };

        this.selectMember = this.selectMember.bind(this);
    }

    componentDidMount() {
        fetch('https://calm-basin-99109.herokuapp.com/members')
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    members: data
                })
            })
            .catch(console.log)
    }

    selectMember(e) {
        var member = e.currentTarget.textContent;
        member = member.replace("'s Books", "");
        this.setState({
            selectedMember: member
        })
    }

    render() {
        return (
            <Container className="members">
                {/* <h1>Members Page</h1> */}
                <Row>
                    <Col><GenderDonutByMember member={this.state.selectedMember} /></Col>
                    <Col><NationalityBarByMember member={this.state.selectedMember} /></Col>
                    <Col><AgeBarByMember member={this.state.selectedMember} /></Col>
                </Row>
                <br />

                <Row>
                    {this.state.members.map((member, i) =>
                    <Col>
                        <Table responsive="xl" key={i}>
                            <thead>
                                <tr>
                                    <th className={this.state.selectedMember === member.name ? 'selected-member' : ''}>#</th>
                                    <th onClick={this.selectMember} className={this.state.selectedMember === member.name ? 'selected-member' : ''}>{member.name}'s Books</th>
                                </tr>
                            </thead>
                            {member.bookList.map((book, j) =>
                                <tbody key={j}>
                                    <tr>
                                        <td className={this.state.selectedMember === member.name ? 'selected-member' : ''}>{j + 1}</td>
                                        <td className={this.state.selectedMember === member.name ? 'selected-member' : ''}>{book}</td>
                                    </tr>

                                </tbody>)}
                        </Table>
                        </Col>
                    )}
                </Row>
            </Container>
        )
    }
}

export default Members;