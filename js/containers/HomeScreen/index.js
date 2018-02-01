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
import { fetchTopics, updateVote } from '../../actions/topics'
import { getSortedTopicsByVote } from '../../selectors/topics' 

export class HomeScreen extends React.PureComponent {

  static propTypes = {
    topics: PropTypes.array.isRequired,
    isFetchingTopics: PropTypes.bool.isRequired,
    isUpdatingVoteIds: PropTypes.array.isRequired,
    fetchTopics: PropTypes.func.isRequired,
    updateVote: PropTypes.func.isRequired
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
      <TopicItem key={item.id} topic={item} isUpdatingVote={this.props.isUpdatingVoteIds.includes(item.id)} onUpdateVote={this._onUpdateVote} />
    )
  }

  render() {
    const { topics, isFetchingTopics, isUpdatingVoteIds } = this.props;

    if (isFetchingTopics) return <Loading />

    return (
      <View style={styles.listContainer}>
        <FlatList 
          keyExtractor={item => item.id}
          extraData={isUpdatingVoteIds}
          data={topics}
          renderItem={this._renderItem}
        />
      </View>
    )
  }

  componentDidMount() {
    this.props.fetchTopics();
  }

  _onUpdateVote = (topicId, deltaValue) => {
    this.props.updateVote(topicId, deltaValue);
  }
}


const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: '#E2E2E2'
  }
})


export default connect(
  state => ({
    topics: getSortedTopicsByVote(state),
    isFetchingTopics: state.topics.isFetching,
    isUpdatingVoteIds: state.topics.isUpdatingVoteIds,
  }),
  dispatch => bindActionCreators({
    fetchTopics,
    updateVote
  }, dispatch)
)(HomeScreen);
