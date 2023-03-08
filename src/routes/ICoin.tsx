//Coin Info
export interface ICoinInfo {
  current_price: number
  id: string
  image: string
  market_cap_rank: number
  max_supply: number
  name: string
  symbol: string
  total_supply: number
  total_volume: number
}

//Coin Price
type ITickers = {
  base: string
  last_fetch_at: string
  last_traded_at: string
  market: {
    name: string
    identifier: string
  }
  target: string
  target_coin_id: string
  timestamp: string
  trade_url: string
}
type IUSD = {
  usd: number | string
}
export interface ICoinPrice {
  links: {}
  description: {
    bg: string
  }
  market_data: {
    ath: IUSD
    ath_change_percentage: IUSD
    ath_date: {
      usd: string
    }
    atl: IUSD
    atl_change_percentage: IUSD
    atl_date: {
      usd: string
    }
    circulating_supply: number
    current_price: {
      usd: number
    }
    last_updated: string
    total_supply: number
    total_volume: number
    price_change_24h: number
    price_change_percentage_24h: number
    price_change_percentage_7d_in_currency: {
      usd: number
    }
    price_change_percentage_30d_in_currency: {
      usd: number
    }
    price_change_percentage_1y_in_currency: {
      usd: number
    }
  }
  tickers: ITickers[]
  name: string
}

//Coin History(ohlvc)
type IOhlv = number[]
export interface ICoinDetail {
  info: ICoinInfo[]
  price: ICoinPrice
  ohlv: IOhlv[]
}
