import React from 'react'

import { Switch, Route } from 'react-router-dom'
import Header from './Header'

// There's currently no point supporting more than / as a route, since I'm
// statically serving this from github.io and so the server only knows to
// dish up index.html as / and anything else as static content.
//
// I'll use ?title=foo_bar_baz to link to specific posts instead
const App = () => (
  <Switch>
    <Route exact path='/' render={() => (<Header />)}/>
  </Switch>
)

export default App

