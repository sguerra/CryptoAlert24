import {useMemo} from 'react'
import {Colors} from '../../constants'
import type {CryptoAsset} from '../../services/types'

export function useAssetChartDetails(asset: CryptoAsset) {
  const {prices, metrics} = asset

  const values = prices?.values || []
  const {market_data, marketcap} = metrics

  const chartValues = values.map(value => value[1])
  const chartDates = values.map(value => value[0])

  const {ohlcv_last_24_hour} = market_data
  const {open, high, low, close, volume} = ohlcv_last_24_hour || {
    open: 0,
    high: 0,
    low: 0,
    close: 0,
    volume: 0,
  }

  const {current_marketcap_usd} = marketcap

  const strokeColor =
    market_data.percent_change_usd_last_24_hours >= 0
      ? Colors.PriceDelta.INC
      : Colors.PriceDelta.DEC

  const chartSvg = useMemo(() => {
    return {
      stroke: strokeColor,
      strokeWidth: 2,
      fill: strokeColor,
      fillOpacity: 0.25,
    }
  }, [strokeColor])

  const gridSvg = {
    stroke: '#333',
    strokeWidth: 1,
  }

  return {
    chartValues,
    chartDates,
    open,
    high,
    low,
    close,
    volume,
    current_marketcap_usd,
    chartSvg,
    gridSvg,
  }
}
