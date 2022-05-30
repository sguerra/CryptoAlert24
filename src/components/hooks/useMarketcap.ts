import type {CryptoAsset, CryptoAssetMarketcap} from '../../services/types'

export const useMarketcap = (asset: CryptoAsset): CryptoAssetMarketcap => {
  const {marketcap} = asset.metrics

  return marketcap
}
