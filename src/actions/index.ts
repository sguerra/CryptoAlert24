import type {Dispatch} from 'redux'

import Assets from '../services/assets'
import type {CryptoAsset} from '../services/types'
import {
  getAllAssets,
  getAssetDetail,
  addWatchingAsset,
  removeWatchingAsset,
  setAlerts,
  initWatchingAssets,
} from '../reducers/globalReducer'
import utils from '../components/utils'
import {LocalStorage} from '../services/storage'
import {Alert} from 'react-native'
import {Config} from '../services/config'

const assetsService = new Assets()

export type getAllAssetsProps = {
  assets: CryptoAsset[]
  page: number
}

export const getAllAssetsAsync = (nextPage: number = 1) => {
  return async (dispatch: Dispatch) => {
    try {
      const pagesArray = Array.from(new Array(nextPage).keys())

      const responses = await Promise.all(
        pagesArray.map(index => assetsService.getAll(index + 1)),
      )

      const assets = responses
        .map(({data}) => data)
        .reduce((prev, current) => prev.concat(current), [])

      dispatch(
        getAllAssets({
          assets: assets,
          page: nextPage,
        } as getAllAssetsProps),
      )
    } catch (errorMessage: unknown) {
      Alert.alert(errorMessage as string)
    }
  }
}

export type getAssetDetailProps = {
  asset: CryptoAsset
}

export const getAssetDetailAsync = (assetId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const {data: assetProfile} = await assetsService.getProfile(assetId)
      const {data: metrics} = await assetsService.getMetrics(assetId)
      const {data: prices} = await assetsService.getPriceHistory(assetId)

      const asset = {
        ...assetProfile,
        metrics: metrics,
        prices: prices,
      } as CryptoAsset

      dispatch(
        getAssetDetail({
          asset: asset,
        } as getAssetDetailProps),
      )
    } catch (err) {}
  }
}

export type initWatchingAssetsProps = {
  watching: string[]
}

export const initWatchingAssetsAsync = () => {
  return async (dispatch: Dispatch) => {
    const watching = await LocalStorage.get('@watching')
    dispatch(
      initWatchingAssets({
        watching: watching || [],
      } as initWatchingAssetsProps),
    )
  }
}

export type setWatchingAssetProps = {
  assetId: string
}

export const addWatchingAssetAsync = (assetId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(
      addWatchingAsset({
        assetId: assetId,
      } as setWatchingAssetProps),
    )
  }
}

export const removeWatchingAssetAsync = (assetId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(
      removeWatchingAsset({
        assetId: assetId,
      } as setWatchingAssetProps),
    )
  }
}

export type getAlertsProps = {
  alerts: string[]
}

export const getAlertsAsync = (assetIds: string[]) => {
  return async (dispatch: Dispatch) => {
    try {
      const responses = await Promise.all(
        assetIds.map(assetId =>
          assetsService.getLast24HrsPercentChange(assetId),
        ),
      )

      const assetMetricsList = responses.map(({data}) => data)

      const alerts = assetMetricsList
        .filter(assetMetrics => {
          return (
            Math.abs(
              assetMetrics.market_data.percent_change_usd_last_24_hours,
            ) >= Config.APP_PRICE_THRESHOLD
          )
        })
        .map(assetMetrics => {
          return `${assetMetrics.symbol}: ${utils.formatPercent(
            assetMetrics.market_data.percent_change_usd_last_24_hours,
          )}`
        })

      dispatch(
        setAlerts({
          alerts: alerts,
        } as getAlertsProps),
      )
    } catch (err) {}
  }
}
