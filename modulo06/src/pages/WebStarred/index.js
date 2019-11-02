import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import PropTypes from 'prop-types';

export default class WebStarred extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('starred').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  render() {
    const {navigation} = this.props;

    const url = navigation.getParam('starred').html_url;

    return <WebView source={{uri: url}} style={{flex: 1}} />;
  }
}
