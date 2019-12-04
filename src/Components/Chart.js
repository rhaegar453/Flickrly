import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import PropTypes from 'prop-types';

const Chart = ({data}) => {
    let final=data.map(item=>({name:item.name, value:item.total}));
    return (
        <div>
            <BarChart
                width={400}
                height={300}
                data={final.map(item => {
                    if (item) {
                        return { name: item.name, Photos: parseInt(item.value) }
                    }
                })}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Photos" fill="#82ca9d" />
            </BarChart>
        </div>
    );
}

Chart.propType={
    data:PropTypes.arrayOf(PropTypes.shape({
        name:PropTypes.string, 
        total:PropTypes.number
    })).isRequired
}


export default Chart;
