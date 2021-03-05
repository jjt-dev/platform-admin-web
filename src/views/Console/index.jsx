import React from 'react'
import PageForm from 'src/components/PageForm'
import { useDispatch } from 'react-redux'
import * as appAction from 'src/actions/app'
import useFetch from 'src/hooks/useFetch'

const Console = () => {
  const [data1] = useFetch(`/common/data/data1`)
  const [data2] = useFetch(`/common/data/data2`)

  return <div />
}

export default Console
