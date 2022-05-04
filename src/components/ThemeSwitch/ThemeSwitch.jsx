import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';

import './ThemeSwitch.css';

const Themes = {
    "dark": {
        "main-color": "hsl(0, 0%, 13%)",
        "text-color": "hsl(0, 0%, 100%)",
        "line-color": "hsl(267, 95%, 76%)",
        "alt-color": "hsl(0, 0%, 66%)"
    },
    "light": {
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
    const [theme, setTheme] = useState('dark');

    /**
     * The function to switch between the light and dark theme
     * @constant
     * @type {function}
     */
    const switchTheme = () => {
        const { light, dark } = Themes;

        if (theme === 'dark') {
            Object.keys(light).forEach((prop) => {
                document.documentElement.style.setProperty(`--${prop}`, `${light[prop]}`);
            });
            setTheme('light');
            return;
        }
        Object.keys(dark).forEach((prop) => {
            document.documentElement.style.setProperty(`--${prop}`, dark[prop]);
        });
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
