import React from 'react'
import {
  View, 
  Text,
  Button,
  Platform,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Loading from '../../components/loading'
import { addNewTopic } from '../../actions/topics'


@connect(
  state => ({
    isAddingNewTopic: state.topics.isAddingNewTopic
  }),
  dispatch => bindActionCreators({
    addNewTopic
  }, dispatch)
)
class NewTopicScreen extends React.PureComponent {

  static propTypes = {
    isAddingNewTopic: PropTypes.bool.isRequired,
    addNewTopic: PropTypes.func.isRequired,
  };

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      headerTitle: "New Topic",
      headerRight: (
        <Button  
          title="SUBMIT"
          onPress={params.handleSubmit ? params.handleSubmit : (() => null) }
        />
      )
    }
  };

  state = {
    inputValue: ''
  };

  render() {
    const { isAddingNewTopic } = this.props;
    const { inputValue } = this.state;

    if (isAddingNewTopic) return <Loading />
    
    return (
      <KeyboardAvoidingView 
        behavior= {"padding"}
        keyboardVerticalOffset={Platform.OS == 'ios' ? 64 : 80}
        style={styles.container}>
        <TextInput 
          style={styles.textInput}
          placeholder="Type your topic here"
          multiline={true}
          underlineColorAndroid="transparent"
          onChangeText={(text) => { if (text.length <= 255) this.setState({inputValue: text}) }}
          value={inputValue}
        />
        <Text style={styles.charLeft}>{255 - inputValue.length} characters left</Text>
      </KeyboardAvoidingView>
    )
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleSubmit: this._handleSubmit });
  }

  _handleSubmit = () => {
    this.props.addNewTopic(this.state.inputValue);
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    padding: 20,
    marginVertical: 20,
    textAlignVertical: 'top',
    color: '#545454'
  },
  charLeft: {
    color: '#747474',
    fontSize: 14,
    paddingRight: 10,
    paddingBottom: 10,
    textAlign: 'right'
  }
})

export default NewTopicScreen;
