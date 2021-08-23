import React from 'react';

import testData from './testData.json';

import LineChart from '../../components/LineChart/LineChart';

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
    // const departmentList = useSelector((state) => state.data.departmentList);
    // const weekList = useSelector((state) => state.data.weekList);
    /**
     * If the app is loading or not
     * @constant
     * @type {bool}
     */
    // const isLoading = useSelector((state) => state.data.isLoading);
    /**
     * The dispatch
     * @constant
     * @type {function}
     */
    // const dispatch = useDispatch();

    // useEffect(() => { dispatch(LoadData()); }, []);

    // if (isLoading) { return <h1>Loading!!!</h1>; }

    const dimensions = {
        width: 600,
        height: 300,
        margin: {
            top: 30, right: 30, bottom: 30, left: 60,
        },
    };

    const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    return (
        <LineChart data={{ name: 'test', color, items: testData }} dimensions={dimensions} />
    );
};

export default Dashboard;
