import {CaseReducer, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {getAllAssetsProps} from '../actions'
import {CryptoAsset} from '../services/types'

export type GlobalState = {
  page: number
  assets: CryptoAsset[]
  selectedAsset: null | CryptoAsset
}

const initialState: GlobalState = {
  page: 1,
  assets: [],
  selectedAsset: null,
}

const getAllAssetsDef: CaseReducer<
  GlobalState,
  PayloadAction<{
    assets: CryptoAsset[]
    page: number
  }>
> = (state, {payload}) => {
  const {assets, page} = payload as getAllAssetsProps

  if (page === 1) {
    state.assets = assets
  } else {
    state.assets = state.assets.concat(assets)
  }

  state.page = page
}

export const globalSlice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    getAllAssets: getAllAssetsDef,
  },
})

export const {getAllAssets} = globalSlice.actions

export const selectAllAssets = (state: GlobalState) => state.assets
export const selectPage = (state: GlobalState) => state.page

export default globalSlice.reducer
