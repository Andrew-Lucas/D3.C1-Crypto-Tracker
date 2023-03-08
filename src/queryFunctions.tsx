export async function fetchCoins() {
  const coinsResponse = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
  )
  const coinsJson = coinsResponse.json()
  return coinsJson
}

export async function fetchCoinDetails(id: string) {
  //info
  const coinInfoResponse =
    await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}&order=market_cap_desc&per_page=1&page=1&sparkline=false
  `)
  const coinInfoJson = await coinInfoResponse.json()

  //price
  const coinPriceResponse = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}`
  )
  const coinPriceJson = await coinPriceResponse.json()

  //ohlv
  const ohlvJson = await (
    await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=usd&days=7`
    )
  ).json()
  return { info: coinInfoJson, price: coinPriceJson, ohlv: ohlvJson }
}
