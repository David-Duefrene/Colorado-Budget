import React from 'react';

import {
    expect, it, describe, beforeEach, afterEach,
} from 'vitest';
import { cleanup } from '@testing-library/react';

import Dashboard from './Dashboard';
import store from '../../store';
import testData from '../../dummyData.json';
import renderWithProvider from '../../testUtil/renderWithProvider';

describe('<Dashboard />', () => {
    let wrapper;

    beforeEach(() => {
        store.dispatch({ type: 'LOADDATA', data: testData });
        wrapper = renderWithProvider(<Dashboard />);
    });

    afterEach(() => {
        cleanup();
    });

    it('should show loading!!! if no data is loaded', () => {
        const empty = renderWithProvider(<Dashboard />);
        empty.findAllByText('Loading!!!').then((res) => {
            expect(res).toHaveLength(2);
        });
    });

    it('should load 2020 by default', () => {
        wrapper.findAllByText('2020').then((res) => {
            expect(res).toHaveLength(1);
        });
    });
});
