import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';

import ThemeController  from './ThemeController';
import './ThemeSwitch.css';

const Themes = {
    "Dark": {
        "main-color": "hsl(0, 0%, 13%)",
        "text-color": "hsl(0, 0%, 100%)",
        "line-color": "hsl(267, 95%, 76%)",
        "alt-color": "hsl(0, 0%, 66%)"
    },
    "Light": {
        "main-color": "hsl(0, 0%, 90%)",
        "text-color": "hsl(0, 0%, 0%)",
        "line-color": "hsl(265, 100%, 47%)",
        "alt-color": "hsla(258, 100%, 35%, 0.5)"
    }
}


/**
 * Button to switch between the light and dark mode
 * @component
 * @requires react
 * @returns {JSX}
 */
const ThemeSwitch = () => {
    /**
     * The current theme
     * @constant
     * @type {string}
     */
    const [theme, setTheme] = useState('Dark');
    const switcher = new ThemeController(Themes, theme, setTheme);

    /**
     * The function to switch between the light and dark theme
     * @constant
     * @type {function}
     */
    const switchTheme = () => {
        if (switcher.getTheme() === 'Dark') {
            switcher.setTheme('Light');
            return;
        }
        switcher.setTheme('Dark');
    };

	return (
        <div className='theme-switch d-grid'>
            <Button
                size='sm'
                variant={switcher.getTheme() === 'Dark' ? 'dark' : 'light'}
                onClick={switchTheme}
            >
            {`${switcher.getTheme()} Mode`}
            </Button>
        </div>
    );
};

export default ThemeSwitch;
