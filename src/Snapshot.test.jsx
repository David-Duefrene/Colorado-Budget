import React from 'react';
import { Provider } from 'react-redux';

import { expect, it, describe } from 'vitest';
import { render } from '@testing-library/react';

import store from './store';
import Dashboard from './containers/Dashboard/Dashboard';
import testData from './dummyData.json';

const renderWithProvider = (element) => render(<Provider store={store}>{element}</Provider>);

describe('index', () => {
    it('renders the same snapshot without crashing', () => {
        store.dispatch({ type: 'LOADDATA', data: testData });
        const container = renderWithProvider(<Dashboard />);

        expect(container.asFragment()).toMatchSnapshot();
        expect(container).toMatchSnapshot();
    });
});
