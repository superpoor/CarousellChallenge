import React from 'react'
import {
  View, 
  Text,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'

import Button from '../../components/button'

class TopicItem extends React.PureComponent {
  static propTypes = {
    topic: PropTypes.object.isRequired,
    isUpdatingVote: PropTypes.bool.isRequired,
    onUpdateVote: PropTypes.func.isRequired,
  };

  render() {
    const { topic, isUpdatingVote, onUpdateVote } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.content}>{topic.content}</Text>
        <View style={styles.voteContainer}>
          <View style={styles.voteCountContainer}>
            <Text style={styles.vote}>{topic.votes} votes</Text>
          </View>

          <Button title="UP VOTE" backgroundColor="#B02623" titleColor="white" 
            disabled={isUpdatingVote} onPress={() => { onUpdateVote(topic.id, 1) }} />
          <Button title="DOWN VOTE" disabled={isUpdatingVote} 
            onPress={() => { onUpdateVote(topic.id, -1) }} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginVertical: 5,
    elevation: 3,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  content: {
    color: '#545454',
    fontSize: 14
  },
  voteContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center'
  },
  voteCountContainer: {
    backgroundColor: '#F6F6F6',
    borderRadius: 2,
    padding: 8,
  },
  vote: {
    color: '#747474',
  }
})

export default TopicItem;