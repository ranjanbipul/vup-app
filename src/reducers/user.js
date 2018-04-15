import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const loginStatus = createReducer(-1,{
  [types.LOGIN](state,action){
    return 1
  },
  [types.LOGOUT](state,action){
    return 0
  }
});

export const user = createReducer({}, {
  [types.LOGIN](state,action){
    return action.user
  },
  [types.LOGOUT](state,action){
    return {};
  },
  update_user(state,action){
    return action.item
  }
});
