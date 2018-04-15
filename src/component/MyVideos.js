import React, {Component} from 'react';
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import {NewVideoForm} from '../forms'
import {Link} from 'react-router-dom'
// import Loader from './Loader'

function compareData(a,b){
    return a.created_at-b.created_at;
}

class MyVideos extends Component{
    constructor(props) {
        super(props);
        this.state = {
            fetching: false
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
            this.props.fetchList("videos",false,true).then(()=>{
                this.setState({fetching:false});
            })
        }
    }

    loadPage(){
        if(this.isFree()){
            this.setState({fetching:true});
            this.props.fetchPage("videos").then(()=>{
                this.setState({fetching: false});
            });
        }
    }


    render(){
        const videoList = Object.values(this.props.videos.results)
            .sort(compareData).reverse()
            .map((videoobj) =>
              <div key={videoobj.id} className="card m-1" style={{flexBasis:"49%"}}>
                <div className="view overlay">
                  <img class="img-fluid" src={videoobj.image} alt={videoobj.title} />
                  <Link to={'/videos/'+videoobj.id}>
                      <div class="mask rgba-white-slight"></div>
                  </Link>
                </div>
                <div className="card-body">
                        <h4 className="card-title"><strong>{videoobj.title}</strong></h4>
                        <p className="card-text">{videoobj.description}</p>
                        <Link to={'/videos/'+videoobj.id}><button type="button" className="btn btn-light-blue btn-md">Watch Now</button></Link>
                  </div>
                </div>

              )

        return(
          <main style={{marginTop: "4rem"}}>
              <div className="container-fluid">
                  <div className="d-flex" style={{justifyContent:"center"}}>
                    <div className="col-md-8">
                      <div className="card my-2">
                        <NewVideoForm />
                      </div>
                      <div className="d-flex" style={{flexWrap:"wrap"}}>
                          {videoList}
                      </div>
                    </div>
                  </div>
              </div>
          </main>

        )
    }
}


const mapStateToProps = state => {
    return {
        videos: state.videos
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyVideos);
