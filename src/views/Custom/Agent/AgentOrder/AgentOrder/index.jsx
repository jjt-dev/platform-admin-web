import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import PageForm from 'src/components/PageForm'
import useFetch from 'src/hooks/useFetch'
import { useTypes } from 'src/utils/const'

const AgentOrder = () => {
  const { allCourses } = useSelector((state) => state.app)
  const { agentId, agentName } = useParams()
  const [{ courseId, price } = {}] = useFetch(
    `/client/agent/account/agentInfo?agentId=${agentId}`
  )

  return (
    <PageForm
      formItems={getFormItems(allCourses)}
      titlePrefix={agentName}
      backPath={`/agent/${agentId}/${agentName}/order/list`}
      defaultValues={{ courseId, price, agentId }}
      apiPath="/client/agent/account/createOrder"
    />
  )
}

export default AgentOrder

const getFormItems = (allCourses) => [
  {
    comp: 'FormInput',
    name: 'agentId',
    hide: true,
  },
  {
    label: '科目',
    comp: 'FormSelect',
    name: 'courseId',
    titleKey: 'name',
    options: allCourses,
  },
  {
    label: '订单类型',
    comp: 'FormSelect',
    name: 'useType',
    titleKey: 'name',
    options: Object.values(useTypes),
  },
  {
    label: '订单名额',
    comp: 'FormInputNum',
    name: 'amount',
    type: 'integer',
    min: 0,
  },
  {
    label: '名额单价',
    comp: 'FormInputNum',
    name: 'price',
    type: 'integer',
    min: 0,
    suffix: '元',
  },
  {
    label: '已支付',
    comp: 'FormEnableRadio',
    name: 'isPayed',
    initialValue: false,
  },
]
