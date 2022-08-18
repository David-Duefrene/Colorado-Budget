import React from 'react';

import {
    expect, it, describe, beforeEach, afterEach, vi,
} from 'vitest';
import { cleanup, fireEvent } from '@testing-library/react';

import Year from './Year';
import renderWithProvider from '../../testUtil/renderWithProvider';

describe('<Year />', () => {
    let wrapper;
    const mockFn = vi.fn().mockImplementation(() => {});

    beforeEach(() => {
        wrapper = renderWithProvider(<Year year='2020' yearList={['2020', '2019']} changeYear={mockFn} />);
    });

    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    it('should render a single <div> and be set to 2020', () => {
        wrapper.findAllByText('2020').then((res) => {
            expect(res).toHaveLength(1);
        });
    });

    it('should dispatch an action when a <ListGroupItem> is clicked', () => {
        const dropdown = wrapper.getByText('2020');
        expect(dropdown).toBeDefined();
        fireEvent.click(dropdown);
        const switchButton = wrapper.getByText('2019');
        expect(switchButton).toBeDefined();
        fireEvent.click(switchButton);
        expect(mockFn).toHaveBeenCalledWith('2019');
    });
});
