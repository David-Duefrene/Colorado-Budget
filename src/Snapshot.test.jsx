import React from 'react';

import { expect, it, describe } from 'vitest';

import store from './store';
import Dashboard from './containers/Dashboard/Dashboard';
import renderWithProvider from './testUtil/renderWithProvider';
import testData from './dummyData.json';

describe('index', () => {
    it('renders the same snapshot without crashing', () => {
        store.dispatch({ type: 'LOADDATA', data: testData });
        const container = renderWithProvider(<Dashboard />);

        expect(container.asFragment()).toMatchSnapshot();
        expect(container).toMatchSnapshot();
    });
});
