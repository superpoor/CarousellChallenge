import createReducer from '../libs/createReducer'
import update from 'immutability-helper';

import {
  FETCH_TOPICS_REQUEST,
  FETCH_TOPICS_SUCCESS,

  ADD_NEW_TOPIC_REQUEST,
  ADD_NEW_TOPIC_SUCCESS
} from '../actions/topics'

const initialState = {
  byId: {},
  isFetching: false,
  lastFetch: 0,
  isAddingNewTopic: false,
}

export default createReducer(state = initialState, {
  [FETCH_TOPICS_REQUEST]: (state, action) => {
    return update(state, {isFetching: {$set: true}});
  },

  [FETCH_TOPICS_SUCCESS]: (state, action) => {
    const newTopics = {};
    action.response.forEach(topic => newTopics[topic.id] = topic);
    return update(state, {
      byId: {$merge: newTopics},
      isFetching: {$set: false},
      lastFetch: {$set: new Date().getTime()}
    });
  },

  [ADD_NEW_TOPIC_REQUEST]: (state, action) => {
    return update(state, {isAddingNewTopic: {$set: true}});
  },

  [ADD_NEW_TOPIC_SUCCESS]: (state, action) => {
    const newTopic = action.response;

    return update(state, {
      byId: {$merge: {[newTopic.id]: newTopic}},
      isAddingNewTopic: {$set: false},
    });
  },
});