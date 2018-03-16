import React, {Component} from 'react';
import { Link } from 'react-router-dom'

class RecommendSent extends Component {

  componentDidMount() {
    //Activate tags
    //removed class label and label-color from tag span and replaced with data-color
    // var tagClass = $('.tagsinput').data('color');
    //
    // $('.tagsinput').tagsinput({
    //     tagClass: 'label label-info tag-'+ tagClass +' ',
    //     maxTags: 3
    // });
    //
    // $('.bootstrap-tagsinput').addClass('form-control');
  }

  render() {
    return (<div>
      <div className="page-header header-filter header-small" data-parallax="true" style={{
          backgroundImage: 'url(/img/recommend-bg.jpg)'
        }}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center">
              <h1 className="title"></h1>
            </div>
          </div>
        </div>
      </div>
      <div className="main main-raised">
        <div className="contact-content">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="title text-center">
                  <h3>Make a Recommendation</h3>
                </div>
                <div className="card card-profile card-plain">
                  <div className="card-avatar">
                    <Link to="#pablo">
                      <img className="img" src="/img/faces/kwun-profile.jpg"/>
                    </Link>
                  </div>

                  <div className="card-content">
                    <h4 className="card-title">Kwun Yeung</h4>
                    <h6 className="category text-muted">Co-Founder & Conductor of Forbole</h6>

                    <p className="card-description">
                      You can recognize your connection by writing them a recommendation. Your recommendation will be shown on their profiles.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>)
  }
}

export default RecommendSent;
