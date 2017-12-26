import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Match, Redirect, Switch } from 'react-router-dom';

const EmptyLayout = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={matchProps => (
          <Component {...matchProps} />
    )} />
  )
};

export default EmptyLayout;
