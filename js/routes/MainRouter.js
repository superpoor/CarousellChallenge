import { StackNavigator } from 'react-navigation'

import HomeScreen from '../containers/HomeScreen'

const MainRouter = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'Carousell Challenge'
    }
  }
})

export default MainRouter;