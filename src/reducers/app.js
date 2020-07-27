import { handleActions } from 'redux-actions'

import {
  APP_SHOW_LOADING,
  APP_CLOSE_LOADING,
  APP_OAUTH_USER,
  GET_ALL_COURSE,
} from 'src/actions/app'

const initState = {
  loading: false,
  user: null,
  allCourses: [],
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
  },
  initState
)

export default app
