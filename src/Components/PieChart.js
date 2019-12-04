import React from 'react';
import {PieChart, PieArcSeries} from 'reaviz';
import PropTypes from 'prop-types';

const PieGraph = ({ data }) => {
    return (
        <PieChart data={data} width={300} height={300} >
        </PieChart>
    );
}

PieGraph.propTypes={
    data:PropTypes.array.isRequired
}

export default PieGraph;