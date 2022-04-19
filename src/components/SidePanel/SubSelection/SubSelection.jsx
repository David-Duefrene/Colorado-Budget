import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ListGroup from 'react-bootstrap/ListGroup';

import { SetSubItem } from '../../../store/actions/data';

import './SubSelection.css';

const SidePanel = () => {
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
     * The dispatch
     * @constant
     * @type {function}
     */
    const dispatch = useDispatch();
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
                onClick={() => dispatch(SetSubItem(key))}
            >
                {key}
            </ListGroup.Item>,
        );
    });

    return (
        <ListGroup className='List'>{subItemList}</ListGroup>
    );
};

export default SidePanel;
