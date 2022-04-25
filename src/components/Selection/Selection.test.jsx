import React from 'react';

import { Provider } from 'react-redux';
import { configure, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Selection from './Selection';

configure({ adapter: new Adapter() });
const mockStore = configureMockStore([thunk]);

describe('<Selection />', () => {
    let wrapper;
    const store = mockStore({
        data: {
            selection: 'department',
        },
    });

    beforeEach(() => {
        wrapper = mount(<Provider store={store}><Selection /></Provider>);
    });

    it('should render a single <div> and be set to department', () => {
        const button = wrapper.find('button');

        expect(button).toHaveLength(1);
        expect(button.text()).toEqual('department');
    });

    it('should dispatch an action when a <ListGroupItem> is clicked', () => {
        wrapper.find('button').simulate('click');
        const dropdownLinks = wrapper.find('a');

        expect(dropdownLinks).toHaveLength(4);
        expect(dropdownLinks.at(0).text()).toEqual('Department');
        expect(dropdownLinks.at(1).text()).toEqual('Cabinet');
        expect(dropdownLinks.at(2).text()).toEqual('Fund Category');
        expect(dropdownLinks.at(3).text()).toEqual('Fund');
    });

    it('Should match the active item with selection', () => {
        wrapper.find('button').simulate('click');
        const dropdownLinks = wrapper.find('a');

        dropdownLinks.at(1).simulate('click');
        expect(store.getActions()).toEqual([{ data: { selection: 'cabinet' }, type: 'SETSELECTION' }]);
        store.clearActions();

        dropdownLinks.at(2).simulate('click');
        expect(store.getActions()).toEqual([{ data: { selection: 'fund_category' }, type: 'SETSELECTION' }]);
        store.clearActions();

        dropdownLinks.at(3).simulate('click');
        expect(store.getActions()).toEqual([{ data: { selection: 'fund' }, type: 'SETSELECTION' }]);
        store.clearActions();
    });
});
