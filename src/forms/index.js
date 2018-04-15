import React, {Component} from 'react';
import Api from '../lib/api'
import MDInput from './MDInput'
// import MDFile from './MDFile'
// import MDCheckbox from './MDCheckbox'
import LocalVideo from '../component/LocalVideo'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import {handleError} from '../lib/func'

function generateState(fields,defaults={}){
  return {
    submitting: false,
    isEnabled: false,
    data: Object.assign({},...fields.map(field => ({[field]: (field in defaults && defaults[field]?defaults[field]:"")}))),
    error:Object.assign({},...fields.map(field => ({[field]: false}))),
    feedback:Object.assign({},...fields.map(field => ({[field]: []})))
  }
}

function handleDataChange(this2,event){
  this2.setState({data: {...this2.state.data,[event.target.name]:event.target.value}});
}

// function handleCheckboxClick(this2,event){
//   this2.setState({data: {...this2.state.data,[event.target.name]:!this2.state.data[event.target.name]}});
// }
//
// function handleFileChange(this2,event){
//   this2.setState({data: {...this2.state.data,[event.target.name]:event.target.files[0]}});
// }
//
// function handleSubmitWithFileUpload(this2,event) {
//   event.persist();
//   event.preventDefault();
//   this2.setState({submitting: true})
//   const formData = new FormData();
//   for(var field of this2.fields)
//     formData.append(field,this2.state.data[field])
//   Api.upload(event.target.dataset.action,formData,event.target.dataset.method).then(json=>{
//     window.toastr.success(event.target.dataset.success)
//     this2.setState({submitting: false})
//   },resp=>{
//       this2.handleError(resp)
//       this2.setState({submitting: false})
//   });
// }
//
// function handleSubmit(this2,event) {
//   event.persist();
//   event.preventDefault();
//   this2.setState({submitting: true})
//   return Api[event.target.dataset.method](event.target.dataset.action,this2.state.data).then(json=>{
//     window.toastr.success(event.target.dataset.success)
//     this2.setState({submitting: false})
//     this2.setState({submitting: false, data: Object.assign({},...this2.fields.map(field => ({[field]: ""})))})
//   },resp=>{
//       this2.handleError(resp)
//       this2.setState({submitting: false})
//   });
// }


class Login extends Component{
  constructor(props){
    super(props);
    this.fields = ["username","password"];
    this.state = generateState(this.fields);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDataChange = (event)=> {handleDataChange(this,event)};
    this.handleError = (event)=> {handleError(this,event)};
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({submitting: true})
    return Api.post("/api/auth/",this.state.data).then(json=>{
      window.toastr.success(json.message)
      this.setState({submitting: false, data: Object.assign({},...this.fields.map(field => ({[field]: ""})))})
      this.props.checkLogin()
    },resp=>{
        this.handleError(resp)
        this.setState({submitting: false})
    });
  }

  render(){
       return (
      <form noValidate>
        <MDInput type="text" icon="user" formName="login" title="Username" name="username" value={this.state.data.username} controlFunc={this.handleDataChange} required error={this.state.error.username} feedbacks={this.state.feedback.username} />
        <MDInput type="password" icon="lock" formName="login" title="Password" name="password" value={this.state.data.password} controlFunc={this.handleDataChange} required error={this.state.error.password} feedbacks={this.state.feedback.password} />
        <div className="text-center mt-2">
            <button type="button" name="type" value="Log in" className="btn btn-info" onClick={this.handleSubmit}>{this.state.submitting? <i className="fa fa-circle-o-notch fa-spin fa-2x fa-fw"></i> : "Log in"}</button>
        </div>
      </form>
    )
  }
}

class Comment extends Component{
  constructor(props){
    super(props);
    this.fields = ["video","description"];
    this.state = generateState(this.fields,{video:props.videoId});
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDataChange = (event)=> {handleDataChange(this,event)};
    this.handleError = (event)=> {handleError(this,event)};
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({submitting: true})
    return Api.post("/api/comments/",this.state.data).then(json=>{
      window.toastr.success("Comment posted")
      this.props.addUpdateItem("comments",json)
      this.setState({submitting: false})
    },resp=>{
        this.handleError(resp)
        this.setState({submitting: false})
    });
  }

  render(){
       return (
         <form noValidate>
         <div className="row">
           <div className="col-12 mt-1">
             <div className="form-group basic-textarea rounded-corners shadow-textarea">
               <textarea name="description" value={this.state.data.description} className="form-control" id="form_comment_input_description" rows="5" onChange={this.handleDataChange} placeholder="Your comment..."></textarea>
             </div>
             <div className="text-right">
               <button type="button" name="type" value="Post" className="btn btn-info" onClick={this.handleSubmit} disabled={this.state.submitting}>{this.state.submitting? <i className="fa fa-circle-o-notch fa-spin fa-2x fa-fw"></i> : "Post"}</button>
             </div>
           </div>
         </div>
        </form>
    )
  }
}

class Register extends Component{
    constructor(props){
        super(props);
        this.fields = ["first_name","last_name","email","username","password","re_password"];
        this.state = generateState(this.fields);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDataChange = (event)=> {handleDataChange(this,event)};
        this.handleError = (event)=> {handleError(this,event)};
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({submitting: true})
        return Api.post("/api/register/",this.state.data).then(json=>{
            // this.props.addUpdateItem("market_orders",json)
            window.toastr.success("Successfully registered")
            this.setState({submitting: false, data: Object.assign({},...this.fields.map(field => ({[field]: ""})))})
        },resp=>{
            this.handleError(resp)
            this.setState({submitting: false})
        });
    }

