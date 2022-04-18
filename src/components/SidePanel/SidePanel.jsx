/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Dropdown from 'react-bootstrap/Dropdown';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

import Selection from './Selection/Selection';
import SubSelection from './SubSelection/SubSelection';
import LoadData, { SetYear, SetLoading } from '../../store/actions/data';

import './SidePanel.css';

const SidePanel = () => {
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

    /**
     * If the side panel is open or not
     * @constant
     * @type {state}
     */
    const [show, setShow] = useState(false);

    const years = ['2017', '2018', '2019', '2020', '2021'];
    const yearList = years.map((y) => (
        <Dropdown.Item onClick={() => {
            dispatch(SetYear(y));
            dispatch(SetLoading());
            dispatch(LoadData());
        }}
        >
            {y}

        </Dropdown.Item>
    ));

    return (
        <div className='SidePanel d-grid gap-2'>
            <Button
                onClick={() => setShow(!show)}
                aria-controls='SidePanelID'
                bsPrefix='Button'
            >
                {show ? '<' : '>'}
            </Button>
            <Collapse in={show} dimension='width'>
                <div>
                    <div id='SidePanelID'>
                        <Stack gap={1} className='Stack'>
                            <Dropdown>
                                <Dropdown.Toggle variant='dark' id='dropdown-basic'>
                                    {year}
                                </Dropdown.Toggle>
                                <Dropdown.Menu variant='dark'>
                                    {yearList}
                                </Dropdown.Menu>
                            </Dropdown>
                            <Selection />
                            <SubSelection />
                        </Stack>
                    </div>
                </div>
            </Collapse>
        </div>
    );
};

export default SidePanel;
