import PropTypes from 'prop-types';

import * as d3 from 'd3';

const LineChart = ({ data, dimensions, svgRef }) => {
    const { width, height } = dimensions;
    const parseDate = d3.timeParse('%Y-%m-%d');
    const xScale = d3.scaleTime()
        .domain(d3.extent(data.items, (d) => parseDate(d.date)))
        .range([0, width]);

    const min = d3.min(data.items, (d) => d.value);
    const max = d3.max(data.items, (d) => d.value);
    const yScale = d3.scaleLinear()
        .domain([
            min < 0 ? min * 1.25 : min * 0.75,
            max < 0 ? max * 0.75 : max * 1.1,
        ])
        .range([height - 50, 0]);

    // Create root container where we will append all other chart elements
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll('*').remove(); // Clear svg content before adding new elements
    const svg = svgEl
        .append('g')
        .attr('transform', `translate(100,20)`);

    // Add X grid lines with labels
    const xAxis = d3.axisBottom(xScale)
        .tickSize(-height)
        .tickFormat(d3.timeFormat('%B'));
    const xAxisGroup = svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis);
    xAxisGroup.select('.domain').remove();
    xAxisGroup.selectAll('line').attr('stroke', 'var(--alt-color)');
    xAxisGroup.selectAll('text')
        .attr('transform', 'rotate(-45)')
        .attr('color', 'var(--text-color)')
        .attr('font-size', '0.75rem');

    // Add Y grid lines with labels
    const yAxis = d3.axisLeft(yScale)
        .tickSize(-width)
        .tickFormat((val) => val);
    const yAxisGroup = svg.append('g').call(yAxis);
    yAxisGroup.select('.domain').remove();
    yAxisGroup.selectAll('line').attr('stroke', 'var(--alt-color)');
    yAxisGroup.selectAll('text')
        .attr('color', 'var(--text-color)')
        .attr('font-size', '0.75rem');

    // Draw the line
    const line = d3.line()
        .x((d) => xScale(parseDate(d.date)))
        .y((d) => yScale(d.value));

    svg.append('path')
        .attr('d', line(data.items))
        .attr('stroke', 'var(--line-color)')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr('class', 'line');
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
