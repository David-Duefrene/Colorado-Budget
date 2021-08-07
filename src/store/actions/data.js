import axios from 'axios';

import * as actions from './actionTypes';

/* eslint-disable no-param-reassign */
const isInDict = (dict, key, val) => {
    if (key in dict) {
        const temp = parseFloat(dict[key]) + parseFloat(val);
        dict[key] = temp.toFixed(2);
        return;
    }
    dict[key] = val;
};
/* eslint-enable no-param-reassign */

const LoadData = (fiscalYear) => (dispatch) => {
    const departments = {};

    axios.get(`https://data.colorado.gov/resource/rifs-n6ib.json?fiscal_year=${fiscalYear}&$limit=100000`).then((result) => {
        let newAmount = 0;
        result.data.forEach((element) => {
            newAmount += parseFloat(element.amount);
            isInDict(departments, element.department, parseFloat(element.amount));
        });
        dispatch({
            type: actions.LOADDATA,
            data: {
                totalAmount: newAmount,
                departmentList: departments,
                isLoading: false,
            },
        });
    }).catch((error) => console.log(error));
};

export default LoadData;
