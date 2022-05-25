import {CaseReducer, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {
  getAlertsProps,
  getAllAssetsProps,
  getAssetDetailProps,
  setWatchingAssetProps,
} from '../actions'
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
}

const addWatchingAssetDef: CaseReducer<
  GlobalState,
  PayloadAction<setWatchingAssetProps>
> = (state, {payload}) => {
  state.watching.push(payload.assetId)
}
const removeWatchingAssetDef: CaseReducer<
  GlobalState,
  PayloadAction<setWatchingAssetProps>
> = (state, {payload}) => {
  state.watching = state.watching.filter(assetId => assetId !== payload.assetId)
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
    addWatchingAsset: addWatchingAssetDef,
    removeWatchingAsset: removeWatchingAssetDef,
    setAlerts: setAlertsDef,
  },
})

export const {
  getAllAssets,
  getAssetDetail,
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
