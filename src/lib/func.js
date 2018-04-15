
export const arrayToObject = (arr, key) => Object.assign({}, ...arr.map(item => ({[item[key]]: item})))

export function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export function handleError(this2,resp){
  if(resp.status===400){
    resp.json().then((json)=>{
      if ("non_field_errors" in json){
        window.toastr.error(json["non_field_errors"].join("<br/>"))
      }
      this2.setState({feedback: {...this2.state.feedback,...json},error: {...this2.state.error,...Object.assign({},...Object.keys(json).map(item => ({[item]: true}))) }})
    })
  }else if(resp.status===403){
    resp.json().then((json)=>{
      window.toastr.warning(json["non_field_errors"].join("<br/>"))
    });
  }else{
    window.toastr.error(resp.statusText)
  }
}
