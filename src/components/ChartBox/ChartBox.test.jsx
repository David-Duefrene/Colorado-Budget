import React from 'react';

import {
    expect, it, describe, beforeEach, afterEach,
} from 'vitest';
import { cleanup, render } from '@testing-library/react';

import ChartBox from './ChartBox';

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
        items: [
            { date: '2020-01-01', value: 100 },
        ],
    };

    beforeEach(() => {
        wrapper = render(<ChartBox data={data} dimensions={dimensions} />);
    });

    afterEach(cleanup);

    it('should render a January data point', () => {
        expect(wrapper.getByText('January')).toBeDefined();
    });
});
