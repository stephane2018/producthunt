import React from 'react';
import { Route, Switch } from "react-router-dom";
import Home from '../view/Home';
 

// const About = () => <div>About</div>;
// const Contact = (props) => <div>{`${props.extra}`}</div>;
// const NotFound = () => <div>Not found page</div>;

const Router = () => {

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      
    </Switch>
  );
};

export default Router;