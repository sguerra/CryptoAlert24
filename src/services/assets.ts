import Config from 'react-native-config'
import get_all_assets_page_1 from '../mocks/get_all_assets_page_1.json'
import get_all_assets_page_2 from '../mocks/get_all_assets_page_2.json'
import get_all_assets_page_3 from '../mocks/get_all_assets_page_3.json'
import get_all_assets_not_found from '../mocks/get_all_assets_not_found.json'
import get_asset_profile_1 from '../mocks/get_asset_profile_1.json'
import get_asset_profile_2 from '../mocks/get_asset_profile_2.json'
import get_asset_profile_3 from '../mocks/get_asset_profile_3.json'

const DEV_ASSET_PROFILES = [
  get_asset_profile_1,
  get_asset_profile_2,
  get_asset_profile_3,
]

export default class Assets {
  async getAll(page: number = 1) {
    if (Config.APP_MODE === 'dev') {
      if (page === 1) {
        return Promise.resolve(get_all_assets_page_1)
      } else if (page === 2) {
        return Promise.resolve(get_all_assets_page_2)
      } else if (page === 3) {
        return Promise.resolve(get_all_assets_page_3)
      } else {
        return Promise.reject(get_all_assets_not_found)
      }
    } else if (Config.APP_MODE === 'prod') {
      try {
        const response = await fetch(
          `${Config.API_BASE_URI}/assets?page=${page}`,
        )
        return response.json()
      } catch (err) {
        return Promise.reject(err)
      }
    } else {
      return Promise.resolve([])
    }
  }

  async getProfile(id: string) {
    if (Config.APP_MODE === 'dev') {
      const randomAsset = DEV_ASSET_PROFILES[Math.trunc(Math.random() * 3)]

      return Promise.resolve(randomAsset)
    } else if (Config.APP_MODE === 'prod') {
      try {
        const response = await fetch(
          `${Config.API_BASE_URI}/assets/${id}/profile`,
        )
        return response.json()
      } catch (err) {
        return Promise.reject(err)
      }
    } else {
      throw new Error('Invalid Profile')
    }
  }
}
