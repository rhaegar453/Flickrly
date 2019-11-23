import React from 'react';
import '../App.css';
import './SearchBox.css';

const defaultImageStrategy=(e)=>{
    e.target.src='https://cdn.ndtv.com/tech/images/flickr_app_logo_itunes_small.jpg';
}

const RecommendationItem = ({ text, icon, onClick }) => {
    return (
        <div className="recommendationBox" onClick={onClick} >
            <img src={icon} onError={defaultImageStrategy} className="iconimage"></img>
            <div className="text-block">{text}</div>
        </div>
    );
}

export default RecommendationItem;