import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

import ChartBox from '../../components/ChartBox/ChartBox';
import SidePanel from '../SidePanel/SidePanel';
import Title from '../../components/Title/Title';

import LoadData, { SetYearList } from '../../store/actions/data';

import './Dashboard.css';

/**
 * Renders the main dashboard
 * @component
 * @requires react
 * @returns {JSX}
 */
const Dashboard = () => {
    /**
     * The current year being viewed
     * @constant
     * @type {{Object {name: string, amount: float}}}
     */
    const year = useSelector((state) => state.data.year);
    /**
     * The current data set being viewed
     * @constant
     * @type {{Object {name: string, amount: float}}}
     */
    const dataSet = useSelector((state) => state.data.workingDataSet);
    /**
     * The specific cabinet, department, fund category or fund the user is looking at
     * @constant
     * @type {string}
     */
    const subItem = useSelector((state) => state.data.subItem);
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

    // Initial Data load
    useEffect(() => {
        dispatch(LoadData());
        dispatch(SetYearList());
    }, []);

    if (isLoading) { return <h1>Loading!!!</h1>; }

    /**
     * The data the chart is displaying
     * @constant
     * @type {list}
     */
    const chartData = [];
    for (let index = 0; index < 12; index++) {
        // Pads 0 if less than 10, ex. 01, 02, 03
        const day = index < 9 ? `0${index + 1}` : index + 1;
        if (subItem === '') {
            chartData.push({
                value: dataSet[index + 1].total,
                date: `2020-${day}-01`,
            });
        } else {
            chartData.push({
                value: dataSet[index + 1][subItem],
                date: `2020-${day}-01`,
            });
        }
    }

    return (
        <Container fluid className='Main'>
            <Col xs='1'>
                <SidePanel />
            </Col>
            <Col xs='auto' className='LineChart'>
                <Title year={year} />
                <ChartBox data={{ name: year, items: chartData }} />
            </Col>
        </Container>
    );
};

export default Dashboard;
