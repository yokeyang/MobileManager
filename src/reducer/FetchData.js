import * as types from '../constant/ActionTypes';

const FetchData = (state = [], action) => {
    switch (action.type) {
        case types.Fetch_Data:
            action.data.forEach(e => {
                e.key = e.id
            });
            return state.concat(action.data)
        default:
            return state
    }
}
export default FetchData