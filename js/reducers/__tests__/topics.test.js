import topicReducer from '../topics'
import {
  FETCH_TOPICS_REQUEST,
  FETCH_TOPICS_SUCCESS,
  ADD_NEW_TOPIC_SUCCESS,
  ADD_NEW_TOPIC_REQUEST,
  UPDATE_VOTE_REQUEST,
  UPDATE_VOTE_SUCCESS,
} from '../../actions/topics'

describe('Test topic reducer', () => {
  
  it ('Return initial state with undefined state', () => {
    expect(topicReducer(undefined, {})).toEqual(expect.objectContaining({
      byId: {},
      isFetching: false,
      lastFetch: 0,
      isAddingNewTopic: false,
      isUpdatingVoteIds: [],
    }))
  })

  it ('Should handle FETCH_TOPICS_REQUEST', () => {
    expect(topicReducer({
      isFetching: false
    }, {
      type: FETCH_TOPICS_REQUEST
    })).toEqual({
      isFetching: true 
    })
  })

  it ('Should handle FETCH_TOPICS_SUCCESS', () => {
    expect(topicReducer({
      isFetching: true,
      byId: {
        "123": {
          content: 'some content',
          votes: 10,
          id: "123"
        }
      }
    }, {
      type: FETCH_TOPICS_SUCCESS,
      response: [{
        content: 'some changed content',
        votes: 15,
        id: "123"
      }, {
        content: 'some new content',
        votes: 13,
        id: "125"
      }]
    })).toEqual({
      isFetching: false,
      lastFetch: expect.any(Number),
      byId: {
        "123": {
          content: 'some changed content',
          votes: 15,
          id: "123"
        },
        "125": {
          content: 'some new content',
          votes: 13,
          id: "125"
        }
      }
    })
  })

  it ('Should handle ADD_NEW_TOPIC_REQUEST', () => {
    expect(topicReducer({
      isAddingNewTopic: false
    }, {
      type: ADD_NEW_TOPIC_REQUEST
    })).toEqual({
      isAddingNewTopic: true
    })
  })

  it ('Should handle ADD_NEW_TOPIC_SUCCESS', () => {
    expect(topicReducer({
      isAddingNewTopic: true,
      byId: {
        "123": {
          content: 'some content',
          votes: 10,
          id: "123"
        }
      }
    }, {
      type: ADD_NEW_TOPIC_SUCCESS,
      response: {
        content: 'some new content',
        votes: 13,
        id: "125"
      }
    })).toEqual({
      isAddingNewTopic: false ,
      byId: {
        "123": {
          content: 'some content',
          votes: 10,
          id: "123"
        },
        "125": {
          content: 'some new content',
          votes: 13,
          id: "125"
        }
      }
    })
  })

  it ('Should handle UPDATE_VOTE_REQUEST', () => {
    expect(topicReducer({
      isUpdatingVoteIds: []
    }, {
      type: UPDATE_VOTE_REQUEST,
      payload: { topicId: "123" }
    })).toEqual({
      isUpdatingVoteIds: ["123"]
    })
  })

  it ('Should handle UPDATE_VOTE_SUCCESS', () => {
    expect(topicReducer({
      isUpdatingVoteIds: ["123"],
      byId: {
        "123": {
          content: 'some content',
          votes: 10,
          id: "123"
        }
      }
    }, {
      type: UPDATE_VOTE_SUCCESS,
      payload: { topicId: "123" },
      response: { topicId: "123", deltaValue: -1 }
    })).toEqual({
      isUpdatingVoteIds: [],
      byId: {
        "123": {
          content: 'some content',
          votes: 9,
          id: "123"
        }
      }
    })
  })

})