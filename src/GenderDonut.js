import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import './graph.css';

class GenderDonut extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                labels: [
                    'Male',
                    'Female'

                ],
                datasets: [{
                    data: [0, 0],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ]
                }]
            }
        }
    }

    componentDidMount() {
        fetch('https://calm-basin-99109.herokuapp.com/books')
            .then(res => res.json())
            .then((b) => {
                var datasetsCopy = this.state.data.datasets.slice(0);
                var dataCopy = datasetsCopy[0].data.slice(0);

                for (var i = 0; i < b.length; i++) {
                    if (b[i].authorGender === "Male") {
                        dataCopy[0] = dataCopy[0] + 1;
                    } else {
                        dataCopy[1] = dataCopy[1] + 1;
                    }
                }

                datasetsCopy[0].data = dataCopy;

                this.setState({
                    data: Object.assign({}, this.state.data, {
                        datasets: datasetsCopy
                    })
                });
            })
            .catch(console.log)
    }

    render() {
        return (
            <div>
                <h3>Author Gender</h3>
                <Doughnut data={this.state.data} />
            </div>
        )
    }
}

export default GenderDonut;