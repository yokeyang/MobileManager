import * as types from '../constant/ActionTypes';

export const fetchData = (data) => {
    return {
        type: types.Fetch_Data,
        data: data
    }
}