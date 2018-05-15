import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '@/views/Home'
import Post from '@/views/Post'
import About from '@/views/About'
import Archiver from '@/views/Archive'

const Routes = _ => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/home" component={Home} />
    <Route exact path="/post" component={Post} />
    <Route exact path="/about" component={About} />
    <Route exact path="/archiver" component={Archiver} />
  </Switch>
)
export default Routes
