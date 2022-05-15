type CryptoAssetLink = {
  name: string
  link: string
}

export type CryptoAssetProfile = {
  general: {
    overview: {
      is_verified: boolean
      tagline: string
      category: string
      sector: string
      tags: string
      project_details: string
      official_links: CryptoAssetLink[]
    }
  }
  technology: {
    overview: {
      technology_details: string
      client_repositories: (CryptoAssetLink & {license_type: string})[]
    }
  }
  governance: {
    overview: {
      governance_details: string
    }
  }
}

type CryptoAssetOHLVC = {
  open: number
  high: number
  low: number
  close: number
  volume: number
}

type CryptoAssetMarketData = {
  price_usd: number
  price_btc: number
  volume_last_24_hours: number
  real_volume_last_24_hours: number
  volume_last_24_hours_overstatement_multiple: number
  percent_change_usd_last_24_hours: number
  percent_change_btc_last_24_hours: number
  ohlcv_last_1_hour: CryptoAssetOHLVC
  ohlcv_last_24_hour: CryptoAssetOHLVC
}

type CryptoCommon = {
  id: string
  symbol: string
  name: string
  slug: string
}

export type CryptoAssetMetrics = CryptoCommon & {
  market_data: CryptoAssetMarketData
  marketcap: {
    rank: number
    marketcap_dominance_percent: number
    current_marketcap_usd: number
    y_2050_marketcap_usd: number
    y_plus10_marketcap_usd: number
    liquid_marketcap_usd: number
    volume_turnover_last_24_hours_percent: number
    realized_marketcap_usd: number
    outstanding_marketcap_usd: number
  }
  supply: {
    y_2050: number
    y_2050_percent_issued: number
    supply_yplus_10: number
    y_plus10_issued_percent: number
    liquid: number
    circulating: number
    stock_to_flow: number
  }
  blockchain_stats_24_hours: {
    transaction_volume: number
    nvt: number
    sum_of_fees: number
    median_tx_value: number
    median_tx_fee: number
    count_of_active_addresses: number
    count_of_tx: number
    count_of_payments: number
    new_issuance: number
    average_difficulty: number
    kilobytes_added: number
    count_of_blocks_added: number
  }
  all_time_high: {
    price: number
    at: string
    days_since: number
    percent_down: number
  }
  roi_data: {
    percent_change_last_1_week: number
    percent_change_last_1_month: number
    percent_change_last_3_months: number
    percent_change_last_1_year: number
  }
}

export type CryptoAsset = CryptoCommon & {
  profile: CryptoAssetProfile
  metrics: CryptoAssetMetrics
}
