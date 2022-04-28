import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

import Year from '../../components/Year/Year';
import Selection from '../../components/Selection/Selection';
import SubSelection from '../../components/SubSelection/SubSelection';
import LoadData, {
    SetSelection, SetSubItem, SetYear, SetLoading,
} from '../../store/actions/data';

import './SidePanel.css';

const SidePanel = ({ show, setShow }) => {
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
     * The current year the user is looking at
     * @constant
     * @type {string}
     * @default '2020'
     */
    const currentYear = useSelector((state) => state.data.year);

    /**
     * The list of years the user can look at
     * @constant
     * @type {list}
     */
    const yearList = useSelector((state) => state.data.yearList);

    /**
     * The dispatch function to update the store
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
                            <Year
                                year={currentYear}
                                yearList={yearList}
                                changeYear={(y) => {
                                    dispatch(SetLoading());
                                    dispatch(SetYear(y));
                                    dispatch(LoadData());
                                }}
                            />
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

SidePanel.propTypes = {
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired,
};

export default SidePanel;
