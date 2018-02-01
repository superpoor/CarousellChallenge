import React from 'react';
import renderer from 'react-test-renderer';

import Loading from '../loading'

it('renders correct Loading component', () => {
  const rendered = renderer.create(
    <Loading />
  ).toJSON();
  expect(rendered).toMatchSnapshot();
});