import axios from 'axios';

import * as actions from './actionTypes';

const LoadData = () => (dispatch) => {
    axios.get('https://api.github.com/repos/David-Duefrene/Colorado-Budget/contents/src/store/actions/2020.json')
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

export default LoadData;
