import { handleActions } from 'redux-actions'

import {
  APP_SHOW_LOADING,
  APP_CLOSE_LOADING,
  APP_OAUTH_USER,
  GET_ALL_COURSE,
  GET_ALL_REFEREE,
  GET_ALL_SCHOOL,
} from 'src/actions/app'

const initState = {
  loading: false,
  user: null,
  allCourses: [],
  allReferees: [],
  allSchools: [],
}

const app = handleActions(
  {
    [APP_SHOW_LOADING]: (state) => {
      return {
        ...state,
        loading: true,
      }
    },
    [APP_CLOSE_LOADING]: (state) => {
      return {
        ...state,
        loading: false,
      }
    },
    [APP_OAUTH_USER]: (state, { payload }) => {
      return {
        ...state,
        user: payload,
      }
    },
    [GET_ALL_COURSE]: (state, { payload }) => {
      return {
        ...state,
        allCourses: payload.data,
      }
    },
    [GET_ALL_REFEREE]: (state, { payload }) => {
      const result = payload.data.concat([{ id: 0, name: '晋级通' }])
      return {
        ...state,
        allReferees: result,
      }
    },
    [GET_ALL_SCHOOL]: (state, { payload }) => {
      return {
        ...state,
        allSchools: payload.data,
      }
    },
  },
  initState
)

export default app
