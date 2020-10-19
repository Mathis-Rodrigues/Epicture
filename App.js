import React, { Fragment } from 'react'

import Setup from './Components/Setup'
import AuthPage from './Components/Oauth/AuthPage'


export default function App() {
    return(
      <Fragment>
        <AuthPage />
        {/* <Setup /> */}
      </Fragment>
    );
}