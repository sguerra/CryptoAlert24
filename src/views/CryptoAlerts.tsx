import React, {useEffect} from 'react'
import type {FunctionComponent} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {CryptoAssets} from './CryptoAssets'
import {CryptoDetails} from './CryptoDetails'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {useDispatch, useSelector} from 'react-redux'
import {selectAlerts, selectWatchingAssets} from '../reducers/globalReducer'
import {Notifications} from '../services/notifications'
import {getAlertsAsync, initWatchingAssetsAsync} from '../actions'
import Config from 'react-native-config'

const Stack = createNativeStackNavigator()

export const CryptoAlerts: FunctionComponent = ({}) => {
  const watchingAssets = useSelector(selectWatchingAssets)
  const alerts = useSelector(selectAlerts)
  const globalDispatch = useDispatch()

  useEffect(() => {
    if (alerts.length === 0) {
      return
    }

    let body = 'Asset variations in the last 24hrs:\n'

    alerts.forEach(alert => {
      body += `${alert}\n`
    })

    Notifications.pushNotification({
      id: 'id',
      title: 'Crypto Alert',
      body: body,
    })
  }, [alerts])

  useEffect(() => {
    if (watchingAssets.size === 0) {
      return
    }

    const watchingAssetsArray = Array.from(watchingAssets.keys())

    let intervalInSeconds = 30

    if (Config.API_REFRESH_RATE) {
      intervalInSeconds = Number(Config.API_REFRESH_RATE)
    }

    const getAlertsInterval = setInterval(() => {
      globalDispatch(getAlertsAsync(watchingAssetsArray))
    }, intervalInSeconds * 1000)

    return () => {
      clearInterval(getAlertsInterval)
    }
  }, [globalDispatch, watchingAssets])

  useEffect(() => {
    globalDispatch(initWatchingAssetsAsync())
  }, [globalDispatch])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Assets" component={CryptoAssets} />
        <Stack.Screen name="Details" component={CryptoDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
