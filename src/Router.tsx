import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Coin from './routes/Coin'
import CoinsScreen from './routes/CoinsScreen'
import Chart from './routes/sub-routes/Chart'
import Price from './routes/sub-routes/Price'



function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CoinsScreen />} />
        <Route path="/:id" element={<Coin />}>
          <Route path="/:id/chart" element={<Chart />} />
          <Route path="/:id/price" element={<Price />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
