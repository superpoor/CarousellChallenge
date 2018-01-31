import { StackNavigator, NavigationActions } from 'react-navigation'

import createReducer from '../libs/createReducer'
import HomeScreen from '../containers/HomeScreen'
import NewTopicScreen from '../containers/NewTopicScreen'

import { ADD_NEW_TOPIC_SUCCESS } from '../actions/topics'

const MainRouter = StackNavigator({
  Home: { screen: HomeScreen },
  NewTopic: { screen: NewTopicScreen }
})


const initialState = MainRouter.router.getStateForAction(MainRouter.router.getActionForPathAndParams('Home'));

// Custom reducer for Main Router, to integrate with redux store.
export const mainNavReducer = (state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case ADD_NEW_TOPIC_SUCCESS:
      nextState = MainRouter.router.getStateForAction(NavigationActions.back(), state);
      break;

    default:
      nextState = MainRouter.router.getStateForAction(action, state);
      break;
  } 

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

export default MainRouter;