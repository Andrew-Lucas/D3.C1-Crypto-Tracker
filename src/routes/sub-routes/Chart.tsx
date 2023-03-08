/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import ApexCharts from 'react-apexcharts'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import styled from 'styled-components'
import { back, isDarkMode } from '../../atoms'
import BackButton from '../../components/BackButton'
import { Failed, Loading, LoadingError } from '../../components/Loaders'
import { ISubRouteProps } from './ISubRoutes'

const ChartHeading = styled.h1`
  font-size: 35px;
  font-weight: 600;
  margin-bottom: 15px;
`

function Chart({
  data,
  isLoading,
  isLoadingError,
  failed,
  id,
}: ISubRouteProps) {
  const isDark = useRecoilValue(isDarkMode)
  let ohlcvData
  if (data) {
    ohlcvData = data.map((i) => {
      return {
        x: i[0],
        y: [i[1], i[2], i[3], i[4]],
      }
    })
  }

  const setPath = useSetRecoilState(back)
  useEffect(() => {
    setPath(`/${id}`)
  }, [])

  return (
    <>
      <BackButton />
      <ChartHeading>Chart</ChartHeading>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : isLoadingError ? (
        <LoadingError>An error occured while loading the chart</LoadingError>
      ) : failed ? (
        <Failed>Request Failed</Failed>
      ) : (
        <>
          {ohlcvData && (
            <ApexCharts
              height="400px"
              width="550px"
              type="candlestick"
              series={[
                {
                  data: ohlcvData.map((ohlv) => {
                    return {
                      x: ohlv.x,
                      y: ohlv.y,
                    }
                  }),
                },
              ]}
              options={{
                chart: {
                  type: 'candlestick',
                  height: 400,
                },
                theme: { mode: isDark ? 'dark' : 'light' },
                title: {
                  text: 'CandleStick Chart',
                  align: 'left',
                },
                xaxis: {
                  type: 'datetime',
                },
                yaxis: {
                  tooltip: {
                    enabled: false,
                  },
                },
              }}></ApexCharts>
          )}
        </>
      )}
    </>
  )
}

export default Chart
