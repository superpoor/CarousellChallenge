import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'

import MainRouter from './routes/MainRouter'

export default class Root extends React.PureComponent {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <MainRouter />
      </Provider>
    )
  }
}