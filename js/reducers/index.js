import createReducer from '../libs/createReducer'
import update from 'immutability-helper';

import {
  FETCH_TOPICS_REQUEST,
  FETCH_TOPICS_SUCCESS,
} from '../actions/topics'

const initialState = {
  topics: {
    byId: {},
    isFetching: false,
    lastFetch: 0
  }
}

export default createReducer(state = initialState, {
  [FETCH_TOPICS_REQUEST]: (state, action) => {
    return update(state, {topics: {isFetching: {$set: true}}});
  },

  [FETCH_TOPICS_SUCCESS]: (state, action) => {
    const newTopics = {};
    action.response.forEach(topic => newTopics[topic.id] = topic);

    return update(state, {
      topics: {
        byId: {$merge: newTopics},
        isFetching: {$set: false},
        lastFetch: {$set: new Date().getTime()}
      }
    });
  }
});