import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

import ThemeSwitch from '../../components/ThemeSwitch/ThemeSwitch';
import ChartBox from '../../components/ChartBox/ChartBox';
import SidePanel from '../../components/SidePanel/SidePanel';

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
     * The width of the chart
     * @constant
     * @type {state}
     */
    const [chartWidth, setChartWidth] = useState(window.innerWidth * 0.75);

    /**
     * The height of the chart
     * @constant
     * @type {state}
     */
    const [chartHeight, setChartHeight] = useState(window.innerHeight * 0.75);

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
    // Resize the chart on window resize
    useEffect(() => {
        const handleResize = () => {
            setChartWidth(window.innerWidth * 0.75);
            setChartHeight(window.innerHeight * 0.75);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });

    if (isLoading) { return <h1>Loading!!!</h1>; }

    const dimensions = {
        width: chartWidth,
        height: chartHeight,
        margin: {
            top: 60, right: 200, bottom: 10, left: 100,
        },
    };

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
            <Col>
                <SidePanel />
            </Col>
            <Col md='auto' className='LineChart'>
                <ThemeSwitch />
                <ChartBox data={{ name: year, items: chartData }} dimensions={dimensions} />
            </Col>
        </Container>
    );
};

export default Dashboard;
