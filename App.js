import React from 'react';

import Root from './js/Root'
import configureStore from './js/store'

const { store } = configureStore();

export default function App() {
  return <Root store={store} />
}


