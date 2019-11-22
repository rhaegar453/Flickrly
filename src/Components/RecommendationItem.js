import React from 'react';
import '../App.css';
import './SearchBox.css';


const RecommendationItem = ({ text, icon }) => {
    return (
        <div className="recommendationBox" >
            <img src={icon} className="iconimage"></img>
            <div className="text-block">{text}</div>
        </div>
    );
}

export default RecommendationItem;