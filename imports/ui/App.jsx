import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { Accounts, STATES } from 'meteor/std:accounts-ui';
import PrivateRoute from '/imports/ui/routes/PrivateRouteContainer.js';
import DefaultLayout from '/imports/ui/layouts/DefaultContainer.js';
import PublicLayout from '/imports/ui/layouts/Public.jsx';
// import EmptyLayout from '/imports/ui/layouts/Empty.jsx';

import Home from '/imports/ui/pages/Home.jsx';
import NotFound from '/imports/ui/pages/NotFound.jsx';
import Login from '/imports/ui/users/Login.jsx';
import Register from '/imports/ui/users/Register.jsx';
import Profile from '/imports/ui/pages/Profile.jsx';
import Recommend from '/imports/ui/pages/Recommend.jsx';
import Recommendation from '/imports/ui/pages/Recommendation.jsx';
// import About from './pages/about.jsx';
// import SignIn from './pages/sign_in.jsx';


// App component - represents the whole app
export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
          user: props.currentUser?props.currentUser:''
        }
    }

    componentDidUpdate(prevProps, prevState){
      // console.log('App componentDidMount');
      //rerun jquery for the current DOM
        window_width = $(window).width();

        $navbar = $('.navbar[color-on-scroll]');
        scroll_distance = $navbar.attr('color-on-scroll') || 500;

        $navbar_collapse = $('.navbar').find('.navbar-collapse');

        //  Activate the Tooltips
        $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();

        //    Activate bootstrap-select
        if($(".selectpicker").length != 0){
            $(".selectpicker").selectpicker();
        }

        // Activate Popovers
        $('[data-toggle="popover"]').popover();

        // Active Carousel
        $('.carousel').carousel({
          interval: 3000
        });

        //Activate tags
        //removed class label and label-color from tag span and replaced with data-color
        var tagClass = $('.tagsinput').data('color');

        $('.tagsinput').tagsinput({
            tagClass: ' tag-'+ tagClass +' '
        });

        if($('.navbar-color-on-scroll').length != 0){
            $(window).on('scroll', materialKit.checkScrollForTransparentNavbar);
        }
        else{
          $(window).off('scroll', materialKit.checkScrollForTransparentNavbar);
        }

        if (window_width >= 768){
            big_image = $('.page-header[data-parallax="true"]');
            if(big_image.length != 0){
               $(window).on('scroll', materialKitDemo.checkScrollForParallax);
            }

        }

    }


    render() {
        return (
            <Router>
              <Switch>
                <PrivateRoute exact={true} path="/" component={Home} />
                <PublicLayout path="/login" component={Login} />
                <PublicLayout path="/signup" component={Register} />
                <PrivateRoute path="/profile" component={Profile} transHead={true} />
                <PrivateRoute path="/recommend" component={Recommend}/>
                <PrivateRoute path="/recommendation" component={Recommendation}/>
                <PublicLayout path="*" component={NotFound}/>
              </Switch>
                {/*}<Route path="/about" component={About} />*/}
              {/*
              <Route component={EmptyLayout}>
                <Route path="/sign-in" component={SignIn} />
              </Route>
              <Route path="*" component={NotFound}/>
              */}
            </Router>
        );
    }
}
