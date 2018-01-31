import React from 'react'
import {
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'

export default Button = (props) => {
  return (
    <TouchableOpacity disabled={props.disabled} 
      onPress={props.onPress}
      style={[styles.buttonContainer, {
        backgroundColor: props.backgroundColor
      }]}
      >
      <Text style={[styles.buttonTitle, {
        color: props.titleColor,
      }]}>
        { props.title }
      </Text>
    </TouchableOpacity>
  )
}

Button.proptypes = {
  backgroundColor: PropTypes.string,
  titleColor: PropTypes.string,
  disabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

Button.defaultProps = {
  backgroundColor: '#D8D8D8',
  titleColor: '#000000',
  disabled: false
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',      
    margin: 5,
    borderRadius: 3,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});