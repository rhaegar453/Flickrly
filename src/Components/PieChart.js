import React from 'react';
import {PieChart, PieArcSeries} from 'reaviz';


const PieGraph = ({ data }) => {
    return (
        <PieChart data={data} width={300} height={300} >
        </PieChart>
    );
}

export default PieGraph;