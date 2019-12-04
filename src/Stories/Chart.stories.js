import React from 'react';
import Chart from '../Components/Chart';
import faker from 'faker';
import _ from 'lodash';

let data5=_.times(5, (i)=>{
    return {name:faker.name.firstName(), total:faker.random.number()}
})

let data10=_.times(10, (i)=>{
    return {name:faker.name.firstName(), total:faker.random.number()}
})

export default { title: "Chart Component" }


export const with5Values = () => <Chart data={data5}></Chart>
export const with10Values = () => <Chart data={data10} />