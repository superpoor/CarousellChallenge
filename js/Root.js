import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { View, BackHandler } from 'react-native'
import { addNavigationHelpers, NavigationActions } from 'react-navigation'

import MainRouter from './routes/MainRouter'


@connect(
  state => ({ mainNav: state.mainNav }),
  dispatch => ({ dispatch })
)
export default class Root extends React.PureComponent {
  
  static propTypes = {
    mainNav: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  render() {
    const { mainNav, dispatch } = this.props;

    return (
      <MainRouter navigation={addNavigationHelpers({
        dispatch,
        state: mainNav
      })} />
    )
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  // This handler to handle back button press on Android
  onBackPress = () => {
    const { dispatch, mainNav } = this.props;
    if ( mainNav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };
}