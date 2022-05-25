import DeviceInfo from 'react-native-device-info'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import {Alert} from 'react-native'

type NotificationPermissionsType = {
  alert: boolean
  badge: boolean
  sound: boolean
}

let notificationPermissions: NotificationPermissionsType = {
  alert: false,
  badge: false,
  sound: false,
}

PushNotificationIOS.requestPermissions().then(permissions => {
  notificationPermissions = {
    alert: permissions.alert || false,
    badge: permissions.badge || false,
    sound: permissions.sound || false,
  }
})

type NotificationType = {
  id: string
  title: string
  body: string
}

const pushDeviceNotification = (notification: NotificationType) => {
  PushNotificationIOS.addNotificationRequest(notification)
}

const pushEmulatorNotification = (notification: NotificationType) => {
  Alert.alert(notification.title, notification.body)
}

export const Notifications = {
  pushNotification: async (notification: NotificationType) => {
    const isEmulator = await DeviceInfo.isEmulator()

    if (isEmulator || !notificationPermissions.alert) {
      pushEmulatorNotification(notification)
    } else {
      pushDeviceNotification(notification)
    }
  },
  getPemissions: () => {
    return notificationPermissions
  },
}
