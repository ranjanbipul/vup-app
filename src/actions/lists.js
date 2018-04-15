import Api from '../lib/api'
// import * as types from '../actions/types'

function fetchListFunction(dispatch,getState,name,apply_filters){
  let filters = {...(getState()["filter_"+name]),...apply_filters};
  return Api.request(name,"list",null,filters).then(resp=>{
    dispatch({
      type: `set_${name}`,
      resp
    });
  }).catch((ex) => {
    console.log(ex);
  })
}

export function fetchList(name,apply_filters={}){
  return(dispatch,getState) => {
    return fetchListFunction(dispatch,getState,name,apply_filters);
  }
}


export function fetchPage(name){
  return(dispatch,getState) => {
    let nextPageUrl = getState()[name].next;
    if(nextPageUrl){
      console.log(`Fetching next ${name} page`);
      return Api.get(nextPageUrl).then(resp=>{
        dispatch({
          type: `add_${name}`,
          resp
        });
      }).catch((ex) => {
        console.log(ex);
      })
    }else{
      return Promise.resolve(0);
    }
  }
}

export function addUpdateItem(name,item){
  return(dispatch,getState) => {
    dispatch({
      type: `update_${name}`,
      item
    });
  }
}

export function setFilter(name,filter,user=null){
  return(dispatch,getState) => {
    dispatch({
      type: `set_filter_${name}`,
      filter
    });
    return fetchListFunction(dispatch,getState,name,user);
  }
}

export function addFilter(name,filter,user=null){
  return(dispatch,getState) => {
    dispatch({
      type: `add_filter_${name}`,
      filter
    });
    return fetchListFunction(dispatch,getState,name,user);
  }
}

export function removeFilter(name,filter,user=null){
  return(dispatch,getState) => {
    dispatch({
      type: `remove_filter_${name}`,
      filter
    });
    return fetchListFunction(dispatch,getState,name,user);
  }
}
