import Config from 'react-native-config'
import get_all_assets_page_1 from '../mocks/get_all_assets_page_1.json'
import get_all_assets_page_2 from '../mocks/get_all_assets_page_2.json'
import get_all_assets_page_3 from '../mocks/get_all_assets_page_3.json'
import get_all_assets_not_found from '../mocks/get_all_assets_not_found.json'
import get_asset_profile from '../mocks/get_asset_profile.json'
import get_asset_metrics from '../mocks/get_asset_metrics.json'
import get_price_history from '../mocks/get_price_history.json'
import type {
  CryptoAssetCollectionResponse,
  CryptoAssetMetricsResponse,
  CryptoAssetPriceTimeseriesResponse,
  CryptoAssetResponse,
} from './types'

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
          `${Config.API_BASE_URI}/v2/assets?limit=50&page=${page}`,
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
      return Promise.resolve(
        get_asset_profile as unknown as CryptoAssetResponse,
      )
    } else if (Config.APP_MODE === 'prod') {
      try {
        const response = await fetch(
          `${Config.API_BASE_URI}/v2/assets/${id}/profile`,
        )
        return response.json()
      } catch (err) {
        return Promise.reject(err)
      }
    } else {
      throw new Error('Invalid Profile')
    }
  }

  async getMetrics(id: string): Promise<CryptoAssetMetricsResponse> {
    if (Config.APP_MODE === 'dev') {
      return Promise.resolve(
        get_asset_metrics as unknown as CryptoAssetMetricsResponse,
      )
    } else if (Config.APP_MODE === 'prod') {
      try {
        const response = await fetch(
          `${Config.API_BASE_URI}/v1/assets/${id}/metrics`,
        )
        return response.json()
      } catch (err) {
        return Promise.reject(err)
      }
    } else {
      throw new Error('Invalid Metrics')
    }
  }

  async getPriceHistory(
    id: string,
  ): Promise<CryptoAssetPriceTimeseriesResponse> {
    if (Config.APP_MODE === 'dev') {
      return Promise.resolve(
        get_price_history as unknown as CryptoAssetPriceTimeseriesResponse,
      )
    } else if (Config.APP_MODE === 'prod') {
      try {
        const response = await fetch(
          `${Config.API_BASE_URI}/v1/assets/${id}/metrics/price/time-series`,
        )
        return response.json()
      } catch (err) {
        return Promise.reject(err)
      }
    } else {
      throw new Error('Invalid Price History')
    }
  }
}
