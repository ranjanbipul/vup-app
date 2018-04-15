import React, {Component} from 'react';
import Header from './component/Header'
import MyVideos from './component/MyVideos'
import WatchVideo from './component/WatchVideo'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {ActionCreators} from './actions'
import {LoginForm,RegisterForm} from './forms'
import './App.css';
import {Route, withRouter} from 'react-router-dom'
import Loader from './component/Loader'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.props.checkLogin();
    }

    render() {
        if (this.props.loginStatus === 1)
            return (
                <div>
                    <Header/>
                    <Route exact path='/' component={MyVideos} />
                    <Route exact path='/videos/:id' component={WatchVideo} />
                    <footer className="fixed-bottom pt-0 mt-0">
                    </footer>
                </div>
            );
        else if(this.props.loginStatus === 0)
          return (
              <div>
                  <Header/>
                  <main style={{marginTop: "4rem"}}>
                      <div className="container-fluid">
                          <section>
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                            }}>
                              <div className="col-lg-4 col-md-6 col-xs-12">
                                <div className="card modal-c-tabs">
                                  <ul className="nav nav-tabs tabs-2 light-blue darken-3" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" data-toggle="tab" href="#panelLogin" role="tab" id="tabLogin"><i className="fa fa-user mr-1"></i> Login</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#panelRegister" role="tab" id="tabRegister"><i className="fa fa-user-plus mr-1"></i> Register</a>
                                    </li>
                                  </ul>
                                  <div className="tab-content">
                                      <div className="tab-pane fade in show active" id="panelLogin" role="tabpanel">
                                          <div className="modal-body mb-1">
                                            <LoginForm />
                                          </div>
                                          {/* <div className="modal-footer display-footer">
                                              <div className="options text-center text-md-right mt-1">
                                                  <p>Not a member? <a role="alias" data-toggle="#tabRegister" className="blue-text">Sign Up</a></p>
                                                  <p>Forgot <a href="#" className="blue-text">Password?</a></p>
                                              </div>
                                          </div> */}
                                      </div>
                                      <div className="tab-pane fade" id="panelRegister" role="tabpanel">
                                          <div className="modal-body">
                                            <RegisterForm />
                                          </div>
                                          {/* <div className="modal-footer">
                                              <div className="options text-right">
                                                  <p className="pt-1">Already have an account? <a className="blue-text" role="alias" data-toggle="#tabLogin" >Log In</a></p>
                                              </div>
                                          </div> */}
                                      </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                      </div>
                  </main>
                  <footer className="fixed-bottom pt-0 mt-0">
                  </footer>
              </div>
          );
        else
            return (
                <Loader style={{height:"100vh"}} />
            );
    }
}

const mapStateToProps = state => {
    return {
        loginStatus: state.loginStatus,
        appStatus: state.appStatus,
        videos: state.videos
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(ActionCreators, dispatch);
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App));
