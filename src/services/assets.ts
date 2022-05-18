import Config from 'react-native-config'
import get_all_assets_page_1 from '../mocks/get_all_assets_page_1.json'
import get_all_assets_page_2 from '../mocks/get_all_assets_page_2.json'
import get_all_assets_page_3 from '../mocks/get_all_assets_page_3.json'
import get_all_assets_not_found from '../mocks/get_all_assets_not_found.json'
import get_asset_profile_1 from '../mocks/get_asset_profile_1.json'
import get_asset_profile_2 from '../mocks/get_asset_profile_2.json'
import get_asset_profile_3 from '../mocks/get_asset_profile_3.json'
import type {CryptoAssetCollectionResponse, CryptoAssetResponse} from './types'

const DEV_ASSET_PROFILES = [
  get_asset_profile_1,
  get_asset_profile_2,
  get_asset_profile_3,
]

export default class Assets {
  async getAll(page: number = 1): Promise<CryptoAssetCollectionResponse> {
    if (Config.APP_MODE === 'dev') {
      let assetsPageMock = null

      if (page === 1) {
        assetsPageMock = get_all_assets_page_1
      } else if (page === 2) {
        assetsPageMock = get_all_assets_page_2
      } else if (page === 3) {
        assetsPageMock = get_all_assets_page_3
      } else {
        return Promise.reject(get_all_assets_not_found)
      }

      return Promise.resolve(
        assetsPageMock as unknown as CryptoAssetCollectionResponse,
      )
    } else if (Config.APP_MODE === 'prod') {
      try {
        const response = await fetch(
          `${Config.API_BASE_URI}/assets?limit=100&page=${page}`,
        )
        return response.json()
      } catch (err) {
        return Promise.reject(err)
      }
    } else {
      throw new Error('APP_MODE is not configured in .env file')
    }
  }

  async getProfile(id: string): Promise<CryptoAssetResponse> {
    if (Config.APP_MODE === 'dev') {
      const randomAsset =
        DEV_ASSET_PROFILES[0] as unknown as CryptoAssetResponse

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
