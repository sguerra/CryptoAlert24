import React from 'react'
import type {FunctionComponent} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {CryptoAssets} from './CryptoAssets'
import {CryptoDetails} from './CryptoDetails'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import type {NativeStackNavigationOptions} from '@react-navigation/native-stack'

import {useAlerts} from './hooks'
import {Colors, Translations} from '../constants'

const Stack = createNativeStackNavigator()

export const CryptoAlerts: FunctionComponent = ({}) => {
  useAlerts()

  const screenOptions: NativeStackNavigationOptions = {
    headerStyle: {
      backgroundColor: Colors.App.background,
    },
    headerTitleStyle: {
      color: 'white',
      fontWeight: 'bold',
    },
    headerTitle: Translations.appTitle,
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Assets"
          screenOptions={screenOptions}>
          <Stack.Screen name="Assets" component={CryptoAssets} />
          <Stack.Screen name="Details" component={CryptoDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
