import {Alert} from 'react-native'
import RNConfig from 'react-native-config'
import {Translations} from '../constants'

const envVariables = [
  'APP_MODE',
  'APP_PRICE_THRESHOLD',
  'API_BASE_URI',
  'API_IMG_URI',
  'API_KEY',
  'API_REFRESH_RATE',
]

const incompleteEnvFileMessage = envVariables.reduce((message, envVariable) => {
  if (!RNConfig[envVariable]) {
    message += `\n${envVariable}`
  }

  return message
}, '')

if (incompleteEnvFileMessage) {
  Alert.alert(
    Translations.appTitle,
    `Missing variables in .env file:${incompleteEnvFileMessage}`,
  )
}

export const Config = {
  APP_MODE: RNConfig.APP_MODE || 'dev',
  APP_PRICE_THRESHOLD: RNConfig.APP_PRICE_THRESHOLD || 5,
  API_BASE_URI: RNConfig.API_BASE_URI || 'http://localhost:80',
  API_IMG_URI: RNConfig.API_IMG_URI || 'https://messari.io/asset-images',
  API_KEY: RNConfig.API_KEY || null,
  API_REFRESH_RATE: Number(RNConfig.API_REFRESH_RATE) || 30,
}
