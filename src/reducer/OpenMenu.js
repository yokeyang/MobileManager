import * as types from '../constant/ActionTypes';

const OpenMenu = (state = false, action) => {
    switch (action.type) {
        case types.Open_Menu:
            return Boolean(action.open)
        default:
            return state
    }
}
export default OpenMenu