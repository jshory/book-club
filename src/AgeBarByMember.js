import React, { Component } from 'react';
import { HorizontalBar } from 'react-chartjs-2';

class AgeBarByMember extends Component {
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

    UNSAFE_componentWillReceiveProps(nextProps) {
        fetch('https://calm-basin-99109.herokuapp.com/books')
            .then(res => res.json())
            .then((b) => {
                var datasetsCopy = this.state.data.datasets.slice(0);
                var dataCopy = datasetsCopy[0].data.slice(0);

                var count = datasetsCopy[0].data.length;

                //reset : loop over all labels, delete data for each label
                for (var n = 0; n < count; n++) {
                    dataCopy[n] = 0;
                }

                for (var i = 0; i < b.length; i++) {
                    if (b[i].memberName === nextProps.member) {
                        if ((b[i].year - b[i].authorBirthYear) >= 18 && (b[i].year - b[i].authorBirthYear) <= 24) {
                            dataCopy[0] = dataCopy[0] + 1;
                        } else if ((b[i].year - b[i].authorBirthYear) >= 25 && (b[i].year - b[i].authorBirthYear) <= 34) {
                            dataCopy[1] = dataCopy[1] + 1;
                        } else if ((b[i].year - b[i].authorBirthYear) >= 35 && (b[i].year - b[i].authorBirthYear) <= 49) {
                            dataCopy[2] = dataCopy[2] + 1;
                        } else if ((b[i].year - b[i].authorBirthYear) >= 50 && (b[i].year - b[i].authorBirthYear) <= 64) {
                            dataCopy[3] = dataCopy[3] + 1;
                        } else if ((b[i].year - b[i].authorBirthYear) >= 65) {
                            dataCopy[4] = dataCopy[4] + 1;
                        }
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

export default AgeBarByMember;