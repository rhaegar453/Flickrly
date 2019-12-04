import React from 'react';
import { PieChart, PieArcSeries } from 'reaviz';
import PropTypes from 'prop-types';


const PieGraph = ({ data }) => {
    data = data.map(({ key, data }, index) => {
        return { key: key + index, data }
    })
    return (
        <PieChart data={data} width={300} height={300} >
        </PieChart>
    );
}

PieGraph.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
        data: PropTypes.number
    })).isRequired
}



export default PieGraph;