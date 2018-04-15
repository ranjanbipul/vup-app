import React, { Component } from 'react';

export default class MDForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      submitting: false,
      isEnabled: false,
      data: Object.assign({},...this.props.fields.map(field => ({[field]: ""}))),
      error:Object.assign({},...this.props.fields.map(field => ({[field]: false}))),
      feedback:Object.assign({},...this.props.fields.map(field => ({[field]: []})))
    };
    this.handleDataChange = this.handleDataChange.bind(this);
  }

  handleDataChange(event) {
   this.setState({data: {...this.state.data,[event.target.name]:event.target.value}});
  }

  handleError(resp){
    if(resp.status===400){
      resp.json().then((json)=>{
        if ("non_field_errors" in json){
          window.toastr.error(json["non_field_errors"].join("<br/>"))
        }
        this.setState({feedback: {...this.state.feedback,...json},error: {...this.state.error,...Object.assign({},...Object.keys(json).map(item => ({[item]: true}))) }})
      })
    }else if(resp.status===403){
      resp.json().then((json)=>{
        window.toastr.warning(json["non_field_errors"].join("<br/>"))
      });
    }else{
      window.toastr.error(resp.statusText)
    }
  }

  render(){
    return (
      null
    )
  }
}
