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
    weekList: {},
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
        const { data } = action;
        const { departmentList, weekList } = state;
        let newTotalAmount = 0;

        Object.keys(data).forEach((element) => {
            const newAmount = parseFloat(data[element].amount).toFixed(2) / 10;
            const departmentName = data[element].department;
            const date = data[element].journal_date;

            newTotalAmount += newAmount;

            if (departmentName in departmentList) {
                const oldAmount = parseFloat(departmentList[departmentName]);
                departmentList[departmentName] = oldAmount + newAmount;
            } else {
                departmentList[departmentName] = newAmount;
            }

            if (departmentName in weekList) {
                const oldAmount = parseFloat(departmentList[departmentName]);
                weekList[departmentName][date] = { value: oldAmount + newAmount };
            } else {
                weekList[departmentName] = [];
                weekList[departmentName][date] = { value: parseFloat(newAmount).toFixed(2) };
            }
            weekList[departmentName][date] = {
                ...weekList[departmentName][date],
                date: DateTime.fromISO(date),
            };
        });

        return {
            ...state,
            totalAmount: state.totalAmount + newTotalAmount,
            departmentList,
            weekList,
            isLoading: action.data.isLoading,
        };

    default:
        return state;
    }
};

export default dataReducer;
