import {CaseReducer, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {getAllAssetsProps, getAssetDetailProps} from '../actions'
import {CryptoAsset} from '../services/types'

export type GlobalState = {
  page: number
  assets: CryptoAsset[]
  asset: CryptoAsset | null
  selectedAsset: null | CryptoAsset
}

const initialState: GlobalState = {
  page: 1,
  assets: [],
  asset: null,
  selectedAsset: null,
}

const getAllAssetsDef: CaseReducer<
  GlobalState,
  PayloadAction<getAllAssetsProps>
> = (state, {payload}) => {
  const {assets, page} = payload as getAllAssetsProps

  if (page === 1) {
    state.assets = assets
  } else {
    state.assets = state.assets.concat(assets)
  }

  state.page = page
}

const getAssetDetailDef: CaseReducer<
  GlobalState,
  PayloadAction<getAssetDetailProps>
> = (state, {payload}) => {
  const {asset} = payload as getAssetDetailProps
  state.asset = asset
}

export const globalSlice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    getAllAssets: getAllAssetsDef,
    getAssetDetail: getAssetDetailDef,
  },
})

export const {getAllAssets, getAssetDetail} = globalSlice.actions

export const selectAllAssets = (state: GlobalState) => state.assets
export const selectPage = (state: GlobalState) => state.page
export const selectAsset = (state: GlobalState) => state.asset

export default globalSlice.reducer
