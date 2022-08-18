import React from 'react';

import {
    expect, it, describe, beforeEach, afterEach, vi,
} from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/react';

import Selection from './Selection';

describe('<Selection />', () => {
    let wrapper;
    const mockFn = vi.fn().mockImplementation(() => {});

    beforeEach(() => {
        wrapper = render(<Selection selection='test1' dispatchSelection={mockFn} />);
    });

    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    it('should render a single <div> and be set to department', () => {
        const button = wrapper.getByText('test1');
        expect(button).toBeDefined();
        fireEvent.click(button);

        const department = wrapper.getByText('Department');
        const cabinet = wrapper.getByText('Cabinet');
        const fundCategory = wrapper.getByText('Fund Category');
        const fund = wrapper.getByText('Fund');

        expect(department).toBeDefined();
        expect(cabinet).toBeDefined();
        expect(fundCategory).toBeDefined();
        expect(fund).toBeDefined();

        fireEvent.click(department);
        expect(mockFn).toHaveBeenCalledWith('department');
        fireEvent.click(cabinet);
        expect(mockFn).toHaveBeenCalledWith('cabinet');
        fireEvent.click(fundCategory);
        expect(mockFn).toHaveBeenCalledWith('fund_category');
        fireEvent.click(fund);
        expect(mockFn).toHaveBeenCalledWith('fund');

        expect(mockFn).toHaveBeenCalledTimes(4);
    });
});
