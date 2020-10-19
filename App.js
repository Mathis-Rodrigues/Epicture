import React, { Fragment, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

import Setup from './Components/Setup'
import AuthPage from './Components/Oauth/AuthPage'



export default function App() {
  const [accountParams, setAccountParams] = useState(null)

  useEffect(() => {
    ( async () => {
      const jsonValue = await AsyncStorage.getItem("account_params")

      setAccountParams(jsonValue !== null ? JSON.parse(jsonValue) : null)
    })()
  }, [])

  const disconnectAccount = async () => {
    setAccountParams(null)
    await AsyncStorage.removeItem("account_params")
  }

  return (
    <Fragment>
      { accountParams === null &&
        <AuthPage setAccountParams={setAccountParams} />
      }
      { accountParams !== null &&
        <Setup disconnectAccount={ async () => { await disconnectAccount() }} />
      }
    </Fragment>
  );
}