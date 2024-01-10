import { Tabs } from 'antd'

const TabsContainer = ({ items, onChange }: any) => {
  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
}

export default TabsContainer
