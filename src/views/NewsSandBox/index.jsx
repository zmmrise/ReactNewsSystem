import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import SideMenu from '../../components/SandBox/SideMenu'
import TopHeader from '../../components/SandBox/TopHeader'
import Home from './Home'
import UserList from './user-manage/UserList'
import RoleList from './right-manage/RoleList'
import RightList from './right-manage/RightList'
import { Layout } from 'antd'
import '../../assets/scss/NewsSandBox.scss'
export default function NewsSandBox() {
  return (

      <Layout>
        <SideMenu></SideMenu>
        <Layout className="site-layout">
          <TopHeader></TopHeader>
          <Layout.Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Switch>
              <Route path="/home" component={Home}></Route>
              <Route path="/user-manage/list" component={UserList}></Route>
              <Route path="/right-manage/role/list" component={RoleList}></Route>
              <Route path="/right-manage/right/list" component={RightList}></Route>
              <Redirect to="/home" from='/' exact />
              <Route path="*" render={() => (<div>zmm</div>)}></Route>
            </Switch>
          </Layout.Content>
        </Layout>
      </Layout>

  )
}
