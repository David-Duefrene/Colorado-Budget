import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Stack from 'react-bootstrap/Stack';
import Dropdown from 'react-bootstrap/Dropdown';
import ListGroup from 'react-bootstrap/ListGroup';

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
                action
                active={subItem === key}
                onClick={() => dispatch(SetSubItem(key))}
            >
                {key}
            </ListGroup.Item>,
        );
    });

    return (
        <div className={CSS.Main}>
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
            <LineChart data={{ name: 'test', color, items: chartData }} dimensions={dimensions} />
        </div>
    );
};

export default Dashboard;
