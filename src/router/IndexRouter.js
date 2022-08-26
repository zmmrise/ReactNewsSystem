import React from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'

import Login from '../views/Login'
import NewsSandBox from '../views/NewsSandBox'
import News from '../views/news/News'
import Detail from '../views/news/Detail'
export default function IndexRouter() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/detail/:id" component={Detail}></Route>
                <Route path="/news" component={News}></Route>
                <Route path="/login" component={Login} ></Route>
                <Route path="/" render={() => localStorage.getItem('token') ? <NewsSandBox /> : <Redirect to="/login" />} ></Route>

            </Switch>
        </HashRouter>
    )
}
