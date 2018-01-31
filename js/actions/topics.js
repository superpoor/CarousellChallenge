import data from '../../example_data.json'

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