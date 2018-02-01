import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import data from '../../../example_data.json'
import callAPIMiddleware from '../../libs/callAPIMiddleware'


import {
  FETCH_TOPICS_REQUEST,
  FETCH_TOPICS_SUCCESS,
  fetchTopics,

  ADD_NEW_TOPIC_REQUEST,
  ADD_NEW_TOPIC_SUCCESS,
  addNewTopic,

  UPDATE_VOTE_REQUEST,
  UPDATE_VOTE_SUCCESS,
  updateVote,
} from '../topics'

// Setup mock store
const middlewares = [thunk, callAPIMiddleware];
const mockStore = configureMockStore(middlewares)

// Test fetch topics action
describe('Test fetch topics action', () => {

  it ('Create FETCH_TOPICS_SUCCESS after fetching topics is done', () => {
    const expectedActions = [
      { type: FETCH_TOPICS_REQUEST, payload: {} },
      { type: FETCH_TOPICS_SUCCESS, payload: {}, response: data.topics }
    ];

    const store = mockStore();

    return store.dispatch(fetchTopics()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  })

})


// Test add topic action
describe('Test add topic action', () => {

  it ('Create ADD_NEW_TOPIC_SUCCESS after adding topic is done', () => {
    const expectedTopicContent = "Hello, this is new content";

    const expectedActions = [
      { type: ADD_NEW_TOPIC_REQUEST, payload: {} },
      { type: ADD_NEW_TOPIC_SUCCESS, payload: {}, response: { id: expect.any(String), content: expectedTopicContent, votes: 0 } }
    ];

    const store = mockStore({ topics: { isAddingNewTopic: false } });

    return store.dispatch(addNewTopic(expectedTopicContent)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  })

  it ('Do not call any actions to create topics when isAddingNewTopic is True', () => {
    const expectedTopicContent = "Hello, this is new content";

    const store = mockStore({ topics: { isAddingNewTopic: true } });

    store.dispatch(addNewTopic(expectedTopicContent))
    expect(store.getActions()).toEqual([]);
  })

})


// Test upvote or downvote topic action
describe('Test upvote or downvote topic action', () => {

  it ('Create UPDATE_VOTE_SUCCESS after fetching topics is done', () => {
    const topicId = '1232asd-da4wasd';
    const deltaValue = 1;

    const expectedActions = [
      { type: UPDATE_VOTE_REQUEST, payload: { topicId } },
      { type: UPDATE_VOTE_SUCCESS, payload: { topicId }, response: { topicId, deltaValue } }
    ];

    const store = mockStore();

    return store.dispatch(updateVote(topicId, deltaValue)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  })

})