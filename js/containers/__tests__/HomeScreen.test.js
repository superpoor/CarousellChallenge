import React from 'react';
import renderer from 'react-test-renderer';

import { HomeScreen } from '../HomeScreen'

describe('Test HomeScreen component', () => {

  it('renders correct HomeScreen component with topics', () => {
    const rendered = renderer.create(
      <HomeScreen 
        topics={[{
          id: "123", "content": "content1", votes: 1
        }, {
          id: "124", "content": "content2", votes: 5
        }]}
        isFetchingTopics={false}
        isUpdatingVoteIds={[]}
        fetchTopics={() => {}}
        updateVote={() => {}}
      />
    ).toJSON();
    expect(rendered).toMatchSnapshot();
  })

  it('renders correct HomeScreen component while fetching topic', () => {
    const rendered = renderer.create(
      <HomeScreen 
        topics={[]}
        isFetchingTopics={true}
        isUpdatingVoteIds={[]}
        fetchTopics={() => {}}
        updateVote={() => {}}
      />
    ).toJSON();
    expect(rendered).toMatchSnapshot();
  })

  it('renders correct HomeScreen component while updating vote of some topics', () => {
    const rendered = renderer.create(
      <HomeScreen 
        topics={[{
          id: "123", "content": "content1", votes: 1
        }, {
          id: "124", "content": "content2", votes: 5
        }]}
        isFetchingTopics={false}
        isUpdatingVoteIds={["124"]}
        fetchTopics={() => {}}
        updateVote={() => {}}
      />
    ).toJSON();
    expect(rendered).toMatchSnapshot();
  })
})

