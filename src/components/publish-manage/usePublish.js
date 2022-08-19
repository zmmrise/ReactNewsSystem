import { useEffect, useState } from 'react'
import axios from '../../util/http'
import { message, notification } from 'antd'
export default function usePublish(publishState) {
    const [dataSource, setDataSource] = useState([])
    const { username } = JSON.parse(localStorage.getItem('token'))
    useEffect(() => {
        axios.get(`news?author=${username}&publishState=${publishState}&_expand=category`).then(res => {
            setDataSource(res.data)
        })
    }, [username, publishState])

    const handlePublish = (id) => {
        setDataSource(dataSource.filter(value => value.id !== id))
        axios.patch(`news/${id}`, {
            publishState: 2
        }).then(res => {
            message.success('操作成功')
            notification.info({
                message: `通知`,
                description: '您可以到【发布管理/已发布】查看您的新闻',
                placement: 'bottomRight',
            });
        })
    }
    const handleOffline = (id) => {
        setDataSource(dataSource.filter(value => value.id !== id))
        axios.patch(`news/${id}`, {
            publishState: 3
        }).then(res => {
            message.success('操作成功')
            notification.info({
                message: `通知`,
                description: '您可以到【发布管理/已下线】查看您的新闻',
                placement: 'bottomRight',
            });
        })
    }
    const handleDelete = (id) => {
        setDataSource(dataSource.filter(value => value.id !== id))
        axios.delete(`news/${id}`).then(res => {
            message.success('操作成功')
        })
    }
    return { dataSource, handlePublish, handleOffline, handleDelete }
}
