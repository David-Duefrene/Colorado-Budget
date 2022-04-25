import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from 'react-bootstrap/Dropdown';

/**
 * A dropdown menu for selecting what dataset to view
 * @component
 * @requires react
 * @requires react-bootstrap
 * @returns {JSX}
 */
const Selection = (props) => {
    /**
     * The type of data the user is looking at ex. cabinet, department, fund category or fund
     * @constant
     * @type {string}
     */
    const { selection, dispatchSelection } = props;

    return (
        <Dropdown>
            <Dropdown.Toggle id='dropdown-basic'>
                {selection}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => dispatchSelection('department')}>
                    Department
                </Dropdown.Item>
                <Dropdown.Item onClick={() => dispatchSelection('cabinet')}>
                    Cabinet
                </Dropdown.Item>
                <Dropdown.Item onClick={() => dispatchSelection('fund_category')}>
                    Fund Category
                </Dropdown.Item>
                <Dropdown.Item onClick={() => dispatchSelection('fund')}>
                    Fund
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

Selection.propTypes = {
    selection: PropTypes.string.isRequired,
    dispatchSelection: PropTypes.func.isRequired,
};

export default Selection;
