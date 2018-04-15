import * as types from './types'
import Api from '../lib/api'

export function checkLogin(){
  return(dispatch,getState) => {
    console.log("Checking login")
    return Api.get('/api/me/').then(json=>{
      dispatch(login({user:json}));
    }).catch((resp) => {
      if(resp.status===403){
        dispatch(logout({user:resp.json()}))
      }
    })
  }
}

export function login({user}){
    return {
      type: types.LOGIN,
      user
    }
}

export function logout({error}){
  return(dispatch,getState) => {
    return Api.post('/api/logout/',{}).then(json=>{
      dispatch({
        type: types.LOGOUT,
      });
    }).catch((resp) => {
      window.toastr.error("Sorry! Unable to logout")
    })
  }
}
