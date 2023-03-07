import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coin from "./routes/Coin";
import CoinsScreen from "./routes/CoinsScreen";

function AppRouter(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CoinsScreen />} />
        <Route path="/:id" element={<Coin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter