import React, { useState } from 'react';

import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

import Year from './Year/Year';
import Selection from './Selection/Selection';
import SubSelection from './SubSelection/SubSelection';

import './SidePanel.css';

const SidePanel = () => {
    /**
     * If the side panel is open or not
     * @constant
     * @type {state}
     */
    const [show, setShow] = useState(false);

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
