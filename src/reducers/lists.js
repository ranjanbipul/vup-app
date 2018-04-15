var createReducer = require('../lib/createReducer').default;
var LISTS = require('../actions/types').LISTS;
var arrayToObject = require('../lib/func').arrayToObject;
// import * as types from '../actions/types';
// import createReducer from '../lib/createReducer'


console.log(arrayToObject)

var reducers = module.exports = {}

for(var i in LISTS){
  if(LISTS[i].generateReducer){
    reducers[i] = createReducer({count: 0, previous: null, next: null, order: [], results:{}}, {
      LOGOUT(state,action){
        return {count: 0, previous: null, next: null, order: [], results:{}}
      },
      ["set_"+i](state,action){
        return {...action.resp,order:action.resp.results.map((data)=> data.id), results: arrayToObject(action.resp.results,"id")}
      },
      ["add_"+i](state,action){
        return {...action.resp, order: [...state.order,...action.resp.results.map((data)=> data.id)],results: {...state.results,...arrayToObject(action.resp.results,"id")}}
      },
      ["update_"+i](state,action){
        if(action.item.id in state.results){
          return {...state,results: {...state.results,[action.item.id]:action.item}}
        }else{
          return {...state,count: state.count+1,order: [action.item.id,...state.order],results: {...state.results,[action.item.id]:action.item}}
        }
      }
    });
  }
  reducers["filter_"+i] = createReducer(LISTS[i].filters,{
    ["set_filter_"+i](state,action){
      return action.filter;
    },
    ["add_filter_"+i](state,action){
      return {...state,...action.filter};
    },
    ["remove_filter_"+i](state,action){
      let newState = {...state};
      delete newState[action.filter]
      return newState;
    }
  });
}

//export default reducers
