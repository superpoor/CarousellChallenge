import React from 'react';
import renderer from 'react-test-renderer';

import Button from '../button'

it('renders correct button component', () => {
  const rendered = renderer.create(
    <Button 
      backgroundColor="red"
      title="button"
      titleColor="white"
      onPress={() => {}}
      disabled
    />
  ).toJSON();
  expect(rendered).toMatchSnapshot();
});