import {useCallback, useEffect, useMemo} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import type {AnyAction} from 'redux'

import {
  addWatchingAssetAsync,
  getAssetDetailAsync,
  removeWatchingAssetAsync,
} from '../../actions'
import {selectAsset, selectWatchingAssets} from '../../reducers/globalReducer'

export function useAssetDetails(assetId: string) {
  const asset = useSelector(selectAsset)
  const watchingAssets = useSelector(selectWatchingAssets)

  const globalDispatch = useDispatch()

  const isAssetSelected = useMemo(() => {
    return watchingAssets.has(assetId)
  }, [watchingAssets, assetId])

  const onActionPressedHandler = useCallback(
    (pressedAssetId: string) => {
      if (isAssetSelected) {
        globalDispatch(
          removeWatchingAssetAsync(pressedAssetId) as unknown as AnyAction,
        )
      } else {
        globalDispatch(
          addWatchingAssetAsync(pressedAssetId) as unknown as AnyAction,
        )
      }
    },
    [isAssetSelected, globalDispatch],
  )

  useEffect(() => {
    globalDispatch(getAssetDetailAsync(assetId) as unknown as AnyAction)
  }, [globalDispatch, assetId])

  return {
    asset,
    isAssetSelected,
    onActionPressedHandler,
  }
}
