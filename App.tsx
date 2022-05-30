/**
 * CryptoAlert24
 * https://github.com/sguerra/CryptoTracker
 *
 * @format
 */

import React from 'react'
import {Provider} from 'react-redux'

import {globalStore} from './src/reducers/globalStore'
import {CryptoAlerts} from './src/views/CryptoAlerts'

const App = () => {
  return (
    <Provider store={globalStore}>
      <CryptoAlerts />
    </Provider>
  )
}

export default App
