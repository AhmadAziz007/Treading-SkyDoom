import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './page/Home/Home';
import Navbar from './page/Navbar/Navbar';
import Portfolio from './page/Portfolio/portfolio';
import Activity from './page/Activity/Activity';
import Wallet from './page/Wallet/Wallet';
import Withdrawal from './page/Withdrawal/Withdrawal';
import PaymentDetails from './page/Payment_Details/PaymentDetails';
import Watchlist from './page/Watchlist/Watchlist';
import Profile from './page/Profile/Profile';
import StockDetails from './page/Stock-Details/StockDetails';
import SearchCoin from './page/Search/SearchCoin';
import Notfound from './page/Notfound/Notfound';
import Auth from './page/Auth/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './State/Auth/Action';

function App () {

  const { auth } = useSelector(store => store.auth);
  const isAuthenticated = !!auth?.jwt;

  const dispatch = useDispatch()

  console.log(" auth ------", auth)

  useEffect(() => {
    const jwtToken = auth?.jwt || localStorage.getItem("jwt");
    if (jwtToken) {
      dispatch(getUser(jwtToken));
    }
  }, [auth?.jwt, dispatch]);

  return (
    <>
      {!isAuthenticated ? <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/withdrawal" element={<Withdrawal />} />
          <Route path="/payment-details" element={<PaymentDetails />} />
          <Route path="/market/:id" element={<StockDetails />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<SearchCoin />} />
          <Route path="/signin" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          <Route path="/forgot-password" element={<Auth />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div> : <Auth />}
    </>
  );
}

export default App;
