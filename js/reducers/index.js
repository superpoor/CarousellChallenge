import createReducer from '../libs/createReducer'
import { fromJS } from 'immutable'

const initialState = fromJS({
  entities: {
    topics: {
      byId: {},
      allId: [],
    }
  }
})

export default createReducer(state = initialState, {

}) 