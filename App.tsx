/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react'
import {StatusBar} from 'react-native'
import {Provider} from 'react-redux'

import {globalStore} from './src/reducers/globalStore'
import {CryptoAlerts} from './src/views/CryptoAlerts'

const App = () => {
  return (
    <Provider store={globalStore}>
      <StatusBar barStyle={'dark-content'} />
      <CryptoAlerts />
    </Provider>
  )
}

export default App
