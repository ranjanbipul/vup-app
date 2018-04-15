import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const appStatus = createReducer(1, {
    [types.LOGIN](state, action) {
        return 1
    }
});


export const isBusy = createReducer(false, {
    [types.SET_APP_STATE](state, action) {
        return action.state
    }
})
