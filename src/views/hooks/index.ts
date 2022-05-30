import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import type {AppDispatch, RootState} from '../../reducers/globalStore'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export {useAlerts} from './use-alerts'
export {useAssets} from './use-assets'
export {useAssetDetails} from './use-asset-details'
export {useAssetChartDetails} from './use-asset-chart-details'
