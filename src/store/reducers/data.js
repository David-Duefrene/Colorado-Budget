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
    totalAmount: 0,
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
        const { departmentList } = state;
        let newTotalAmount = 0;

        Object.keys(data).forEach((element) => {
            const newAmount = parseFloat(data[element].amount);
            const departmentName = data[element].department;

            newTotalAmount += newAmount;
            if (departmentName in departmentList) {
                const oldAmount = parseFloat(departmentList[departmentName]);
                departmentList[departmentName] = oldAmount + newAmount;
            } else {
                departmentList[departmentName] = newAmount;
            }
        });

        return {
            ...state,
            totalAmount: state.totalAmount + newTotalAmount,
            departmentList,
            isLoading: action.data.isLoading,
        };

    default:
        return state;
    }
};

export default dataReducer;
