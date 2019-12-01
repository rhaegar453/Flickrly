import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{ name: 'Shivaraj', value: 200 }, { name: 'Sachin', value: 300 }, { name: 'Sheela', value: 220 }, { name: 'Shankar', value: 400 }]
        }
    }
    render() {
        return (
            <div>
                <BarChart
                    width={400}
                    height={300}
                    data={this.props.data.map(item=>{
                        if(item){
                            return{name:item.name, Photos:parseInt(item.total)}
                        }
                    })}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name"  />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Photos" fill="#82ca9d" />
                </BarChart>
            </div>
        );
    }
}

