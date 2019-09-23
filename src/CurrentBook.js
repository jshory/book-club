import React, { Component } from 'react';

class CurrentBook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentBook: ""
        };
    }

    componentDidMount() {
        fetch('https://calm-basin-99109.herokuapp.com/books')
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                this.setState({
                    currentBook: data[data.length - 1]
                })
            })
            .catch(console.log)
    } 

    render() {
        return (
            <div className="currentBook">
                <h3>Current Book</h3>
                <span>{this.state.currentBook.title} - {this.state.currentBook.authorName} - {this.state.currentBook.year}</span>
                <br />
                <span>Picked by: {this.state.currentBook.memberName}</span>
            </div>
        )
    }
}

export default CurrentBook;