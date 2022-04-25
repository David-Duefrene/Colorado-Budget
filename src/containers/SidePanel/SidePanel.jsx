import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

import Year from '../../components/Year/Year';
import Selection from '../../components/Selection/Selection';
import SubSelection from '../../components/SubSelection/SubSelection';
import { SetSelection, SetSubItem } from '../../store/actions/data';

import './SidePanel.css';

const SidePanel = () => {
    /**
     * If the side panel is open or not
     * @constant
     * @type {state}
     */
    const [show, setShow] = useState(false);
    /**
     * The type of data the user is looking at ex. cabinet, department, fund category or fund
     * @constant
     * @type {string}
     */
    const selection = useSelector((state) => state.data.selection);

    /**
     * The type of sub data the user is looking at ex. the individual cabinet, department,
     * fund category or fund
     * @constant
     * @type {string}
     */
    const subItem = useSelector((state) => state.data.subItem);

    /**
     * The totals of the selection the user is looking at
     * @constant
     * @type {string}
     */
    const totals = useSelector((state) => state.data.totals);

    /**
     * The dispatch
     * @constant
     * @type {function}
     */
    const dispatch = useDispatch();

    /**
     * Dispatches the data selection the user wants to view
     * @constant
     * @type {function}
     * @param {string} selection - The type of data the user is looking at ex. cabinet, department,
     *      fund_category or fund
     * @returns {void}
     */
    const dispatchSelection = (s) => dispatch(SetSelection(s));
    /**
     * Dispatches the data Sub selection the user wants to view
     * @constant
     * @type {function}
     * @param {string} selection - The type of data the user is looking at ex. cabinet, department,
     *      fund_category or fund
     * @returns {void}
     */
    const dispatchSubSelection = (key) => dispatch(SetSubItem(key));

    return (
        <div className='SidePanel d-grid gap-2'>
            <Button
                onClick={() => setShow(!show)}
                aria-controls='SidePanelID'
            >
                {show ? '<' : '>'}
            </Button>
            <Collapse in={show} dimension='width'>
                <div>
                    <div id='SidePanelID'>
                        <Stack gap={1} className='Stack'>
                            <Year />
                            <Selection
                                selection={selection}
                                dispatchSelection={dispatchSelection}
                            />
                            <SubSelection
                                totals={totals}
                                subItem={subItem}
                                dispatch={dispatchSubSelection}
                            />
                        </Stack>
                    </div>
                </div>
            </Collapse>
        </div>
    );
};

export default SidePanel;
