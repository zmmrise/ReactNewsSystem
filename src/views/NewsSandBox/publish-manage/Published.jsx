import NewsPublish from '../../../components/publish-manage/NewsPublish'
import usePublish from '../../../components/publish-manage/usePublish'
import {Button} from 'antd'
export default function Published() {
  const {dataSource, handleOffline} = usePublish(2)
  return (
    <div>
      <NewsPublish dataSource={dataSource} button={(id) => <Button type='danger' onClick={() => handleOffline(id)}>下线</Button>} />
    </div>
  )
}
