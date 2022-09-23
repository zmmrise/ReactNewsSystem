import React from 'react'
import { Link } from 'react-router-dom';
import { Table } from 'antd'
export default function NewsPublish(props) {
    console.log(props)
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => {
                return <b>{id}</b>
            }
        },
        {
            title: '新闻标题',
            dataIndex: 'title',
            render(title, item) {
                return <Link to={`/news-manage/preview/${item.id}`}>{title}</Link>
            }
        },
        {
            title: '作者',
            dataIndex: 'author',
        },
        {
            title: '新闻分类',
            dataIndex: 'category',
            render(category) {
                return <b>{category.value}</b>
            }
        },

        {
            title: '操作',
            dataIndex: '',
            key: 'x',
            render: (item) => {
               return props.button(item.id)
            }
        },
    ];
    
    return (
        <div>
            <Table dataSource={props.dataSource} rowKey={(row) => row.id} columns={columns} pagination={{ pageSize: 5 }} scroll={{
        y: 540,
      }} />
        </div>
    )
}
