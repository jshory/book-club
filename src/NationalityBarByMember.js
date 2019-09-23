import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class NationalityBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'Nationality',
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: []
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
                var labelsCopy = []; //= this.state.data.labels.slice(0);

                var count = datasetsCopy[0].data.length;

                //reset : loop over all labels, delete data for each label
                for (var n = 0; n < count; n++) {
                    datasetsCopy[0].data.pop();
                }

                for (var i = 0; i < b.length; i++) {
                    if (b[i].memberName === nextProps.member) {
                        if (labelsCopy.length > 0) {
                            var foundLabel = false;
                            for (var j = 0; j < labelsCopy.length && !foundLabel; j++) {
                                if (labelsCopy[j] === b[i].authorNationality) {
                                    datasetsCopy[0].data[j] = datasetsCopy[0].data[j] + 1;
                                    foundLabel = true;
                                }
                            }
                            if (!foundLabel) {
                                labelsCopy.push(b[i].authorNationality);
                                datasetsCopy[0].data.push(1);
                            }
                        } else {
                            labelsCopy.push(b[i].authorNationality);
                            datasetsCopy[0].data.push(1);
                        }
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
                <h3>Author Nationality</h3>
                <Bar
                    data={this.state.data}
                    width={100}
                    height={50}
                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    precision: 0,
                                    beginAtZero: true
                                }
                            }]
                        }
                    }}
                />
            </div>
        )
    }
}

export default NationalityBar;