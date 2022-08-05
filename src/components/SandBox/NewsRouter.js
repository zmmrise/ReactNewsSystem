import { Redirect, Route, Switch } from 'react-router-dom'
import Home from '../../views/NewsSandBox/Home'
import UserList from '../../views/NewsSandBox/user-manage/UserList'
import RoleList from '../../views/NewsSandBox/right-manage/RoleList'
import RightList from '../../views/NewsSandBox/right-manage/RightList'
import Nopermission from '../../views/NewsSandBox/nopermission/Nopermission'
import NewsAdd from '../../views/NewsSandBox/news-manage/NewsAdd'
import NewsDraft from '../../views/NewsSandBox/news-manage/NewsDraft'
import NewsCategory from '../../views/NewsSandBox/news-manage/NewsCategory'
import Audit from '../../views/NewsSandBox/audit-manage/Audit'
import AuditList from '../../views/NewsSandBox/audit-manage/AuditList'
import Published from '../../views/NewsSandBox/publish-manage/Published'
import Unpublished from '../../views/NewsSandBox/publish-manage/Unpublished'
import Sunset from '../../views/NewsSandBox/publish-manage/Sunset'
import { useEffect, useState } from 'react'
import axios from 'axios'

const LocalRouterMap = {
    "/home": Home,
    "/user-manage/list": UserList,
    "/right-manage/role/list": RoleList,
    "/right-manage/right/list": RightList,
    "/news-manage/add": NewsAdd,
    "/news-manage/draft": NewsDraft,
    "/news-manage/category": NewsCategory,
    "/audit-manage/audit": Audit,
    "/audit-manage/list": AuditList,
    "/publish-manage/unpublished": Unpublished,
    "/publish-manage/published": Published,
    "/publish-manage/sunset": Sunset,
}
export default function NewsRouter() {
    
    const [backendRoutes, setBackendRoutes] = useState([])
    const {role: {rights}} = JSON.parse(localStorage.getItem('token'))
    useEffect(() => {
        Promise.all(
            [axios.get("http://localhost:3006/rights"), axios.get("http://localhost:3006/children")]
        ).then(res => {
            setBackendRoutes([...res[0].data, ...res[1].data])
        })
    }, [])

    const checkRoute = (value) => {
        return LocalRouterMap[value.key] && value.pagepermisson
    }
    const checkUserPermission = (value) => {
        return rights.includes(value.key)
    }
    return (
        <Switch>
            {
                backendRoutes.map(value => {
                    if (checkRoute(value) && checkUserPermission(value)) {
                        return <Route key={value.key} path={value.key} component={LocalRouterMap[value.key]} exact></Route>
                    }else {
                        return null
                    }
                    
                })
            }
            <Redirect from='/' to='/home' exact/>
            <Route path="*" component={Nopermission}></Route>
    </Switch>
    )
}
    

