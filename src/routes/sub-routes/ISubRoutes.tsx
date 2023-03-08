import { ICoinPrice } from '../ICoin'

type IData = number[]
export interface ISubRouteProps {
  isLoading?: boolean
  isLoadingError?: boolean
  failed?: unknown
  priceData?: ICoinPrice
  data?: IData[]
  id?: string
}
