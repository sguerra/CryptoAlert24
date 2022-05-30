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
      if (itemValue) {
        return JSON.parse(itemValue)
      } else {
        return null
      }
    } catch (err) {
      return {}
    }
  },
}
