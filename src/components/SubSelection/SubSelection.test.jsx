import React from 'react';

import {
    expect, it, describe, beforeEach, afterEach, vi,
} from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/react';

import SubSelection from './SubSelection';

describe('<SubSelection />', () => {
    let wrapper;
    const mockFn = vi.fn().mockImplementation(() => {});

    beforeEach(() => {
        wrapper = render(
            <SubSelection
                totals={{
                    test1: 100,
                    test2: 200,
                }}
                subItem='test1'
                dispatch={mockFn}
            />,
        );
    });

    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    it('should have 2 <ListGroupItem> that fire the mockFn when clicked', () => {
        expect(wrapper.getByText('test1')).toBeDefined();
        expect(wrapper.getByText('test2')).toBeDefined();

        fireEvent.click(wrapper.getByText('test1'));
        expect(mockFn).toHaveBeenCalledWith('test1');
        fireEvent.click(wrapper.getByText('test2'));
        expect(mockFn).toHaveBeenCalledWith('test2');
        expect(mockFn).toHaveBeenCalledTimes(2);
    });
});
