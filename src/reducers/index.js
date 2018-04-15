import {combineReducers} from 'redux'
import * as appReducer from './app'
import * as userReducer from './user'
import * as listReducer from './lists'

export default combineReducers(Object.assign(
    appReducer,
    userReducer,
    listReducer
))
