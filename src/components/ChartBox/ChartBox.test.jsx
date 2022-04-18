import React from 'react';

import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import ChartBox from './ChartBox';

configure({ adapter: new Adapter() });
jest.mock('../../components/LineChart/LineChart');

describe('<ChartBox />', () => {
    let wrapper;
    const dimensions = {
        width: 500,
        height: 250,
        margin: {
            top: 60, right: 200, bottom: 10, left: 100,
        },
    };
    const data = {
        color: '#ff0000',
        name: 'Department',
        items: [
            { date: '2020-01-01', value: 100 },
        ],
    };

    beforeEach(() => {
        wrapper = mount(<ChartBox data={data} dimensions={dimensions} />);
    });

    it('should have 2 columns, a dropdown list', () => {
        const svg = wrapper.find('svg');

        expect(svg).toHaveLength(1);
        expect(svg.props()).toEqual({ width: 800, height: 330 });
    });
});
