import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Failed, Loading, LoadingError } from '../components/Loaders'
import { fetchCoins } from '../queryFunctions'

const Heading = styled.h1`
  font-size: 65px;
  text-align: center;
  margin-bottom: 35px;
`


const Coin = styled.div`
  width: 100%;
  height: 75px;
  margin-bottom: 15px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.btn.primary};
  color: ${({ theme }) => theme.btn.secondary};
  font-size: 20px;
  a {
    width: 100%;
    height: 100%;
    padding-left: 20px;
    display: flex;
    align-items: center;
    &:hover {
      color: ${({ theme }) => theme.accent};
    }
  }
`

function CoinsScreen() {
  interface ICoins {
    current_price: number
    id: string
    image: string
    name: string
    symbol: string
  }
  const {
    isLoading,
    isLoadingError,
    error,
    data: allCoins,
  } = useQuery<ICoins[]>('AllCoins', fetchCoins)

  console.log(allCoins)
  //https://api.coingecko.com/api/v3/coins/bitcoin/tickers

  return (
    <>
      <Heading>Home Coins</Heading>

        {isLoading ? (
          <Loading>Loading...</Loading>
        ) : isLoadingError ? (
          <LoadingError>
            There was an error while loading the coins
          </LoadingError>
        ) : error ? (
          <Failed>Request Failed</Failed>
        ) : (
          allCoins?.map((coin) => {
            return (
              <Coin key={coin.id}>
                <Link to={coin.id}>{coin.name} &rarr;</Link>
              </Coin>
            )
          })
        )}
    </>
  )
}

export default CoinsScreen
