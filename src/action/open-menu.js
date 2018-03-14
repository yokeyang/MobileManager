import * as types from '../constant/ActionTypes';

export const openMenu = (open) => {
    return {
        type: types.Open_Menu,
        open: open
    }
}