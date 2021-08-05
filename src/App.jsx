/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';

import axios from 'axios';

import './App.css';
/* eslint-disable no-param-reassign */
const isInDict = (dict, key, val) => {
    if (key in dict) {
        const temp = parseFloat(dict[key]) + parseFloat(val);
        dict[key] = temp.toFixed(2);
        return;
    }
    dict[key] = val;
};
/* eslint-enable no-param-reassign */
function App() {
    const [totalAmount, setTotalAmount] = useState(0);
    const [department, setDepartment] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('https://data.colorado.gov/resource/rifs-n6ib.json?fiscal_year=2020&$limit=100000').then((result) => {
            const departments = {};
            let newAmount = 0;
            result.data.forEach((element) => {
                newAmount += parseFloat(element.amount);
                isInDict(departments, element.department, parseFloat(element.amount));
            });
            setTotalAmount(newAmount);
            setDepartment(departments);
            setIsLoading(false);
        }).catch((error) => console.log(error));
    }, []);

    if (isLoading) { return <h1>Loading!!!</h1>; }
    const list = [];
    Object.keys(department).forEach((item) => {
        list.push(<li> {item}: {department[item]} </li>);
    });

    return (
        <div className='App'>
            <ul>
                <li>Total Amount: {totalAmount}</li>
                {list}
            </ul>
        </div>
    );
}

export default App;
