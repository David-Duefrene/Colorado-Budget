// import axios from 'axios';

import testData from './2020.json';
import * as actions from './actionTypes';

const LoadData = () => (dispatch) => {
    dispatch({
        type: actions.LOADDATA,
        data: {
            isLoading: false,
            ...testData,
        },
    });
};

export const SetSubItem = (subItem) => (dispatch) => {
    dispatch({
        type: actions.SETSUBITEM,
        data: { subItem },
    });
};

export default LoadData;
