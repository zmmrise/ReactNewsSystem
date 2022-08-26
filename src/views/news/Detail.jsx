import axios from '../../util/http'
import React, { useState, useEffect } from 'react'
import { PageHeader, Descriptions, Space, message } from 'antd'
import moment from 'moment'
import colorList from '../../util/common/color'
import {
    HeartTwoTone
} from '@ant-design/icons';
export default function Detail(props) {
    const [newsInfo, setNewsInfo] = useState(null)
    const auditList = ['未审核', '审核中', '未通过', '已通过']
    const publishList = ['未发布', '发布中', '未通过', '已通过']
    useEffect(() => {
        axios.get(`news?_expand=category&_expand=role&id=${props.match.params.id}`).then(res => {
            let view = res.data[0].view + 1
            setNewsInfo({...res.data[0], view})
            axios.patch(`news/${props.match.params.id}`, {view})
            console.log(res.data[0])
        })
    }, [props.match.params.id])
    const addStar = () => {
        setNewsInfo({...newsInfo, star: 1})
        axios.patch(`news/${newsInfo.id}`, {star: 1})
        message.success('点赞成功')
    }
    const subStar = () => {
        setNewsInfo({...newsInfo, star: 0})
        axios.patch(`news/${newsInfo.id}`, {star: 0})
        message.success('取消点赞')
    }
    return (
        <div>
            {newsInfo && <PageHeader
                className="site-page-header"
                onBack={() => window.history.back()}
                title={newsInfo.title}
                subTitle={<Space><p>{newsInfo.category.title}</p>{newsInfo.star > 0 ? <HeartTwoTone twoToneColor="#eb2f96" onClick={subStar}/> : <HeartTwoTone onClick={addStar}/>}</Space>}
            >
                <Descriptions>
                    <Descriptions.Item label="创建者">{newsInfo.author}</Descriptions.Item>
                    <Descriptions.Item label="创建时间">{moment(newsInfo.createTime).format("YYYY/MM/DD HH:mm:ss")}</Descriptions.Item>
                    <Descriptions.Item label="发布时间">{newsInfo.publishTime ? moment(newsInfo.publishTime).format("YYYY/MM/DD HH:mm:ss") : '-'}</Descriptions.Item>
                    <Descriptions.Item label="区域">{newsInfo.region}</Descriptions.Item>
                    <Descriptions.Item label="审核状态" contentStyle={{ color: colorList[newsInfo.auditState] }}>{auditList[newsInfo.auditState]}</Descriptions.Item>
                    <Descriptions.Item label="发布状态" contentStyle={{ color: colorList[newsInfo.publishState] }}>{publishList[newsInfo.publishState]}</Descriptions.Item>
                    <Descriptions.Item label="访问数量" contentStyle={{ color: 'springgreen' }}>{newsInfo.view}</Descriptions.Item>
                    <Descriptions.Item label="点赞数量" contentStyle={{ color: 'springgreen' }}>{newsInfo.star}</Descriptions.Item>
                    <Descriptions.Item label="评论数量" contentStyle={{ color: 'springgreen' }}>0</Descriptions.Item>
                </Descriptions>
            </PageHeader>}
            {newsInfo && <div dangerouslySetInnerHTML={
                { __html: newsInfo.content }
            } style={{ border: '1px solid #ccc', margin: '0 24px' }}>

            </div>}

        </div>
    )
}
