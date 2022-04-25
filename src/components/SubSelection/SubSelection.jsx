import React from 'react';
import PropTypes from 'prop-types';

import ListGroup from 'react-bootstrap/ListGroup';

import './SubSelection.css';

const SidePanel = (props) => {
    const { totals, subItem, dispatch } = props;

    /**
     * The sub items the chart can display
     * @constant
     * @type {list}
     */
    const subItemList = [];
    Object.keys(totals).forEach((key) => {
        subItemList.push(
            <ListGroup.Item
                key={key}
                action
                active={subItem === key}
                onClick={() => dispatch(key)}
            >
                {key}
            </ListGroup.Item>,
        );
    });

    return (
        <ListGroup className='List'>{subItemList}</ListGroup>
    );
};

SidePanel.propTypes = {
    totals: PropTypes.objectOf(PropTypes.number).isRequired,
    subItem: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
};

export default SidePanel;
