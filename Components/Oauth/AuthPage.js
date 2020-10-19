import React from 'react'
import { WebView } from 'react-native-webview';

import Config from '../../config/config'

function AuthPage() {
  const onNavigationStateChange = (navigationState) => {
    const paramString = navigationState.url.split("#");
    const params = {}

    if (paramString.length === 2 && paramString[0] === "https://apidocs.imgur.com/") {
      paramString[1].split('&').forEach(e => {
        const param = e.split('=')
        params[param[0]] = param[1]
      })
      console.log(params)
      const now = new Date().getTime()
      console.log("expires at: ", new Date(parseInt(params.expires_in) * 1000 + now))
    }
    console.log("\n")
  };

  return (
    <WebView
      source={{
        uri: `https://api.imgur.com/oauth2/authorize?client_id=${Config.clientID}&response_type=token`,
        method: "GET"
      }}
      style={{ marginTop: 25 }}
      onNavigationStateChange={onNavigationStateChange}
      incognito
    />
  )
}

export default AuthPage