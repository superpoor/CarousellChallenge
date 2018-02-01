import React from 'react';
import renderer from 'react-test-renderer';

import { NewTopicScreen } from '../NewTopicScreen'

describe('Test NewTopicScreen component', () => {

  it('renders correct NewTopicScreen component', () => {
    const rendered = renderer.create(
      <NewTopicScreen 
        isAddingNewTopic={false}
        addNewTopic={() => {}}
        navigation={{
          setParams: () => {},
          state: {}
        }}
      />
    ).toJSON();
    expect(rendered).toMatchSnapshot();
  })

  it('renders correct HomeScreen component while submiting topic', () => {
    const rendered = renderer.create(
      <NewTopicScreen 
        isAddingNewTopic={true}
        addNewTopic={() => {}}
        navigation={{
          setParams: () => {},
          state: {}
        }}
      />
    ).toJSON();
    expect(rendered).toMatchSnapshot();
  })
})

