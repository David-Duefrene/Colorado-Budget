import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import LineChart from '../LineChart/LineChart';

/**
 *  ChartBox is a React wrapper for LineChart.
 * @param {object} data
 * @param {object} dimensions
 * @returns <svg>
 */
const ChartBox = ({ data }) => {
    const svgRef = React.useRef(null);

    /**
     * The width of the chart
     * @constant
     * @type {state}
     */
    const [width, setWidth] = useState(window.innerWidth * 0.8);

    /**
     * The height of the chart
     * @constant
     * @type {state}
     */
    const [height, setHeight] = useState(window.innerHeight * 0.75);

    // Resize the chart on window resize
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth * 0.75);
            setHeight(window.innerHeight * 0.75);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const dimensions = { width, height };
    useEffect(() => {
        LineChart({ data, dimensions, svgRef });
    }, [data, dimensions, svgRef]);

    return <svg ref={svgRef} width={width + 120} height={height * 1.1} />;
};

ChartBox.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                date: PropTypes.string.isRequired,
                value: PropTypes.number.isRequired,
            }),
        ).isRequired,
    }).isRequired,
};

export default ChartBox;
