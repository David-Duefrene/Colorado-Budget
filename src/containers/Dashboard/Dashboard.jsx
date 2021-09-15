import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import LineChart from '../../components/LineChart/LineChart';
import LoadData from '../../store/actions/data';
import CSS from './Dashboard.module.css';

/**
 * Renders the main dashboard
 * @component
 * @requires react
 * @returns {JSX}
 */
const Dashboard = () => {
    /**
     * The total amount each department in the Colorado Gov has spent
     * @constant
     * @type {float}
     */
    const departmentTotals = useSelector((state) => state.data.departmentTotals);
    /**
     * The list of various Colorado state departments and the amount of money each has spent
     * @constant
     * @type {{Object {name: string, amount: float}}}
     */
    const departmentList = useSelector((state) => state.data.departmentList);
    /**
     * If the app is loading or not
     * @constant
     * @type {bool}
     */
    const isLoading = useSelector((state) => state.data.isLoading);
    /**
     * The dispatch
     * @constant
     * @type {function}
     */
    const dispatch = useDispatch();

    useEffect(() => { dispatch(LoadData()); }, []);

    if (isLoading) { return <h1>Loading!!!</h1>; }

    const dimensions = {
        width: 800,
        height: 400,
        margin: {
            top: 60, right: 200, bottom: 10, left: 100,
        },
    };
    const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    const display = [];
    for (let index = 0; index < 12; index++) {
        // Pads 0 if less than 10, ex. 01, 02, 03
        const day = index < 9 ? `0${index + 1}` : index + 1;
        display.push({
            value: departmentList[index + 1].total,
            date: `2020-${day}-01`,
        });
    }

    const dropdown = [];
    Object.keys(departmentTotals).forEach((key) => {
        dropdown.push(<li>{key}</li>);
    });

    return (
        <div className={CSS.Main}>
            <ul className={CSS.List}>{dropdown}</ul>
            <LineChart data={{ name: 'test', color, items: display }} dimensions={dimensions} />
        </div>
    );
};

export default Dashboard;
