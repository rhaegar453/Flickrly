import React from 'react';
import Chart from '../Components/Chart';

let data5 = [{ name: 'Shivaraj', value: 200 }, { name: 'Sachin', value: 300 }, { name: 'Sheela', value: 220 }, { name: 'Shankar', value: 400 }]
let data10 = [{ name: 'Shivaraj', value: 200 }, { name: 'Sachin', value: 300 }, { name: 'Sheela', value: 220 }, { name: 'Shankar', value: 400 }, { name: 'Shivaraj', value: 200 }, { name: 'Sachin', value: 300 }, { name: 'Sheela', value: 220 }, { name: 'Shankar', value: 400 }]

export default { title: "Chart Component" }


export const with5Values = () => <Chart data={data5}></Chart>
export const with10Values = () => <Chart data={data10} />