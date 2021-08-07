/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import LoadData from './store/actions/data';
import './App.css';

function App() {
    const fiscalYear = useSelector((state) => state.data.fiscalYear);
    const totalAmount = useSelector((state) => state.data.totalAmount);
    const departmentList = useSelector((state) => state.data.departmentList);
    const isLoading = useSelector((state) => state.data.isLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(LoadData(fiscalYear));
    }, []);

    if (isLoading) { return <h1>Loading!!!</h1>; }
    const list = [];
    Object.keys(departmentList).forEach((item) => {
        list.push(<li> {item}: {departmentList[item]} </li>);
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
