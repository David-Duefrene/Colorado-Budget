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
    const year = useSelector((state) => state.data.year);

    /**
     * List of years to be displayed in the dropdown
     * @constant
     * @type {Array of Strings}
     */
    const yearList = useSelector((state) => state.data.yearList);

    /**
     * The dispatch
     * @constant
     * @type {function}
     */
    const dispatch = useDispatch();

    const itemList = yearList.map((y) => (
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
            <Dropdown.Toggle id='dropdown-basic'>
                {year}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {itemList}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default Selection;
