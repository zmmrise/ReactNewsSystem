import React, { useEffect } from 'react'
import SideMenu from '../../components/SandBox/SideMenu'
import TopHeader from '../../components/SandBox/TopHeader'
import NewsRouter from '../../components/SandBox/NewsRouter'
import { Layout } from 'antd'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import '../../assets/scss/NewsSandBox.scss'
export default function NewsSandBox() {
  NProgress.start()
  useEffect(() => {
    NProgress.done()
  })
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
            <NewsRouter />
          </Layout.Content>
        </Layout>
      </Layout>

  )
}
