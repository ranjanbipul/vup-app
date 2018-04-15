import * as types from '../actions/types'
import resources from '../resources'

class Api {
  static host = "//127.0.0.1:9001";
  static store = null;
  static chatsock = null;
  static url_patt = /^https?:\/\//i;
  static count = 0;
  static headers() {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // 'Authorization': "Bearer "+this.store.getState().token,
    }
  }

  static setStore(store){
    this.store = store;
  }

  static add(){
    this.count+=1
    if(this.count===1){
      this.store.dispatch({type:types.SET_APP_STATE,state:true})
    }
  }

  static remove(){
    this.count-=1
    if(this.count===0){
      this.store.dispatch({type:types.SET_APP_STATE,state:false})
    }
  }

  static get(route) {
    return this.xhr(route, null, 'GET');
  }

  static put(route, params) {
    return this.xhr(route, params, 'PUT')
  }

  static post(route, params) {
    return this.xhr(route, params, 'POST')
  }

  static upload(route, params,verb='POST') {
    return this.xhr(route, params, verb,true)
  }

  static delete(route, params) {
    return this.xhr(route, params, 'DELETE')
  }


  static xhr(route, params, verb,multipart=false) {
    this.add()
    var url=route;
    if (!Api.url_patt.test(route)){
        url = `${window.location.protocol}${Api.host}${route}`;
    }
    let options = null
    if(multipart){
      options = Object.assign({ method: verb,credentials: 'include' }, params ? { body: params } : null );
      options.headers = {'Accept': 'application/json'}
    }else{
      options = Object.assign({ method: verb,credentials: 'include' }, params ? { body: JSON.stringify(params) } : null );
      options.headers = Api.headers()
    }
    return fetch(url, options).then( resp => {
      //console.log(resp);
      this.remove()
      if (resp.ok) {
        let json = resp.json();
        return json
      }
      throw resp;
    },resp=>{
      this.remove()
      window.toastr.error(resp.message)
      console.error(resp)
      throw resp;
    });
  }


  static request(resource,action,data=null,query=null,id=null){
    console.log("Fetching via http");
    if(action==="list"){
      const params= Object.keys(query).map(key => key+"="+query[key]).join('&');
      return this.get(resources[resource].api.url+"?"+params)
    }else if(action==="create"){
      return this.post(resources[resource].api.url,data)
    }else{
      return this.post(`${resources[resource].api.url}${id}/${action}/`,data)
    }
  }

}
export default Api
