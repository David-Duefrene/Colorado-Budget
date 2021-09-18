/* eslint-disable camelcase */
/* eslint-disable no-case-declarations */
import { DateTime } from 'luxon';

import * as actions from '../actions/actionTypes';

/**
 * Initial state of the app
 * @prop {bool} isLoading: Is the loading data or not
 * @prop {string} fiscalYear: The year the user wants to see
 * @prop {object} departmentList: The list of departments and their money spent per month
 * @prop {object} departmentTotals: The list of departments and total money spent per year
 * @prop {object} cabinetList: The list of cabinets and their money spent per month
 * @prop {object} cabinetTotals: The list of cabinets and total money spent per year
 * @prop {string} subItem: The sub item the user wants to load into the line chart
 * @prop {string} totalAmount: The total amount the colorado gov has spent
 */
const initialState = {
    isLoading: true,
    fiscalYear: DateTime.now().minus({ years: 1 }).toFormat('yyyy'),
    departmentList: {},
    departmentTotals: {},
    cabinetList: {},
    cabinetTotals: {},
    subItem: '',
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
        const {
            department_list, total_amount, grand_totals, cabinet_list,
        } = action.data;

        return {
            ...state,
            totalAmount: total_amount,
            departmentList: department_list,
            departmentTotals: grand_totals.department,
            cabinetList: cabinet_list,
            cabinetTotals: grand_totals.cabinet,
            isLoading: action.data.isLoading,
        };

    case actions.SETSUBITEM:
        return {
            ...state,
            subItem: action.data.subItem,
        };

    default:
        return state;
    }
};

export default dataReducer;
