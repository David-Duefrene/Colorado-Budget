import React from 'react';

import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Dashboard from './Dashboard';
import testData from './testData.json';

const mockStore = configureMockStore([thunk]);
configure({ adapter: new Adapter() });
jest.mock('../../components/LineChart/LineChart');

describe('<Dashboard />', () => {
    let wrapper;
    const store = mockStore({
        data: {
            isLoading: false,
            fiscalYear: '2020',
            departmentList: testData,
            departmentTotals: testData,
            cabinetList: testData,
            cabinetTotals: testData,
            fundCategoryList: testData,
            fundCategoryTotals: testData,
            fundList: testData,
            fundTotals: testData,
            selection: 'department',
            subItem: 'total',
            workingDataSet: testData,
            totals: testData,
            totalAmount: 0.0,
        },
    });

    beforeEach(() => {
        wrapper = mount(<Provider store={store}><Dashboard /></Provider>);
    });

    it('should have 2 columns, a dropdown list', () => {
        expect(wrapper.find('Col')).toHaveLength(2);
        expect(wrapper.find('Dropdown')).toHaveLength(4);
    });
});
