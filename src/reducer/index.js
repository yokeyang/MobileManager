import { combineReducers } from 'redux'
import OpenMenu from './OpenMenu'
import FetchData from './FetchData'
import ChangeData from './ChangeData'

const App = combineReducers({
    OpenMenu,
    FetchData,
    ChangeData
})
export default App