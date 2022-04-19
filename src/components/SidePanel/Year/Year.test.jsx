import React from 'react';

import { Provider } from 'react-redux';
import { configure, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Year from './Year';

configure({ adapter: new Adapter() });
const mockStore = configureMockStore([thunk]);

describe('<Year />', () => {
    let wrapper;
    const store = mockStore({
        data: {
            fiscalYear: '2019',
        },
    });

    beforeEach(() => {
        wrapper = mount(<Provider store={store}><Year /></Provider>);
    });

    it('should render a single <div> and be set to 2019', () => {
        const button = wrapper.find('button');

        expect(button).toHaveLength(1);
        expect(button.text()).toEqual('2019');
    });

    it('should dispatch an action when a <ListGroupItem> is clicked', () => {
        wrapper.find('button').simulate('click');
        const dropdownLinks = wrapper.find('a');

        expect(dropdownLinks).toHaveLength(5);
        expect(dropdownLinks.at(0).text()).toEqual('2017');
        expect(dropdownLinks.at(1).text()).toEqual('2018');
        expect(dropdownLinks.at(2).text()).toEqual('2019');
        expect(dropdownLinks.at(3).text()).toEqual('2020');
        expect(dropdownLinks.at(4).text()).toEqual('2021');
    });

    it('Should match the active item with year', () => {
        wrapper.find('button').simulate('click');
        const dropdownLinks = wrapper.find('a');

        dropdownLinks.at(1).simulate('click');
        expect(store.getActions()[0]).toEqual({ data: { fiscalYear: '2018' }, type: 'DATE' });
        store.clearActions();

        dropdownLinks.at(2).simulate('click');
        expect(store.getActions()[0]).toEqual({ data: { fiscalYear: '2019' }, type: 'DATE' });
        store.clearActions();

        dropdownLinks.at(3).simulate('click');
        expect(store.getActions()[0]).toEqual({ data: { fiscalYear: '2020' }, type: 'DATE' });
        store.clearActions();
    });
});
