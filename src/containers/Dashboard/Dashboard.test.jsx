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

    it('should have 2 divs, a dropdown list', () => {
        expect(wrapper.find('div')).toHaveLength(2);
        expect(wrapper.find('.DropdownList')).toHaveLength(1);
    });

    it('should have a 4 item dropdown selection list', () => {
        const dropDownItems = (wrapper.find('.DropdownItem'));
        expect(dropDownItems).toHaveLength(4);
    });

    it('should switch to following tab', () => {
        expect(wrapper.find('LineChart')).toHaveLength(1);
    });
});
