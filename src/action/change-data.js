import * as types from '../constant/ActionTypes';

export const changeData = (key,data) => {
    return {
        type: types.Change_Data,
        key,
        data
    }
}