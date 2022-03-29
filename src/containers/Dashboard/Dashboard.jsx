/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Stack from 'react-bootstrap/Stack';
import Dropdown from 'react-bootstrap/Dropdown';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

import LineChart from '../../components/LineChart/LineChart';
import LoadData, { SetSubItem, SetSelection } from '../../store/actions/data';
import CSS from './Dashboard.module.css';

/**
 * Renders the main dashboard
 * @component
 * @requires react
 * @returns {JSX}
 */
const Dashboard = () => {
    /**
     * The current data set being viewed
     * @constant
     * @type {{Object {name: string, amount: float}}}
     */
    const dataSet = useSelector((state) => state.data.workingDataSet);
    /**
     * The total amount for the data set being viewed
     * @constant
     * @type {float}
     */
    const totals = useSelector((state) => state.data.totals);
    /**
     * The specific cabinet, department, fund category or fund the user is looking at
     * @constant
     * @type {string}
     */
    const subItem = useSelector((state) => state.data.subItem);
    /**
     * The type of data the user is looking at ex. cabinet, department, fund category or fund
     * @constant
     * @type {string}
     */
    const selection = useSelector((state) => state.data.selection);
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
     * If the side panel is open or not
     * @constant
     * @type {state}
     */
    const [show, setShow] = useState(false);

    /**
     * Closes the side panel
     * @function
     * @returns {void}
     * @param {}
     * @const
     */
    const handleClose = () => setShow(false);
    /**
     * Opens the side panel
     * @function
     * @returns {void}
     * @param {}
     * @const
     */
    const handleShow = () => setShow(true);

    /**
     * The dispatch
     * @constant
     * @type {function}
     */
    const dispatch = useDispatch();

    useEffect(() => { dispatch(LoadData()); }, []);
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
        // Need to get height & width as viewport updates
        width: chartWidth,
        height: chartHeight,
        margin: {
            top: 60, right: 200, bottom: 10, left: 100,
        },
    };
    const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

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

    /**
     * The sub items the chart can display
     * @constant
     * @type {list}
     */
    const subItemList = [];
    Object.keys(totals).forEach((key) => {
        subItemList.push(
            <ListGroup.Item
                className={CSS.listItem}
                action
                active={subItem === key}
                onClick={() => dispatch(SetSubItem(key))}
            >
                {key}
            </ListGroup.Item>,
        );
    });

    /**
     * The side panel of options
     * @constant
     * @type {JSX}
     */
    const sidePanel = (
        <div className={`${CSS.SidePanel} ${show ? CSS.SidePanelOpen : null}`}>
            <Stack gap={1} className={CSS.Stack}>
                <Dropdown>
                    <Dropdown.Toggle variant='success' id='dropdown-basic'>
                        {selection}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => dispatch(SetSelection('department'))}>
                            Department
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => dispatch(SetSelection('cabinet'))}>
                            Cabinet
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => dispatch(SetSelection('fund_category'))}>
                            Fund Category
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => dispatch(SetSelection('fund'))}>
                            Fund
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <ListGroup className={CSS.List}>{subItemList}</ListGroup>
            </Stack>
        </div>
    );

    return (
        <Container fluid className={CSS.Main}>
            <Col className={show ? null : CSS.Closed}>
                <button variant='primary' onClick={show ? handleClose : handleShow}>
                    {show ? 'Close' : 'Show'}
                </button>
                {sidePanel}
            </Col>
            <Col md='auto' className={CSS.LineChart}>
                <LineChart data={{ name: 'test', color, items: chartData }} dimensions={dimensions} />
            </Col>
        </Container>
    );
};

export default Dashboard;
