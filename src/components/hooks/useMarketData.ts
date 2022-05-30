import type {CryptoAsset, CryptoAssetMarketData} from '../../services/types'

export const useMarketData = (
  asset: CryptoAsset,
): CryptoAssetMarketData & {} => {
  const {market_data} = asset.metrics

  return market_data
}
