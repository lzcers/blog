import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '@/views/Home.js'

export default _ => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
    </Switch>
)