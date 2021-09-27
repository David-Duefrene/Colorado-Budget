import React from 'react';
import { Provider } from 'react-redux';

import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Dashboard from './Dashboard';

configure({ adapter: new Adapter() });

describe('<Dashboard />', () => {
    let wrapper;
    const mockStore = {
        isLoading: true,
        fiscalYear: '2020',
        departmentList: {},
        departmentTotals: {},
        cabinetList: {},
        cabinetTotals: {},
        fundCategoryList: {},
        fundCategoryTotals: {},
        fundList: {},
        fundTotals: {},
        selection: 'department',
        subItem: 'total',
        workingDataSet: null,
        totals: null,
        totalAmount: 0.0,
    };

    beforeEach(() => {
        wrapper = mount(<Provider store={{data: mockStore}}><Dashboard /></Provider>);
    });

    it('should have 2 tabs with a form', () => {
        expect(wrapper.find('div')).toHaveLength(2);
    });

    // it('should have the first tab as active by default', () => {
    //     const tabs = wrapper.find('button.NavLink').map((node) => node);
    //     expect(tabs[0].find('.Active')).toHaveLength(1);
    // });

    // it('should switch to following tab', () => {
    //     wrapper.find('#Following').find('button').simulate('click');
    //     expect(wrapper.find('.Active')).toHaveLength(1);
    //     expect(wrapper.find('CardDeck.Following')).toHaveLength(1);
    // });
});
