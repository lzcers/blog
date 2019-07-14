import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Guide from '@/pages/Guide'
import Home from '@/pages/Home'
import Post from '@/pages/Post'
import About from '@/pages/About'
import Archive from '@/pages/Archive'
import Aranya from '@/pages/Aranya'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const MainRoutes = _ => (
    <Switch>
        <Route exact path="/home/page/:pageNumber" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/post/:id" component={Post} />
        <Route path="/about" component={About} />
        <Route path="/archive/tag/:tag" component={Archive} />
        <Route path="/archive" component={Archive} />
        <Route path="/aranya" component={Aranya} />
    </Switch>
)

const PrimaryLayout = props => (
    <div className="container">
        <div className="wrap">
            <Nav />
            <div className="content">
                <MainRoutes />
            </div>
            <Footer />
        </div>
    </div>
)

const OpeningPage = props => <Guide />

const Routes = props => (
    <Switch>
        <Route exact path="/" component={OpeningPage} />
        <Route path="/" component={PrimaryLayout} />
    </Switch>
)

export default Routes
