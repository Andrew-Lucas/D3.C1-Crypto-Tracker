/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import styled from 'styled-components'
import { back } from '../../atoms'
import BackButton from '../../components/BackButton'
import { Failed, Loading, LoadingError } from '../../components/Loaders'
import { ISubRouteProps } from './ISubRoutes'

const PriceHeading = styled.h1`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 35px;
  text-decoration: underline !important;
`

const AthHeading = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 7px;
`
const AllTimeHighest = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`
const AthDate = styled.span``
const AthValue = styled.span``

const AtlHeading = styled(AthHeading)``
const AllTimeLowest = styled(AllTimeHighest)``
const AtlDate = styled.span``
const AtlValue = styled.span``

const Last24HrStats = styled(AllTimeHighest)`
  border-bottom: solid 1px ${({ theme }) => theme.textColor};
  padding-bottom: 10px;
`
const TodayOpeningValue = styled.div`
  display: flex;
  flex-direction: column;
  span {
    font-weight: 600;
    margin-bottom: 5px;
  }
`
const TodayChange = styled(TodayOpeningValue)`
  align-items: flex-end !important;
  justify-content: start;
`

const WeeklyChange = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  span {
    font-weight: 600;
  }
`

const MonthlyChange = styled(WeeklyChange)``

const AnnualChange = styled(WeeklyChange)``

function Price({
  isLoading,
  isLoadingError,
  failed,
  priceData,
  id
}: ISubRouteProps) {
  let OPENING_VALUE
  let MARKET_DATA
  if (priceData) {
    MARKET_DATA = priceData.market_data
    OPENING_VALUE = (
      MARKET_DATA.current_price.usd - MARKET_DATA.price_change_24h
    ).toFixed(2)
  }

    const setPath = useSetRecoilState(back)
  useEffect(() => {
    setPath(`/${id}`)
  }, [])

  return (
    <>
      <BackButton />
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : isLoadingError ? (
        <LoadingError>An error occured while loading the chart</LoadingError>
      ) : failed ? (
        <Failed>Request Failed</Failed>
      ) : (
        <>
          <PriceHeading>{priceData?.name} Price & Market Stats</PriceHeading>
          <AthHeading>All Time Highest</AthHeading>
          <AllTimeHighest>
            <AthDate>Date: {MARKET_DATA?.ath_date.usd.split('T')[0]}</AthDate>
            <AthValue>Value: ${MARKET_DATA?.ath.usd}</AthValue>
          </AllTimeHighest>

          <AtlHeading>All Time Lowest</AtlHeading>
          <AllTimeLowest>
            <AtlDate>Date: {MARKET_DATA?.atl_date.usd.split('T')[0]}</AtlDate>
            <AtlValue>Value: {MARKET_DATA?.atl.usd}</AtlValue>
          </AllTimeLowest>

          <Last24HrStats>
            <TodayOpeningValue>
              <span>24HR's Opening Value:</span>${OPENING_VALUE}
            </TodayOpeningValue>

            <TodayChange>
              <span>24HR's Change:</span>$
              {priceData?.market_data.price_change_24h.toFixed(2)}
            </TodayChange>
          </Last24HrStats>

          <WeeklyChange>
            <span>Weekly Percentage Change to dollars:</span>
            {MARKET_DATA?.price_change_percentage_7d_in_currency.usd.toFixed(2)}
            %
          </WeeklyChange>

          <MonthlyChange>
            <span>Monthly Percentage Change to dollars:</span>
            {MARKET_DATA?.price_change_percentage_30d_in_currency.usd.toFixed(
              2
            )}
            %
          </MonthlyChange>

          <AnnualChange>
            <span>Annual Percentage Change to dollars:</span>
            {MARKET_DATA?.price_change_percentage_1y_in_currency.usd.toFixed(2)}
            %
          </AnnualChange>
        </>
      )}
    </>
  )
}

export default Price
