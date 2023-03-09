/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import styled from 'styled-components'
import { back } from '../atoms'
import BackButton from '../components/BackButton'
import { Failed, Loading, LoadingError } from '../components/Loaders'
import { fetchCoinDetails } from '../queryFunctions'
import { ICoinDetail } from './ICoin'
import Chart from './sub-routes/Chart'
import Price from './sub-routes/Price'

const Heading = styled.h1`
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
  margin-left: 35px;
`

interface INavTab {
  isActive: boolean
}
const NavTab = styled.button<INavTab>`
  padding: 10px 115px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.btn.secondary};
  color: ${({ theme, isActive }) => isActive && theme.accent} !important;
  border: none;
  cursor: pointer;
`

function Coin() {
  const { id } = useParams()
  const state = useLocation()

  const isPriceRoute = state.pathname === `/${id}/price`
  const isChartRoute = state.pathname === `/${id}/chart`

  const setPath = useSetRecoilState(back)
  setPath(`/`)


  const {
    isLoading,
    isLoadingError,
    error: failed,
    data: coinDetails,
  } = useQuery<ICoinDetail>(['Coin:', id], () => fetchCoinDetails(id!))

  return (
    <>
      <BackButton />
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : isLoadingError ? (
        <LoadingError>An error occured while loading the data</LoadingError>
      ) : failed ? (
        <Failed>Request Failed</Failed>
      ) : (
        <>
          {coinDetails?.info[0].name && (
            <Heading>{coinDetails.info[0].name}</Heading>
          )}
          <CoinLogo src={coinDetails?.info[0].image} />
          <CoinSummary>
            <CoinRank>
              RANK:
              <br />
              <br />
              {coinDetails?.info[0].market_cap_rank}
            </CoinRank>
            <CoinSymbol>
              SYMBOL:
              <br />
              <br />
              {coinDetails?.info[0].symbol}
            </CoinSymbol>
            <CoinPrice>
              <b>STOCK PRICE:</b>
              <br />
              <br />${coinDetails?.info[0].current_price}
            </CoinPrice>
          </CoinSummary>
          <CoinDescription>
            <i>{coinDetails?.price.description.bg}</i>
          </CoinDescription>
          <br />
          <MarketInformation>
            <CoinTotalSupply>
              <b>Total Supply:</b>
              <br />
              <br />${coinDetails?.info[0].total_supply.toFixed(2)}
            </CoinTotalSupply>
            <CoinMaxSupply>
              <b>Max Supply:</b>
              <br />
              <br />${coinDetails?.info[0].max_supply || '0'}
            </CoinMaxSupply>
          </MarketInformation>

          <NavTabHolder>
            <Link to={`/${id}/chart`}>
              <NavTab isActive={isChartRoute}>CHART</NavTab>
            </Link>
            <Link to={`/${id}/price`}>
              <NavTab isActive={isPriceRoute}>PRICE</NavTab>
            </Link>
          </NavTabHolder>
          <br />
          <br />
          <br />
          {coinDetails && isChartRoute && (
            <Chart
              isLoading={isLoading}
              isLoadingError={isLoadingError}
              failed={failed}
              data={coinDetails.ohlv}
              id={id}
            />
          )}
          {coinDetails && isPriceRoute && (
            <Price
              isLoading={isLoading}
              isLoadingError={isLoadingError}
              failed={failed}
              priceData={coinDetails.price}
              id={id}
            />
          )}
        </>
      )}
    </>
  )
}
export default Coin
