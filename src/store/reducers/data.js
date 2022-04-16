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
 * @prop {object} fundCategoryList: The list of fund categories and their money spent per month
 * @prop {object} fundCategoryTotals: The list of fund categories and total money spent per year
 * @prop {object} fundList: The list of fund and their money spent per month
 * @prop {object} fundTotals: The list of fund and total money spent per year
 * @prop {string} selection: The category selection the user is viewing
 * @prop {string} subItem: The sub item the user wants to load into the line chart
 * @prop {object} workingDataSet: the current dataset being viewed
 * @prop {object} totals: The monthly totals for the data set currently being used
 * @prop {string} totalAmount: The total amount the colorado gov has spent
 */
const initialState = {
    isLoading: true,
    fiscalYear: DateTime.now().minus({ years: 1 }).toFormat('yyyy'),
    departmentList: {},
    departmentTotals: {},
    cabinetList: {},
    cabinetTotals: {},
    fundCategoryList: {},
    fundCategoryTotals: {},
    fundList: {},
    fundTotals: {},
    selection: 'department',
    subItem: 'total',
    workingDataSet: null,
    totals: null,
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
            isLoading: !action.isLoading,
        };

    case actions.DATE:
        return {
            ...state,
            fiscalYear: action.data.fiscalYear,
        };

    case actions.LOADDATA:
        const {
            department_list, total_amount, grand_totals, cabinet_list, fund_list,
            fund_category_list,
        } = action.data;

        return {
            ...state,
            totalAmount: total_amount,
            departmentList: department_list,
            departmentTotals: grand_totals.department,
            cabinetList: cabinet_list,
            cabinetTotals: grand_totals.cabinet,
            fundCategoryList: fund_category_list,
            fundCategoryTotals: grand_totals.fund_category,
            fundList: fund_list,
            fundTotals: grand_totals.fund,
            isLoading: action.data.isLoading,
            workingDataSet: department_list,
            totals: grand_totals.department,
        };

    case actions.SETSUBITEM:
        return {
            ...state,
            subItem: action.data.subItem,
        };

    case actions.SETSELECTION:
        let workingDataSet = null;
        let totals = null;

        switch (action.data.selection) {
        case 'department':
            workingDataSet = state.departmentList;
            totals = state.departmentTotals;
            break;
        case 'cabinet':
            workingDataSet = state.cabinetList;
            totals = state.cabinetTotals;
            break;
        case 'fund_category':
            workingDataSet = state.fundCategoryList;
            totals = state.fundCategoryTotals;
            break;
        case 'fund':
            workingDataSet = state.fundList;
            totals = state.fundTotals;
            break;
        default:
            workingDataSet = state.departmentList;
            totals = state.departmentTotals;
        }
        return {
            ...state,
            selection: action.data.selection,
            subItem: 'total',
            workingDataSet,
            totals,
        };

    default:
        return state;
    }
};

export default dataReducer;
