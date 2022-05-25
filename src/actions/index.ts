import type {Dispatch} from 'redux'

import Assets from '../services/assets'
import type {CryptoAsset, CryptoAssetMarketData} from '../services/types'
import {
  getAllAssets,
  getAssetDetail,
  addWatchingAsset,
  removeWatchingAsset,
  setAlerts,
} from '../reducers/globalReducer'
import utils from '../components/utils'

const assetsService = new Assets()

export type getAllAssetsProps = {
  assets: CryptoAsset[]
  page: number
}

export const getAllAssetsAsync = (nextPage: number = 1) => {
  return async (dispatch: Dispatch) => {
    try {
      const {data} = await assetsService.getAll(nextPage)
      dispatch(
        getAllAssets({
          assets: data as CryptoAsset[],
          page: nextPage,
        } as getAllAssetsProps),
      )
    } catch (err) {}
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

      const alerts = responses
        .map(({data}) => data)
        .filter(assetMetrics => {
          return (
            Math.abs(
              assetMetrics.market_data.percent_change_usd_last_24_hours,
            ) >= 5
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
