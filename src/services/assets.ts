import {Config} from '../services/config'
import get_all_assets_pages from '../mocks/get_all_assets_pages.json'
import get_all_assets_not_found from '../mocks/get_all_assets_not_found.json'
import get_asset_profile from '../mocks/get_asset_profile.json'
import get_asset_metrics from '../mocks/get_asset_metrics.json'
import get_price_history from '../mocks/get_price_history.json'
import type {
  CryptoAssetCollectionResponse,
  CryptoAssetErrorResponse,
  CryptoAssetMetricsResponse,
  CryptoAssetPriceTimeseriesResponse,
  CryptoAssetResponse,
  CryptoErrorStatus,
} from './types'
import Utils from '../components/utils'

/**
 * API call wrapper
 * @param uri - URI starting with: /<something>
 */
async function makeAPIRequest(uri: string) {
  let options = {}

  if (Config.API_KEY) {
    options = {
      headers: {
        'x-messari-api-key': Config.API_KEY,
      },
    }
  }

  return fetch(`${Config.API_BASE_URI}${uri}`, options)
}

export default class Assets {
  async getAll(page: number = 1): Promise<CryptoAssetCollectionResponse> {
    if (Config.APP_MODE === 'dev') {
      let assetsPageMock = null

      if (page <= 3) {
        assetsPageMock = {...get_all_assets_pages}
        assetsPageMock.data = assetsPageMock.data.filter((asset, index) => {
          const isAssetInCurrentPage =
            index >= (page - 1) * 20 && index < page * 20
          return asset && isAssetInCurrentPage
        })
      } else {
        return Promise.reject(
          (get_all_assets_not_found as CryptoAssetErrorResponse).status
            .error_message,
        )
      }

      return Promise.resolve(
        assetsPageMock as unknown as CryptoAssetCollectionResponse,
      )
    } else if (Config.APP_MODE === 'prod') {
      try {
        const response = await makeAPIRequest(
          `/v2/assets?limit=100&page=${page}`,
        )

        const jsonResponse = await response.json()

        if (response.status !== 200) {
          return Promise.reject(
            (jsonResponse as CryptoErrorStatus).error_message,
          )
        }

        return jsonResponse
      } catch (errorMessage: unknown) {
        return Promise.reject(errorMessage as string)
      }
    } else {
      return Promise.reject('APP_MODE is not configured in .env file')
    }
  }

  async getProfile(id: string): Promise<CryptoAssetResponse> {
    if (Config.APP_MODE === 'dev') {
      return Promise.resolve(
        get_asset_profile as unknown as CryptoAssetResponse,
      )
    } else if (Config.APP_MODE === 'prod') {
      try {
        const response = await makeAPIRequest(`/v2/assets/${id}/profile`)
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
        const response = await makeAPIRequest(`/v1/assets/${id}/metrics`)
        return response.json()
      } catch (err) {
        return Promise.reject(err)
      }
    } else {
      throw new Error('Invalid Metrics')
    }
  }

  async getLast24HrsPercentChange(
    id: string,
  ): Promise<CryptoAssetMetricsResponse> {
    if (Config.APP_MODE === 'dev') {
      return Promise.resolve(
        get_asset_metrics as unknown as CryptoAssetMetricsResponse,
      )
    } else if (Config.APP_MODE === 'prod') {
      try {
        const response = await makeAPIRequest(
          `/v1/assets/${id}/metrics?fields=symbol,market_data/percent_change_usd_last_24_hours`,
        )
        return response.json()
      } catch (err) {
        return Promise.reject(err)
      }
    } else {
      throw new Error('Invalid Metrics Percent Change')
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
        const start = Utils.getLast24HrsDate().toISOString()
        const response = await makeAPIRequest(
          `/v1/assets/${id}/metrics/price/time-series?start=${start}`,
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
