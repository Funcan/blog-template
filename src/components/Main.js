import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Header from './Header'

const Main = () => (
  <Switch>
    <Route exact path='/' component={Header}/>
    <Route exact path='/posts/:title' render={({match}) => (<Header post={match.params.title}/>)}/>
  </Switch>
)


export default Main;
