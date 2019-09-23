import React, { Component } from 'react';
import { HorizontalBar } from 'react-chartjs-2';

class AgeBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                labels: ["18-24", "25-34", "35-49", "50-64", "65+"],
                datasets: [
                    {
                        label: 'Age',
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: [0, 0, 0, 0, 0]
                    }
                ]
            }
        }
    }

    componentDidMount() {
        fetch('https://calm-basin-99109.herokuapp.com/books')
            .then(res => res.json())
            .then((b) => {
                var datasetsCopy = this.state.data.datasets.slice(0);
                var labelsCopy = this.state.data.labels.slice(0);

                for (var i = 0; i < b.length; i++) {
                    if ((b[i].year - b[i].authorBirthYear) >= 18 && (b[i].year - b[i].authorBirthYear) <= 24) {
                        datasetsCopy[0].data[0] = datasetsCopy[0].data[0] + 1;
                    } else if ((b[i].year - b[i].authorBirthYear) >= 25 && (b[i].year - b[i].authorBirthYear) <= 34) {
                        datasetsCopy[0].data[1] = datasetsCopy[0].data[1] + 1;
                    } else if ((b[i].year - b[i].authorBirthYear) >= 35 && (b[i].year - b[i].authorBirthYear) <= 49) {
                        datasetsCopy[0].data[2] = datasetsCopy[0].data[2] + 1;
                    } else if ((b[i].year - b[i].authorBirthYear) >= 50 && (b[i].year - b[i].authorBirthYear) <= 64) {
                        datasetsCopy[0].data[3] = datasetsCopy[0].data[3] + 1;
                    } else if ((b[i].year - b[i].authorBirthYear) >= 65) {
                        datasetsCopy[0].data[4] = datasetsCopy[0].data[4] + 1;
                    }
                }

                this.setState({
                    data: {
                        labels: labelsCopy,
                        datasets: datasetsCopy
                    } 
                });
            })
            .catch(console.log)
    }

    render() {
        return (
            <div>
                <h3>Author Age</h3>
                <HorizontalBar
                    data={this.state.data}
                    options={{
                        scales: {
                            xAxes: [{
                                ticks: {
                                    precision: 0,
                                    beginAtZero: true
                                }
                            }]
                        }
                    }} />
            </div>
        )
    }
}

export default AgeBar;