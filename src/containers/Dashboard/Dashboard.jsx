import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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
    const totalAmount = useSelector((state) => state.data.totalAmount);
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
    /**
     * The list of items to display
     * @constant
     * @type {list}
     */
    const list = [];

    Object.keys(departmentList).forEach((item) => {
        list.push(<li>{`${item}: ${departmentList[item].toFixed(2)}`}</li>);
    });

    return (
        <ul>
            <li>{`Total Amount: ${totalAmount.toFixed(2)}`}</li>
            {list}
        </ul>
    );
};

export default Dashboard;
