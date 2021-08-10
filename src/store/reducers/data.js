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
        const actionList = action.data.departmentList;
        const stateList = state.departmentList;
        let newAmount = 0;

        // eslint-disable-next-line no-restricted-syntax
        for (const [element, value] of Object.entries(actionList)) {
            newAmount += parseFloat(value);
            if (element in stateList) {
                stateList[element] += value;
            } else {
                stateList[element] = value;
            }
            // isInDict(newDeptList, element, parseFloat(value));
        }

        return {
            ...state,
            totalAmount: action.data.totalAmount + newAmount,
            departmentList: stateList,
            isLoading: action.data.isLoading,
        };

    default:
        return state;
    }
};

export default dataReducer;
