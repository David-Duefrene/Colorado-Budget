import axios from 'axios';

import * as actions from './actionTypes';

const LoadData = () => (dispatch) => {
    const itemLimit = 500000;
    const getData = async (pageNum = 0) => {
        const url = `https://data.colorado.gov/resource/rifs-n6ib.json?$where=journal_date between '2019-01-10' and '2019-01-17'&$limit=${itemLimit}&$offset=${pageNum * itemLimit}`;
        axios.get(url).then((result) => {
            dispatch({
                type: actions.LOADDATA,
                data: { ...result.data },
            });

            if (result.data.length < itemLimit) {
                dispatch({
                    type: actions.ISLOADING,
                    data: { isLoading: false },
                });
                return;
            }
            getData(pageNum + 1);
        }).catch((error) => console.log(error));
    };
    getData();
};

export default LoadData;
