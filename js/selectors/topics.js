import { createSelector } from 'reselect'

const getTopics = state => state.topics.byId;

export const getSortedTopicsByVote = createSelector(
  getTopics,
  topics => {
    const topicsList = [];
    for (let id in topics) topicsList.push(topics[id]);
    topicsList.sort((A, B) => A.votes > B.votes ? -1 : 1);

    return topicsList.filter((topic, index) => index < 20);
  }
)