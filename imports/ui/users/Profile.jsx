import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Skill, RecommendationCard, ProfileUserControl } from '/imports/ui/components/ForboleComponents.jsx';

// import Blog from '/imports/ui/pages/profile/Blog.jsx';
// import Wallet from '/imports/ui/pages/profile/Wallet.jsx';
// import Recommendations from '/imports/ui/pages/profile/Recommendations.jsx';

class Profile extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let headerBg = {
      backgroundImage:'url(/img/kwun-profile-header.jpg)',
      backgroundPosition: 'center center'
    };
    // console.log(this.props.loading);
    if (this.props.loading){
      return (<div>Loading... </div>);
    }
    else {
    if (!this.props.userExists){
      if (Meteor.userId()){
        return <div>No user found.</div>
      }
      else{
        return (<Redirect
          to={{
            pathname: "/login",
            state: { from: this.props.location }
          }}
        />)
      }
    }
    else {
      return (
        <div className="profile-page">

          <div className="page-header header-filter" data-parallax="true" style={headerBg}>
          </div>

          <div className="main">
            <div className="profile-content container">

              <ProfileUserControl
                picture={this.props.user.profilePic()}
                name={this.props.user.profile.name}
                username={this.props.user.username}
                userId={this.props.user._id}
                firstname={this.props.user.profile.firstname}
              />


                <ul className="nav nav-pills nav-pills-rose">
                  <li className="active"><a href="#about" data-toggle="tab">Bio</a></li>
                  <li><a href="#recommendations" data-toggle="tab">Recommendations</a></li>
                </ul>

                <div className="tab-content">
                  <div className="tab-pane active" id="about">
                    <div className="description">
                      {/*<p>Kwun is the CoFounder & Conductor of Forbole. He has started his digital entrepreneur life since 2005. He cofounded Creativeworks Group Limited, a digital agency in Hong Kong which has served clients such as UNICEF, AIA, Miss Universe, All Nippon Airways, etc. He is an advocate in digital transformation through the use of information technology and interactive user experience design. Kwun is now a Senior Advisor of Creativeworks to give advice and guidance in design & digital.</p>
                      <p>Kwun is also a Adjunct lecturer at The University of Hong Kong (“HKU”). He teaches digital marketing courses in the School of Professional And Continuing Education of HKU.</p>*/}
                    </div>

                    <div className="skills">
                        <h4>Endorsed Skills</h4>
                        <div className="row">
                          <div className="col-md-12">
                            {(this.props.user.skills)?(this.props.user.skills.map((skill, i) => <Skill key={i} skill={skill} />)):''}
                          </div>
                        </div>
                    </div>
                  </div>
                  {/*}<Blog />*/}
                  {/* <Recommendations user={this.props.user._id}/> */}
                  <div className="tab-pane" id="recommendations">
                    <div className="row">
                        {this.props.recos.map((reco, i) => <div key={i} className="col-md-6 col-lg-4">
                          <RecommendationCard
                          username={reco.creator().username}
                          picture={reco.creator().profilePic()}
                          createdBy={reco.creator().profile.name}
                          title={reco.creator().username}
                          recommendation={reco.recommendation}
                          skills={reco.skills}
                          event={reco.event}
                          createdAt={reco.createdAt}
                        /></div>)}
                    </div>
                  </div>
                </div>
            </div>
          </div>

        </div>
      );
    }
  }
  }
}

export default Profile;