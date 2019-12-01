import React, {useState, useEffect} from 'react';
import RecommendationItem from '../Components/RecommendationItem';


const iconUrl="https://www.freeiconspng.com/uploads/flat-blue-home-icon-4.png";

export default {title:"PhotoItem"};



const cardClick=()=>{
    console.log("Card has been clicked");
}

export const withoutIcon=()=>{
    return <RecommendationItem text="Hello World" icon="" onClick={cardClick}></RecommendationItem>
}

export const withFunction=()=>{
    return <RecommendationItem text="Hi this is Shivaraj Bakale" icon={iconUrl} onClick={cardClick}></RecommendationItem>
}