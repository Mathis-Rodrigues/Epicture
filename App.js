import React, { Component, Fragment } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { Container, Spinner } from 'native-base';
import * as Font from 'expo-font'

import Navigation from './Components/Navigation'
import AuthPage from './Components/Oauth/AuthPage'

class App extends Component {
  state = {
    accountParams: null,
    isLoading: true,
  }

  async UNSAFE_componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ isLoading: false });
  }

  componentDidMount() {
    (async () => {
      const jsonValue = await AsyncStorage.getItem("account_params")

      this.setAccountParams(jsonValue !== null ? JSON.parse(jsonValue) : null)
    })()
  }

  setAccountParams = (accountParams) => {
    this.setState({ accountParams })
  }

  disconnectAccount = async () => {
    setAccountParams(null)
    await AsyncStorage.removeItem("account_params")
  }

  render() {
    const { accountParams, isLoading } = this.state

    if (isLoading)
      return (
        <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Spinner color='red' size='large' />
        </Container>
      )

    return (
      <Fragment>
        { accountParams === null &&
          <AuthPage setAccountParams={this.setAccountParams} />
        }
        { accountParams !== null &&
          <Navigation disconnectAccount={this.disconnectAccount} />
        }
      </Fragment>
    )
  }
}

export default App