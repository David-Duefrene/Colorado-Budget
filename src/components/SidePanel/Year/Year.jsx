import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Dropdown from 'react-bootstrap/Dropdown';

import LoadData, { SetYear, SetLoading } from '../../../store/actions/data';

const Selection = () => {
    /**
     * The current year being viewed
     * @constant
     * @type {{Object {name: string, amount: float}}}
     */
    const year = useSelector((state) => state.data.fiscalYear);
    /**
     * The dispatch
     * @constant
     * @type {function}
     */
    const dispatch = useDispatch();

    const years = ['2017', '2018', '2019', '2020', '2021'];
    const yearList = years.map((y) => (
        <Dropdown.Item
            onClick={() => {
                dispatch(SetYear(y));
                dispatch(SetLoading());
                dispatch(LoadData());
            }}
            key={`year-${y}`}
        >
            {y}

        </Dropdown.Item>
    ));

    return (
        <Dropdown>
            <Dropdown.Toggle variant='dark' id='dropdown-basic'>
                {year}
            </Dropdown.Toggle>
            <Dropdown.Menu variant='dark'>
                {yearList}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default Selection;
