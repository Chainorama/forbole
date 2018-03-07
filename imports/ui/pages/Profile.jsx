import React, { Component } from 'react';

import About from '/imports/ui/pages/profile/About.jsx';
import Activity from '/imports/ui/pages/profile/Activity.jsx';
import Wallet from '/imports/ui/pages/profile/Wallet.jsx';

class Profile extends Component {
  render() {
    return (
      <div className="profile-page">

      <div className="page-header header-filter" data-parallax="true">
        <img src="/img/examples/city.jpg" height="100%" width="100%"/>
      </div>

      <div className="main main-raised">
        <div className="profile-content">
          <div className="container">

            <div className="row">
              <div className="col-xs-6 col-xs-offset-3">
                 <div className="profile">
                      <div className="avatar">
                          <img src="/img/faces/christian.jpg" className="img-circle img-responsive img-raised"/>
                      </div>
                      <div className="name">
                          <h3 className="title">Christian Louboutin</h3>
                          <h6>Designer</h6>
                      </div>
                  </div>
                </div>
            </div>

            <div className="card card-nav-tabs card-plain">
              <div className="header header-danger">
                <div className="nav-tabs-navigation">
                  <div className="nav-tabs-wrapper">
                    <ul className="nav nav-tabs" data-tabs="tabs">
                      <li className="active col-xs-4 text-center"><a href="#about" data-toggle="tab">about</a></li>
                      <li className="col-xs-4 text-center"><a href="#activity" data-toggle="tab">activity</a></li>
                      <li className="col-xs-4 text-center"><a href="#wallet" data-toggle="tab">wallet</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <div className="tab-content text-center">
                  
                  <About/>
                  <Activity/>
                  <Wallet/>
                  
                </div>
              </div>
            </div>

          </div> 
        </div>
      </div>

      </div>
    );
  }
}

export default Profile;