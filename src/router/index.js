import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '@/views/Home.js'
import Post from '@/views/Post.js'
import About from '@/views/About.js'
import Archiver from '@/views/Archiver.js'

export default _ => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/post" component={Post} />
        <Route exact path="/about" component={About} />
        <Route exact path="/archiver" component={Archiver} />
    </Switch>
)