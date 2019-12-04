import React from 'react';
import PieChart from '../Components/PieChart';
import faker from 'faker';
import _ from 'lodash';

let data=_.times(5, (i)=>{
    return {
        key:faker.name.firstName(),
        data:faker.random.number()
    }
})

export default {title:"Pie Chart Component"};


export const with5Pies=()=>{
    return <PieChart data={data}/>
}