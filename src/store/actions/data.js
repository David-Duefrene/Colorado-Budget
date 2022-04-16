import axios from 'axios';
import store from '../../store';

import * as actions from './actionTypes';

const LoadData = () => (dispatch) => {
    const year = store.getState().data.fiscalYear;
    axios.get(`https://api.github.com/repos/David-Duefrene/Daves-Datasets/contents/Colorado-Budget/data/${year}.json`)
        .then((result) => {
            dispatch({
                type: actions.LOADDATA,
                data: {
                    isLoading: false,
                    ...JSON.parse(atob(result.data.content)),
                },
            });
        }).catch((error) => {
            console.log(error);
        });
};

export const SetSubItem = (subItem) => (dispatch) => {
    dispatch({
        type: actions.SETSUBITEM,
        data: { subItem },
    });
};

export const SetSelection = (selection) => (dispatch) => {
    dispatch({
        type: actions.SETSELECTION,
        data: { selection },
    });
};

export const SetYear = (fiscalYear) => (dispatch) => {
    dispatch({
        type: actions.DATE,
        data: { fiscalYear },
    });
};

export const SetLoading = (isLoading) => (dispatch) => {
    dispatch({
        type: actions.ISLOADING,
        data: { isLoading },
    });
};

export default LoadData;
