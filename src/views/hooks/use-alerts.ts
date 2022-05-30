import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {Config} from '../../services/config'
import {getAlertsAsync, initWatchingAssetsAsync} from '../../actions'
import {Translations} from '../../constants'
import {selectAlerts, selectWatchingAssets} from '../../reducers/globalReducer'
import {Notifications} from '../../services/notifications'
import {AnyAction} from 'redux'

export function useAlerts() {
  const watchingAssets = useSelector(selectWatchingAssets)
  const alerts = useSelector(selectAlerts)
  const globalDispatch = useDispatch()

  // Push notification on alerts list update
  useEffect(() => {
    if (alerts.length === 0) {
      return
    }

    let body = Translations.alertBody

    alerts.forEach(alert => {
      body += `${alert}\n`
    })

    Notifications.pushNotification({
      id: `${Math.trunc(Math.random() * 10000)}`,
      title: Translations.appTitle,
      body: body,
    })
  }, [alerts])

  // Update alerts list on time interval
  useEffect(() => {
    if (watchingAssets.size === 0) {
      return
    }

    const watchingAssetsArray = Array.from(watchingAssets.keys())

    const intervalInSeconds = Config.API_REFRESH_RATE * 1000

    const getAlertsInterval = setInterval(() => {
      globalDispatch(
        getAlertsAsync(watchingAssetsArray) as unknown as AnyAction,
      )
    }, intervalInSeconds)

    return () => {
      clearInterval(getAlertsInterval)
    }
  }, [globalDispatch, watchingAssets])

  // Initialize watching alerts
  useEffect(() => {
    globalDispatch(initWatchingAssetsAsync() as unknown as AnyAction)
  }, [globalDispatch])
}
