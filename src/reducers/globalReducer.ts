import {CaseReducer, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {
  getAlertsProps,
  getAllAssetsProps,
  getAssetDetailProps,
  initWatchingAssetsProps,
  setWatchingAssetProps,
} from '../actions'
import {LocalStorage} from '../services/storage'
import {CryptoAsset} from '../services/types'

export type GlobalState = {
  page: number
  assets: CryptoAsset[]
  asset: CryptoAsset | null
  watching: string[]
  alerts: string[]
}

const initialState: GlobalState = {
  page: 1,
  assets: [],
  asset: null,
  watching: [],
  alerts: [],
}

const getAllAssetsDef: CaseReducer<
  GlobalState,
  PayloadAction<getAllAssetsProps>
> = (state, {payload}) => {
  const {assets, page} = payload as getAllAssetsProps
  state.assets = assets
  state.page = page
}

const getAssetDetailDef: CaseReducer<
  GlobalState,
  PayloadAction<getAssetDetailProps>
> = (state, {payload}) => {
  const {asset} = payload as getAssetDetailProps
  state.asset = asset
  state.assets = state.assets.map(assetItem => {
    if (assetItem.id === asset.id) {
      return asset
    }
    return assetItem
  })
}

const initWatchingAssetsDef: CaseReducer<
  GlobalState,
  PayloadAction<initWatchingAssetsProps>
> = (state, {payload}) => {
  state.watching = payload.watching
}

const addWatchingAssetDef: CaseReducer<
  GlobalState,
  PayloadAction<setWatchingAssetProps>
> = (state, {payload}) => {
  state.watching.push(payload.assetId)
  LocalStorage.set('@watching', state.watching)
}
const removeWatchingAssetDef: CaseReducer<
  GlobalState,
  PayloadAction<setWatchingAssetProps>
> = (state, {payload}) => {
  state.watching = state.watching.filter(assetId => assetId !== payload.assetId)
  LocalStorage.set('@watching', state.watching)
}

const setAlertsDef: CaseReducer<GlobalState, PayloadAction<getAlertsProps>> = (
  state,
  {payload},
) => {
  const {alerts} = payload as getAlertsProps
  state.alerts = alerts
}

export const globalSlice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    getAllAssets: getAllAssetsDef,
    getAssetDetail: getAssetDetailDef,
    initWatchingAssets: initWatchingAssetsDef,
    addWatchingAsset: addWatchingAssetDef,
    removeWatchingAsset: removeWatchingAssetDef,
    setAlerts: setAlertsDef,
  },
})

export const {
  getAllAssets,
  getAssetDetail,
  initWatchingAssets,
  addWatchingAsset,
  removeWatchingAsset,
  setAlerts,
} = globalSlice.actions

export const selectAllAssets = (state: GlobalState) => state.assets
export const selectPage = (state: GlobalState) => state.page
export const selectAsset = (state: GlobalState) => state.asset
export const selectWatchingAssets = (state: GlobalState) =>
  state.watching.reduce((previousValue, nextValue) => {
    previousValue.set(nextValue, nextValue)
    return previousValue
  }, new Map())
export const selectAlerts = (state: GlobalState) => state.alerts

export default globalSlice.reducer
