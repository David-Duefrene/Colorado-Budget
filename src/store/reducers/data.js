/* eslint-disable camelcase */
/* eslint-disable no-case-declarations */
import { DateTime } from 'luxon';

import * as actions from '../actions/actionTypes';

/**
 * Initial state of the app
 * @prop {bool} isLoading: Is the loading data or not
 * @prop {string} year: The year the user wants to see
 */
const initialState = {
    isLoading: true,
    fiscalYear: DateTime.now().minus({ years: 1 }).toFormat('yyyy'),
    departmentList: {},
    departmentTotals: {},
    totalAmount: 0.0,
};

/**
 * Dispatches the needed action.
 * @param {object} state The current app state.
 * @param {action} action The action the app needs to dispatch.
 */
const dataReducer = (state = initialState, action) => {
    switch (action.type) {
    case actions.ISLOADING:
        return {
            ...state,
            isLoading: action.isLoading,
        };

    case actions.DATE:
        return {
            ...state,
            fiscalYear: action.fiscalYear,
        };

    case actions.LOADDATA:
        const { department_list, total_amount, grand_totals } = action.data;

        return {
            ...state,
            totalAmount: total_amount,
            departmentList: department_list,
            departmentTotals: grand_totals.department,
            isLoading: action.data.isLoading,
        };

    default:
        return state;
    }
};

export default dataReducer;
