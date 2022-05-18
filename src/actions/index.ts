import type {Dispatch} from 'redux'

import Assets from '../services/assets'
import type {CryptoAsset} from '../services/types'
import {getAllAssets, getAssetDetail} from '../reducers/globalReducer'

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

      const asset = {
        ...assetProfile,
        metrics: metrics,
      } as CryptoAsset

      dispatch(
        getAssetDetail({
          asset: asset,
        } as getAssetDetailProps),
      )
    } catch (err) {}
  }
}
