import React, { Component } from 'react';
import * as Font from 'expo-font'
import { Container, Spinner } from 'native-base';
import Navigation from './Navigation'

export default class Setup extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async UNSAFE_componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return (
        <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Spinner color='red' size='large' />
        </Container>
      );
    }
    return (
      <Navigation />
    );
  }
}