import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';

import './ThemeSwitch.css';

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
    const [theme, setTheme] = useState('dark');

    /**
     * The function to switch between the light and dark theme
     * @constant
     * @type {function}
     */
    const switchTheme = () => {
        if (theme === 'dark') {
            document.documentElement.style.setProperty('--main-color', 'hsl(0, 0%, 90%)');
            document.documentElement.style.setProperty('--text-color', 'hsl(0, 0%, 0%)');
            document.documentElement.style.setProperty('--alt-color', 'hsl(0, 3%, 30%)');
            setTheme('light');
            return;
        }
        document.documentElement.style.setProperty('--main-color', 'hsl(0, 0%, 13%)');
        document.documentElement.style.setProperty('--text-color', 'hsl(0, 0%, 100%)');
        document.documentElement.style.setProperty('--alt-color', 'hsl(0, 27%, 94%)');
        setTheme('dark');
    };

    return (
        <div className='theme-switch d-grid'>
            <Button
                size='sm'
                variant={theme}
                onClick={switchTheme}
            >
                {`${theme.charAt(0).toUpperCase() + theme.slice(1)} Mode`}
            </Button>
        </div>
    );
};

export default ThemeSwitch;
