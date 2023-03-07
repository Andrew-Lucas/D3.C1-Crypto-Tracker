import { useQuery } from 'react-query'
import { useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Failed, Loading, LoadingError } from '../components/Loaders'
import { fetchCoinDetails } from '../queryFunctions'

const Heading = styled.span`
  display: flex;
  justify-content: center;
  font-size: 60px;
  color: ${({ theme }) => theme.accent};
  margin-bottom: 25px;
`
const CoinLogo = styled.img`
  height: 70px;
  width: 70px;
  margin-bottom: 35px;
`

const CoinSummary = styled.div`
  background-color: ${({ theme }) => theme.btn.secondary};
  width: 530px;
  padding: 15px;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`
const CoinRank = styled.span`
  text-align: center;
`
const CoinSymbol = styled(CoinRank)``
const CoinPrice = styled(CoinRank)``

const CoinDescription = styled.p`
  width: 530px;
`

const MarketInformation = styled(CoinSummary)``
const CoinMaxSupply = styled(CoinRank)``
const CoinTotalSupply = styled(CoinRank)``

const NavTabHolder = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`

interface INavTab {
  isActive: boolean
}
const NavTab = styled.button<INavTab>`
  padding: 10px 110px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.btn.secondary};
  color: ${({ theme, isActive }) =>
    isActive ? theme.accent : theme.textColor};
  border: none;
  cursor: pointer;
`

interface ICoinInfo {
  ath: number
  ath_change_percentage: number
  ath_date: string
  atl: number
  atl_change_percentage: number
  atl_date: string
  circulating_supply: number
  current_price: number
  id: string
  image: string
  last_updated: string
  market_cap_rank: number
  max_supply: number
  name: string
  price_change_24h: number
  price_change_percentage_24h: number
  symbol: string
  total_supply: number
  total_volume: number
}
interface ITickers {
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
interface ICoinPrice {
  links: {}
  tickers: ITickers[]
}
interface ICoinDetail {
  info: ICoinInfo[]
  price: ICoinPrice
}

/*   let FIXED_PRICE
  if (!isLoading) {
  } */

function Coin() {
  const { id } = useParams()
  console.log(id)
  const state = useLocation()
  console.log(state)

  const {
    isLoading,
    isLoadingError,
    error: failed,
    data: coinDetails,
  } = useQuery<ICoinDetail>(['Coin:', id], () => fetchCoinDetails(id!))
  console.log(coinDetails)

  /*   const priceRoute = state.pathname === ``
  const chartRoute = state.pathname === `` */

  return (
    <>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : isLoadingError ? (
        <LoadingError>An error occured while loading the data</LoadingError>
      ) : failed ? (
        <Failed>Request Failed</Failed>
      ) : (
        <>
          <Heading as="h1">{}</Heading>
          {/* <CoinLogo src={} /> */}
          <CoinSummary>
            <CoinRank>
              RANK:
              <br />
              <br />
              {}
            </CoinRank>
            <CoinSymbol>
              SYMBOL:
              <br />
              <br />
              {}
            </CoinSymbol>
            <CoinPrice>
              <b>STOCK PRICE:</b>
              <br />
              <br />
              {/* FIXED_PRICE */}
            </CoinPrice>
          </CoinSummary>
          <CoinDescription>
            <i>{}</i>
          </CoinDescription>
          <br />
          <MarketInformation>
            <CoinTotalSupply>
              <b>Total Supply:</b>
              <br />
              <br />
              {}
            </CoinTotalSupply>
            <CoinMaxSupply>
              <b>Max Supply:</b>
              <br />
              <br />
              {}
            </CoinMaxSupply>
          </MarketInformation>

          {/*           <NavTabHolder>
            <Link to={}>
              <NavTab isActive={chartRoute}>CHART</NavTab>
            </Link>
            <Link to={}>
              <NavTab isActive={priceRoute}>PRICE</NavTab>
            </Link>
          </NavTabHolder> */}
          <br />
          <br />
          <br />
        </>
      )}
    </>
  )
}
export default Coin
