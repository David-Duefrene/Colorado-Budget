import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import LineChart from '../../components/LineChart/LineChart';
import LoadData from '../../store/actions/data';

/**
 * Renders the main dashboard
 * @component
 * @requires react
 * @returns {JSX}
 */
const Dashboard = () => {
    /**
     * The total amount the Colorado state has spent
     * @constant
     * @type {float}
     */
    // const totalAmount = useSelector((state) => state.data.totalAmount);
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
        width: 600,
        height: 300,
        margin: {
            top: 30, right: 30, bottom: 30, left: 60,
        },
    };

    const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    const display = [];

    for (let index = 0; index < 12; index++) {
        display.push({
            value: departmentList[index + 1]['Adams State University (GYAA)'],
            date: `2020-${index + 1}-01`,
        });
    }

    return (
        <LineChart data={{ name: 'test', color, items: display }} dimensions={dimensions} />
    );
};

export default Dashboard;