    render(){
        return (
            <form noValidate>
              <MDInput type="text" icon="user" formName="register" title="First Name" name="first_name" value={this.state.data.first_name} controlFunc={this.handleDataChange} required error={this.state.error.first_name} feedbacks={this.state.feedback.first_name} />
              <MDInput type="text" icon="user" formName="register" title="Last Name" name="last_name" value={this.state.data.last_name} controlFunc={this.handleDataChange} required error={this.state.error.last_name} feedbacks={this.state.feedback.last_name} />
              <MDInput type="text" icon="user" formName="register" title="Username" name="username" value={this.state.data.username} controlFunc={this.handleDataChange} required error={this.state.error.username} feedbacks={this.state.feedback.username} />
              <MDInput type="text" icon="envelope" formName="register" title="Email" name="email" value={this.state.data.email} controlFunc={this.handleDataChange} required error={this.state.error.email} feedbacks={this.state.feedback.email} />
              <MDInput type="password" icon="lock" formName="register" title="Password" name="password" value={this.state.data.password} controlFunc={this.handleDataChange} required error={this.state.error.password} feedbacks={this.state.feedback.password} />
              <MDInput type="password" icon="lock" formName="register" title="Re Password" name="re_password" value={this.state.data.re_password} controlFunc={this.handleDataChange} required error={this.state.error.re_password} feedbacks={this.state.feedback.re_password} />
              <div className="text-center mt-2">
                    <button type="button" name="type" value="Register" className="btn btn-info" onClick={this.handleSubmit}>{this.state.submitting? <i className="fa fa-circle-o-notch fa-spin fa-2x fa-fw"></i> : "Register"}</button>
                </div>
            </form>
        )
    }
}

class NewVideo extends Component{
  constructor(props){
    super(props);
    this.state = {
      sending: false,
      description: "",
      file: "",
      title: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.chooseFile = this.chooseFile.bind(this);
  }

  chooseFile(event){
    this.fileInput.click()
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.file){
      // File is present upload via http
      console.log("uploading file now")
      this.setState({sending: true})
      const formData = new FormData();
      formData.append('file',this.state.file)
      formData.append('title',this.state.title)
      formData.append('description',this.state.description)
      Api.upload("/api/videos/",formData).then(json=>{
        this.setState({sending: false})
        window.toastr.success("Video was uploaded")
        this.setState({content:"",file:null,title:"",description:""})
        this.props.addUpdateItem("videos",json)
      },resp=>{
          resp.json().then((json)=>{
            if ("file" in json){
              window.toastr.error(json["file"].join("<br/>"))
            }
            else
              window.toastr.error("An error occurred during upload.")
          })
          this.setState({sending: false})
      });
    }else{
      window.toastr.error("Choose a video to upload")
    }
  }

  render(){
       return (
         <form onSubmit={this.handleSubmit} style={{width:"100%"}}>
           <div className="d-flex">
              <div>
                {this.state.file?
                  <div className="card black m-2">
                    <div className="card-body" style={{width:"300px",height:"200px",textAlign:"center"}} >
                      <i className="fa fa-times fa-2x" onClick={(event)=> this.setState({file:null})} style={{display:"block",position:"absolute",left:4,top:4}}></i>
                      <LocalVideo file={this.state.file} />
                    </div>
                  </div>
                  :
                  <div className="card m-2" onClick={this.chooseFile} >
                    <div className="card-body" style={{width:"300px",height:"200px",textAlign:"center"}} >
                      <img src="img/choose_video.png" alt="choose_video" style={{height:"80%"}} />
                    </div>
                  </div>
                }
              </div>
              <div class="pt-3" style={{flexGrow:1}}>
                <div className="md-form form-sm">
                    <input type="text" id="form_new_video_input_title" name="title" value={this.state.title}  onChange={(event)=> this.setState({title:event.target.value})} className="form-control validate" required />
                    <label htmlFor="form_new_video_input_title">Title</label>
                </div>
                <textarea name="description" className="md-textarea form-control" value={this.state.description} onChange={(event)=> this.setState({description:event.target.value})} placeholder="Write something about this video..."></textarea>
                <button type="submit" name="type" disabled={this.state.sending} value="Upload" className="btn btn-info pull-right">{this.state.sending? <i className="fa fa-circle-o-notch fa-spin fa-2x fa-fw"></i> : "Upload"}</button>
              </div>
              <input type="file" ref={input => this.fileInput = input} name="attachment.file" id="form_message_input_attachment" style={{display:"none"}} accept="video/*" onChange={(event)=> this.setState({file:event.target.files[0]})}/>
          </div>
         </form>
    )
  }
}


const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
}

export const LoginForm = connect(
(state)=> {return {}},
  mapDispatchToProps
)(Login);

export const RegisterForm = connect(
    (state)=> {return {}},
    mapDispatchToProps
)(Register);

export const CommentForm = connect(
(state)=> {return {}},
  mapDispatchToProps
)(Comment);

export const NewVideoForm = connect(
(state)=> {return {}},
  mapDispatchToProps
)(NewVideo);
