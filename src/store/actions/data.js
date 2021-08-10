import axios from 'axios';

import * as actions from './actionTypes';

/* eslint-disable no-param-reassign */
export const isInDict = (dict, key, val) => {
    if (key in dict) {
        const temp = parseFloat(dict[key]) + parseFloat(val);
        dict[key] = temp.toFixed(2);
        return;
    }
    dict[key] = val;
};
/* eslint-enable no-param-reassign */

const LoadData = (fiscalYear) => (dispatch) => {
    const itemLimit = 500000;
    const getData = async (pageNum = 0) => {
        axios.get(`https://data.colorado.gov/resource/rifs-n6ib.json?fiscal_year=${fiscalYear}&$limit=${itemLimit}&$offset=${pageNum * itemLimit}`).then((result) => {
            const departments = {};
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
                },
            });

            if (result.data.length < itemLimit) {
                dispatch({
                    type: actions.ISLOADING,
                    data: {
                        isLoading: false,
                    },
                });
                return;
            }
            getData(pageNum + 1);
        }).catch((error) => console.log(error));
    };
    getData();
};

export default LoadData;
