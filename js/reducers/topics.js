import createReducer from '../libs/createReducer'
import update from 'immutability-helper';

import {
  FETCH_TOPICS_REQUEST,
  FETCH_TOPICS_SUCCESS,

  ADD_NEW_TOPIC_REQUEST,
  ADD_NEW_TOPIC_SUCCESS,

  UPDATE_VOTE_REQUEST,
  UPDATE_VOTE_SUCCESS,
} from '../actions/topics'

const initialState = {
  byId: {},
  isFetching: false,
  lastFetch: 0,
  isAddingNewTopic: false,
  isUpdatingVoteIds: [],
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

  [UPDATE_VOTE_REQUEST]: (state, action) => {
    return update(state, {isUpdatingVoteIds: {$push: [action.payload.topicId]}});
  },

  [UPDATE_VOTE_SUCCESS]: (state, action) => {
    const { topicId, deltaValue } = action.response;

    return update(state, {
      byId: {[topicId]: {votes: {$apply: votes => Math.max(0, votes + deltaValue)}}},
      isUpdatingVoteIds: {$apply: list => {
        const newList = [...list];
        for (let index = newList.indexOf(topicId); index != -1; index = newList.indexOf(topicId)) 
          newList.splice(index, 1);
        return newList;
      }},
    });
  },
});