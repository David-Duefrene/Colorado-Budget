import React from 'react';
import PropTypes from 'prop-types';

import * as d3 from 'd3';

const PieChart = ({ data, dimensions }) => {
    const svgRef = React.useRef(null);
    const { width, height, margin } = dimensions;
    const svgWidth = width * 1.15;
    const svgHeight = height * 1.15;

    React.useEffect(() => {
        // Temp test data
        const testData = [2, 4, 8, 10];
        const color = d3.scaleOrdinal(['#4daf4a', '#377eb8', '#ff7f00', '#984ea3', '#e41a1c']);

        // The SVG element itself
        const svgEl = d3.select(svgRef.current);
        svgEl.selectAll('*').remove();
        const svg = svgEl
            .append('g')
            .attr('transform', `translate(200,250)`);

        // The pie chart
        const pie = d3.pie();

        // Generate the arcs
        const radius = Math.min(width, height) / 2;
        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

        // Generate the slices
        const arcs = svg.selectAll('arc')
            .data(pie(testData))
            .enter()
            .append('g')
            .attr('class', 'arc');

        // Draw arc paths
        arcs.append('path')
            .attr('fill', (d, i) => color(i))
            .attr('d', arc);
    }, [data]); // Redraw chart if data changes

    const style = {
        marginLeft: margin.left,
        marginRight: margin.right,
        marginTop: margin.top,
        marginBottom: margin.bottom,
        width: svgWidth,
        height: svgHeight,
    };

    return <svg ref={svgRef} style={style} />;
};

PieChart.propTypes = {
    data: PropTypes.shape({
        color: PropTypes.string.isRequired,
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

export default PieChart;
