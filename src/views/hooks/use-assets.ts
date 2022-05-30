import {useDispatch, useSelector} from 'react-redux'
import {
  selectAllAssets,
  selectPage,
  selectWatchingAssets,
} from '../../reducers/globalReducer'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {AnyAction} from 'redux'
import {
  addWatchingAssetAsync,
  getAllAssetsAsync,
  removeWatchingAssetAsync,
} from '../../actions'
import {CryptoFilterEnum} from '../../components/CryptoFilter'
import {CryptoAsset} from '../../services/types'

export function useAssets() {
  const [assetFilter, setAssetFilter] = useState('')
  const [selectedFilter, setSelectedFilter] = useState(CryptoFilterEnum.All)

  const globalDispatch = useDispatch()
  const assets = useSelector(selectAllAssets)
  const page = useSelector(selectPage)
  const watchingAssets = useSelector(selectWatchingAssets)

  // Update filtered assets list on filter change
  const filteredAssets = useMemo(() => {
    const allFilteredAssets = filterAssets(assets, assetFilter)

    if (selectedFilter === CryptoFilterEnum.Watching) {
      return allFilteredAssets.filter(asset => {
        return watchingAssets.has(asset.id)
      })
    }

    return allFilteredAssets
  }, [assets, assetFilter, selectedFilter, watchingAssets])

  // Assets loaded flag
  const areAllAssetsLoaded = useMemo(() => {
    return assets?.length > 0
  }, [assets?.length])

  // Update text filter on search text changed
  const searchTextHandler = useCallback(
    (searchText: string) => {
      setAssetFilter(searchText)
    },
    [setAssetFilter],
  )

  // Update selection filter on tab selection changed
  const onFilterSelectionChangeHandler = useCallback(
    (selectedFilterChanged: CryptoFilterEnum) => {
      setSelectedFilter(selectedFilterChanged)
    },
    [setSelectedFilter],
  )

  // Get more assets action call on end of list reached
  const endOfListReachedHandler = useCallback(() => {
    if (selectedFilter === CryptoFilterEnum.All) {
      setRefreshingList(true)
      globalDispatch(getAllAssetsAsync(page + 1) as unknown as AnyAction)
    }
  }, [globalDispatch, page, selectedFilter])

  // Add asset to watchlist callback
  const itemActionOnAddHandler = useCallback(
    (assetId: string) => {
      globalDispatch(addWatchingAssetAsync(assetId) as unknown as AnyAction)
    },
    [globalDispatch],
  )

  // Remove asset from watchlist callback
  const itemActionOnRemoveHandler = useCallback(
    (assetId: string) => {
      globalDispatch(removeWatchingAssetAsync(assetId) as unknown as AnyAction)
    },
    [globalDispatch],
  )

  // Refreshing state variables
  const [refreshingList, setRefreshingList] = useState(false)

  // Refreshing assets callback
  const onRefreshHandler = useCallback(() => {
    setRefreshingList(true)
    globalDispatch(getAllAssetsAsync() as unknown as AnyAction)
  }, [globalDispatch])

  // Initial asset load
  useEffect(() => {
    onRefreshHandler()
  }, [onRefreshHandler])

  // Set refresh state finished on assets list unchanged
  useEffect(() => {
    setRefreshingList(false)
  }, [assets])

  return {
    selectedFilter,
    filteredAssets,
    refreshingList,
    areAllAssetsLoaded,
    watchingAssets,
    searchTextHandler,
    endOfListReachedHandler,
    onFilterSelectionChangeHandler,
    itemActionOnAddHandler,
    itemActionOnRemoveHandler,
    onRefreshHandler,
  }
}

function filterAssets(assetList: CryptoAsset[], assetFilter: string = '') {
  if (assetFilter === '') {
    return assetList
  }

  const normalizedSearchText = assetFilter.toUpperCase()

  return assetList.filter(asset => {
    const normalizedAssetName = asset.name.toUpperCase()
    const normalizedAssetSymbol = asset.symbol?.toUpperCase()

    return (
      normalizedAssetName.indexOf(normalizedSearchText) >= 0 ||
      normalizedAssetSymbol?.indexOf(normalizedSearchText) >= 0
    )
  })
}
