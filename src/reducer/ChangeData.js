import * as types from '../constant/ActionTypes';

const ChangeData = (state = [], action) => {
    switch(action.type) {
        case types.Change_Data:
            console.log(action)
            return action.key
        default:
            console.log(action)
            return state
    }
}
export default ChangeData