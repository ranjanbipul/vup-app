import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {ActionCreators} from '../actions'

class Header extends Component {

    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark unique-color fixed-top py-0">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/" style={{fontSize: "1.7rem", fontWeight: "bold"}}> <span
                            className="clearfix d-none d-sm-inline-block">VUP</span></a>
                        {this.props.loginStatus?
                        <ul className="nav navbar-nav nav-flex-icons ml-auto">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#account" id="navbarDropdownMenuLink"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="d-sm-none"><i className="fa fa-user-o fa-fw"
                                                                   style={{fontSize: "1.5em"}}></i></span> <span
                                    className="clearfix d-none d-sm-inline-block">{this.props.user.first_name ? this.props.user.first_name : this.props.user.username}</span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right"
                                     aria-labelledby="navbarDropdownMenuLink">

                                    <a className="dropdown-item" onClick={() => {
                                        this.props.logout("Logout")
                                    }}><i className="fa fa-sign-out fa-fw"></i> Log Out</a>
                                </div>
                            </li>
                        </ul>
                        :
                        null
                        }
                    </div>
                </nav>
                <div id="loading" className="progress bg-success" style={{
                    zIndex: 100001,
                    display: this.props.isBusy ? "block" : "none",
                    position: "fixed",
                    left: 0,
                    top: 0
                }}>
                    <div className="indeterminate"></div>
                </div>
            </header>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        loginStatus: state.loginStatus,
        isBusy: state.isBusy
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
