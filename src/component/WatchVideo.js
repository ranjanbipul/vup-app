import React, {Component} from 'react';
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import {Link} from 'react-router-dom'
import Loader from './Loader'
import Api from '../lib/api'
import {CommentForm} from '../forms'
import Moment from 'moment'

function compareData(a,b){
    return a.created_at-b.created_at;
}

class WatchVideo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            fetching: false,
            video: null
        };
    }

    componentDidMount(){
        this.fetch()
    }

    isFree(){
        return !this.state.fetching;
    }

    fetch(){
        if(this.isFree()){
            this.setState({fetching:true});
            Api.get("/api/videos/"+this.props.match.params.id+"/").then((json)=>{
                this.setState({video:json});
            })
            this.props.fetchList("comments",{video:this.props.match.params.id}).then(()=>{
              this.setState({fetching:false});
            })
        }
    }


    render(){
      const commentList = Object.values(this.props.comments.results)
          .sort(compareData).reverse()
          .map((comment) =>
          <div className="row mb-4">
            <div className="col-12 col-md-2 mb-md-0 mb-4">
                <img src="http://mdbootstrap.com/img/Photos/Avatars/img%20(8).jpg" className="img-fluid rounded-circle z-depth-2 avatar" />
            </div>
            <div className="col-sm-10 col-12">
                <h4 className="font-weight-bold text-left">{comment.user}</h4>
                <div className="mt-2">
                    <ul className="list-unstyled">
                        <li className="comment-date">
                            <i className="fa fa-clock-o"></i> {Moment(comment.created_at).fromNow()}</li>
                    </ul>
                </div>
                <p className="grey-text">{comment.description}</p>
            </div>
        </div>
            )

        return(
          <main style={{marginTop: "4rem"}}>
              <div className="container-fluid">
                {
                  this.state.video?
                  <div className="d-flex" style={{justifyContent:"center"}}>
                    <div className="col-md-8">
                      <div className="card black my-2">
                        <video controls src={this.state.video.file}></video>
                      </div>
                      <div className="card my-2">
                        <div className="card-body">
                          <h2 className="card-title">{this.state.video.title}</h2>
                          <h4 className="card-text">{this.state.video.description}</h4>
                          <hr/>
                          <CommentForm videoId={this.props.match.params.id} />
                          <div className="comments-list text-md-left mb-5">
                            <div className="mb-4">
                                <h3>Comments <span className="badge blue"> {this.props.comments.count}</span>
                                </h3>
                            </div>

                            {commentList}
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>:
                  <Loader />
                }
              </div>
          </main>

        )
    }
}


const mapStateToProps = state => {
    return {
        comments: state.comments
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WatchVideo);
