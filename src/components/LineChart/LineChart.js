import PropTypes from 'prop-types';

import * as d3 from 'd3';

const LineChart = ({ data, dimensions, svgRef }) => {
    const { width, height, margin } = dimensions;
    const parseDate = d3.timeParse('%Y-%m-%d');
    const xScale = d3.scaleTime()
        .domain(d3.extent(data.items, (d) => parseDate(d.date)))
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([
            d3.min(data.items, (d) => d.value) * 1.1,
            d3.max(data.items, (d) => d.value) * 1.1,
        ])
        .range([height, 0]);

    // Create root container where we will append all other chart elements
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll('*').remove(); // Clear svg content before adding new elements
    const svg = svgEl
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add X grid lines with labels
    const xAxis = d3.axisBottom(xScale)
        .tickSize(-height + margin.bottom)
        .tickFormat(d3.timeFormat('%B'));
    const xAxisGroup = svg.append('g')
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(xAxis);
    xAxisGroup.select('.domain').remove();
    xAxisGroup.selectAll('line').attr('stroke', 'rgba(255, 255, 255, 0.2)');
    xAxisGroup.selectAll('text')
        .attr('transform', 'rotate(-45)')
        .attr('opacity', 0.5)
        .attr('color', 'pink')
        .attr('font-size', '0.75rem');

    // Add Y grid lines with labels
    const yAxis = d3.axisLeft(yScale)
        .tickSize(-width)
        .tickFormat((val) => val);
    const yAxisGroup = svg.append('g').call(yAxis);
    yAxisGroup.select('.domain').remove();
    yAxisGroup.selectAll('line').attr('stroke', 'rgba(255, 255, 255, 0.2)');
    yAxisGroup.selectAll('text')
        .attr('opacity', 0.5)
        .attr('color', 'white')
        .attr('font-size', '0.75rem');

    // Draw the lines
    const line = d3.line()
        .x((d) => xScale(parseDate(d.date)))
        .y((d) => yScale(d.value));

    svg.append('path')
        .attr('d', line(data.items))
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr('class', 'line');

    return svg;
};

LineChart.propTypes = {
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
    svgRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
};

export default LineChart;
