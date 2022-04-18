import React from 'react';

import { Provider } from 'react-redux';
import { configure, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import SubSelection from './SubSelection';

configure({ adapter: new Adapter() });
const mockStore = configureMockStore([thunk]);

describe('<SubSelection />', () => {
    let wrapper;
    const store = mockStore({
        data: {
            totals: {
                test1: 100,
                test2: 200,
                test_3: 300,
                test4: 400,
            },
            subItem: 'test1',
        },
    });

    beforeEach(() => {
        wrapper = mount(<Provider store={store}><SubSelection /></Provider>);
    });

    it('should render a single <div> and 4 <ListGroupItem>', () => {
        const itemList = wrapper.find('ListGroupItem');

        expect(wrapper.find('div')).toHaveLength(1);

        expect(itemList).toHaveLength(4);
        expect(itemList.at(0).text()).toEqual('test1');
        expect(itemList.at(1).text()).toEqual('test2');
        expect(itemList.at(2).text()).toEqual('test_3');
        expect(itemList.at(3).text()).toEqual('test4');

        expect(itemList.at(0).props().active).toBeTruthy();
        expect(itemList.at(1).props().active).toBeFalsy();
        expect(itemList.at(2).props().active).toBeFalsy();
        expect(itemList.at(3).props().active).toBeFalsy();
    });

    it('should dispatch an action when a <ListGroupItem> is clicked', () => {
        const itemList = wrapper.find('ListGroupItem');

        itemList.at(1).simulate('click');

        expect(store.getActions()).toEqual([{ data: { subItem: 'test2' }, type: 'SETSUBITEM' }]);
    });

    it('Should match the active item with subItem', () => {
        const updatedStore = mockStore({
            data: {
                totals: {
                    test1: 100,
                    test2: 200,
                    test_3: 300,
                    test4: 400,
                },
                subItem: 'test2',
            },
        });
        wrapper = mount(<Provider store={updatedStore}><SubSelection /></Provider>);
        const itemList = wrapper.find('ListGroupItem');

        expect(itemList.at(0).props().active).toBeFalsy();
        expect(itemList.at(1).props().active).toBeTruthy();
        expect(itemList.at(2).props().active).toBeFalsy();
        expect(itemList.at(3).props().active).toBeFalsy();
    });
});
