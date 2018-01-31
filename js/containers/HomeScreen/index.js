import React from 'react'
import {
  View, 
  Text,
  Button,
  FlatList,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import TopicItem from './TopicItem'
import Loading from '../../components/loading'
import { fetchTopics } from '../../actions/topics'
import { getSortedTopicsByVote } from '../../selectors/topics' 

@connect(
  state => ({
    topics: getSortedTopicsByVote(state),
    isFetchingTopics: state.topics.isFetching 
  }),
  dispatch => bindActionCreators({
    fetchTopics
  }, dispatch)
)
class HomeScreen extends React.PureComponent {

  static propTypes = {
    topics: PropTypes.array.isRequired,
    isFetchingTopics: PropTypes.bool.isRequired,
    fetchTopics: PropTypes.func.isRequired
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Carousell",
      headerRight: (
        <Button  
          title="NEW"
          onPress={() => navigation.navigate("NewTopic")}
        />
      )
    }
  };

  _renderItem = ({item}) => {
    return (
      <TopicItem key={item.id} topic={item} />
    )
  }

  render() {
    const { topics, isFetchingTopics } = this.props;

    if (isFetchingTopics) return <Loading />

    return (
      <View style={styles.listContainer}>
        <FlatList 
          keyExtractor={item => item.id}
          data={topics}
          renderItem={this._renderItem}
        />
      </View>
    )
  }

  componentDidMount() {
    this.props.fetchTopics();
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: '#E2E2E2'
  }
})

export default HomeScreen;
