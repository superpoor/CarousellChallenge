import React from 'react';
import { Provider } from 'react-redux'

import Root from './js/Root'
import configureStore from './js/store'

const { store } = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  )
}


