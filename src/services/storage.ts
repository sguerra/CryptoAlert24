import AsyncStorage from '@react-native-async-storage/async-storage'

export const LocalStorage = {
  set: async (key: string, value: object | object[]) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (err) {}
  },
  get: async (key: string) => {
    try {
      const itemValue = await AsyncStorage.getItem(key)
      return JSON.parse(itemValue || '{}')
    } catch (err) {
      return {}
    }
  },
}
