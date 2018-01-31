import data from '../../example_data.json'
import uuid from 'uuid/v4'

export const FETCH_TOPICS_REQUEST = 'topics/FETCH_TOPICS_REQUEST'
export const FETCH_TOPICS_SUCCESS = 'topics/FETCH_TOPICS_SUCCESS'
export const FETCH_TOPICS_FAILURE = 'topics/FETCH_TOPICS_FAILURE'

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
