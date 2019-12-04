import React from 'react';

import './RecommendationItem.css';
import PropTypes from 'prop-types';


const defaultImageStrategy=(e)=>{
    e.target.src='https://cdn.ndtv.com/tech/images/flickr_app_logo_itunes_small.jpg';
}

const RecommendationItem = ({ text, icon, onClick }) => {
    return (
        <div className="recommendationBox" onClick={onClick}  style={{zIndex:10000}}>
            <img src={icon} onError={defaultImageStrategy} className="iconimage"></img>
            <div className="text-block">{text}</div>
        </div>
    );
}

RecommendationItem.propTypes={
    text:PropTypes.string.isRequired, 
    icon:PropTypes.string.isRequired,
    onClick:PropTypes.func.isRequired
}

export default RecommendationItem;