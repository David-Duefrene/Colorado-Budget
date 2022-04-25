import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Dropdown from 'react-bootstrap/Dropdown';

import { SetSelection } from '../../store/actions/data';

const Selection = () => {
    /**
     * The type of data the user is looking at ex. cabinet, department, fund category or fund
     * @constant
     * @type {string}
     */
    const selection = useSelector((state) => state.data.selection);

    /**
     * The dispatch
     * @constant
     * @type {function}
     */
    const dispatch = useDispatch();

    return (
        <Dropdown>
            <Dropdown.Toggle id='dropdown-basic'>
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
    );
};

export default Selection;
