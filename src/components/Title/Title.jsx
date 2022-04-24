import React from 'react';
import PropTypes from 'prop-types';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';

import './Title.css';

/**
 * Renders the title section including the year, ThemeSwitch and an app description
 * @component
 * @requires react
 * @requires react-bootstrap
 * @prop {string} year - The current year being viewed
 * @returns {JSX}
 */
const Title = (props) => {
    const { year } = props;
    const description = `Colorado budget is app that displays the yearly budgets of all of Colorado's Departments, Cabinets, Funds and Fund Categories.`;

    return (
        <Row>
            <Col xs='1'><ThemeSwitch /></Col>
            <Col>
                <p>{description}</p>
                <h3>{`Current year being viewed: ${year}`}</h3>
            </Col>
        </Row>
    );
};

Title.propTypes = {
    year: PropTypes.string.isRequired,
};

export default Title;
