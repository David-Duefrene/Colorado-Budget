import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from 'react-bootstrap/Dropdown';

import '../Dropdown.css';

const Selection = (props) => {
    const { year, yearList, changeYear } = props;

    const itemList = yearList.map((y) => (
        <Dropdown.Item
            className='dropdown-item'
            onClick={() => changeYear(y)}
            key={`year-${y}`}
        >
            {y}
        </Dropdown.Item>
    ));

    return (
        <Dropdown>
            <Dropdown.Toggle className='dropdown-trigger' id='dropdown-basic'>
                {year}
            </Dropdown.Toggle>
            <Dropdown.Menu className='dropdown-background'>
                {itemList}
            </Dropdown.Menu>
        </Dropdown>
    );
};

Selection.propTypes = {
    year: PropTypes.string.isRequired,
    yearList: PropTypes.arrayOf(PropTypes.string).isRequired,
    changeYear: PropTypes.func.isRequired,
};

export default Selection;
