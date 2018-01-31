import data from '../../example_data.json'
import uuid from 'uuid/v4'

export const FETCH_TOPICS_REQUEST = 'topics/FETCH_TOPICS_REQUEST'
export const FETCH_TOPICS_SUCCESS = 'topics/FETCH_TOPICS_SUCCESS'
export const FETCH_TOPICS_FAILURE = 'topics/FETCH_TOPICS_FAILURE'

/*
  This action is used to fetch the list of topics
*/
export function fetchTopics() {
  return {
    types: [FETCH_TOPICS_REQUEST, FETCH_TOPICS_SUCCESS, FETCH_TOPICS_FAILURE],
    callAPI: () => new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data.topics);
      }, 1500)
    })
  }
}


export const ADD_NEW_TOPIC_REQUEST = 'topics/ADD_NEW_TOPIC_REQUEST'
export const ADD_NEW_TOPIC_SUCCESS = 'topics/ADD_NEW_TOPIC_SUCCESS'
export const ADD_NEW_TOPIC_FAILURE = 'topics/ADD_NEW_TOPIC_FAILURE'

/*
  This action is used for user to add a new topic to the list of topic
*/
export function addNewTopic(content) {
  return {
    types: [ADD_NEW_TOPIC_REQUEST, ADD_NEW_TOPIC_SUCCESS, ADD_NEW_TOPIC_FAILURE],
    shouldCallAPI: state =>  !state.topics.isAddingNewTopic,
    callAPI: () => new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          id: uuid(),
          content,
          votes: 0
        });
      }, 1500)
    })
  }
}


export const UPDATE_VOTE_REQUEST = 'topics/UPDATE_VOTE_REQUEST'
export const UPDATE_VOTE_SUCCESS = 'topics/UPDATE_VOTE_SUCCESS'
export const UPDATE_VOTE_FAILURE = 'topics/UPDATE_VOTE_FAILURE'

/*
  This action is used for user to up vote or down vote a topic
*/
export function updateVote(topicId, deltaValue) {
  return {
    types: [UPDATE_VOTE_REQUEST, UPDATE_VOTE_SUCCESS, UPDATE_VOTE_FAILURE],
    callAPI: () => new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          topicId,
          deltaValue
        });
      }, 200)
    }),
    payload: { topicId }
  }
}
