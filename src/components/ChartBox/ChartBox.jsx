import React from 'react';
import PropTypes from 'prop-types';

import LineChart from '../LineChart/LineChart';

/**
 *  ChartBox is a React wrapper for LineChart.
 * @param {object} data
 * @param {object} dimensions
 * @returns <svg>
 */
const ChartBox = ({ data, dimensions }) => {
    const svgRef = React.useRef(null);
    const { width, height, margin } = dimensions;
    const svgWidth = width + margin.left + margin.right;
    const svgHeight = height + margin.top + margin.bottom;

    React.useEffect(() => {
        LineChart({ data, dimensions, svgRef });
    }, [data, dimensions]);

    return <svg ref={svgRef} width={svgWidth} height={svgHeight + 10} />;
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
    dimensions:
        PropTypes.shape({
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired,
            margin: PropTypes.shape({
                top: PropTypes.number.isRequired,
                right: PropTypes.number.isRequired,
                bottom: PropTypes.number.isRequired,
                left: PropTypes.number.isRequired,
            }),
        }).isRequired,
};

export default ChartBox;
