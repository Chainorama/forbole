import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  // console.log(props);
  constructor(props){
      super(props);
      this.state = {
        user: props.currentUser?props.currentUser:'',
        headClass: (props.transHead)?" navbar-color-on-scroll navbar-transparent":""
      }
  }

  componentDidMount(){
      if($('.navbar-color-on-scroll').length != 0){
          $(window).on('scroll', materialKit.checkScrollForTransparentNavbar);
      }
      else{
        $(window).off('scroll', materialKit.checkScrollForTransparentNavbar);
      }
  }

  logout(){
    Meteor.logout();
  }

  render(){
    if (!this.props.loading){
      let bg = {
        backgroundImage: 'url('+Meteor.user().profilePic()+')'
      }
    return (
      <nav className={"navbar navbar-primary navbar-fixed-top"+this.state.headClass} color-on-scroll="350">
          <div className="container">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navigation">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <Link className="navbar-brand" to="/"><img className="logo" src="/img/forbole-logo-white.svg" />Forbole</Link>
              </div>

              <div className="collapse navbar-collapse">
                <ul className="nav navbar-nav navbar-right">
                    <li className="dropdown">
                      <Link to="#" className="dropdown-toggle profile-link" data-toggle="dropdown">
                        <div className="avatar img-raised" style={bg}/> {Meteor.user().profile.name}
                        <b className="caret"></b>
                      </Link>
                      <ul className="dropdown-menu dropdown-with-icons">
                        <li>
                          <Link to={"/@"+Meteor.user().username}>
                            <i className="material-icons">account_balance</i> My Profile
                          </Link>
                        </li>
                        <li>
                          <Link to="/connections">
                            <i className="material-icons">device_hub</i> Connections
                          </Link>
                        </li>
                        <li>
                          <Link to="/settings">
                            <i className="material-icons">beach_access</i> Settings
                          </Link>
                        </li>
                        <li>
                          <Link to="#" onClick={this.logout}>
                            <i className="material-icons">clear</i> Logout
                          </Link>
                        </li>
                      </ul>
                    </li>
                </ul>
              </div>
            </div>
        </nav>
    );}
    else{
      return <div></div>
    }
  }
}

export default Header;
