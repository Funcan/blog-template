import React from 'react'

import { Switch, Route } from 'react-router-dom'
import Header from './Header'

const App = () => (
  <Switch>
    <Route exact path='/' render={() => (<Header />)}/>
    <Route path='/post/:title' render={({match}) => (<Header post={match.params.title}/>)}/>
    <Route render={() => (<div> Sorry, this page does not exist. </div>)} />
  </Switch>
)

export default App

