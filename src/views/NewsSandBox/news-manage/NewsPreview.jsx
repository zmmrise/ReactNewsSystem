import React, { useEffect, useState } from 'react'
import { Descriptions, PageHeader } from 'antd'
import axios from '../../../util/http'
import moment from 'moment'
import colorList from '../../../util/common/color'
export default function NewsPreview(props) {
    const [newsInfo, setNewsInfo] = useState(null)
    const auditList = ['未审核', '审核中', '未通过', '已通过']
    const publishList = ['未发布', '发布中', '未通过', '已通过']
    useEffect(() => {
        axios.get(`news?_expand=category&_expand=role&id=${props.match.params.id}`).then(res => {
            setNewsInfo(res.data[0])
        })
    }, [props.match.params.id])
    
    return (
        <div>
            {newsInfo && <PageHeader
                className="site-page-header"
                onBack={() => window.history.back()}
                title={newsInfo.title}
                subTitle={newsInfo.category.title}
            >
                <Descriptions>
                    <Descriptions.Item label="创建者">{newsInfo.author}</Descriptions.Item>
                    <Descriptions.Item label="创建时间">{moment(newsInfo.createTime).format("YYYY/MM/DD HH:mm:ss")}</Descriptions.Item>
                    <Descriptions.Item label="发布时间">{newsInfo.publishTime ? moment(newsInfo.publishTime).format("YYYY/MM/DD HH:mm:ss") : '-'}</Descriptions.Item>
                    <Descriptions.Item label="区域">{newsInfo.region}</Descriptions.Item>
                    <Descriptions.Item label="审核状态" contentStyle={{color: colorList[newsInfo.auditState]}}>{auditList[newsInfo.auditState]}</Descriptions.Item>
                    <Descriptions.Item label="发布状态" contentStyle={{color: colorList[newsInfo.publishState]}}>{publishList[newsInfo.publishState]}</Descriptions.Item>
                    <Descriptions.Item label="访问数量" contentStyle={{color: 'springgreen'}}>{newsInfo.view}</Descriptions.Item>
                    <Descriptions.Item label="点赞数量" contentStyle={{color: 'springgreen'}}>{newsInfo.star}</Descriptions.Item>
                    <Descriptions.Item label="评论数量" contentStyle={{color: 'springgreen'}}>0</Descriptions.Item>
                </Descriptions>
            </PageHeader>}
            {newsInfo && <div dangerouslySetInnerHTML={
                {__html: newsInfo.content}
            } style={{border: '1px solid #ccc', margin: '0 24px'}}>

            </div>}
            
        </div>
    )
}
