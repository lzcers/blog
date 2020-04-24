import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Guide from '@/pages/Guide'
import Post from '@/pages/Post'
import Archive from '@/pages/Archive'
import Aranya from '@/pages/Aranya'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const MainRoutes = (_) => (
    <Switch>
        <Route path="/post/:id" component={Post} />
        <Route path="/archive/tag/:tag" component={Archive} />
        <Route path="/home" component={Archive} />
        <Route path="/aranya" component={Aranya} />
    </Switch>
)

const PrimaryLayout = (props) => (
    <div className="container">
        <Nav />
        <div className="content">
            <MainRoutes />
        </div>
        <Footer />
    </div>
)

const OpeningPage = (props) => <Guide />

const Routes = (props) => (
    <Switch>
        <Route exact path="/" component={OpeningPage} />
        <Route path="/" component={PrimaryLayout} />
    </Switch>
)

export default Routes
