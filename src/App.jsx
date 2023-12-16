import { useReducer } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  Login,
  Dashboard,
  AdminProducts,
  AdminCoupons,
  AdminOrders,
  FrontLayout,
  Home,
  Products,
  ProductDetail,
  AboutUs,
  Cart,
  Checkout,
  CheckoutSuccess,
  ShoppingNotice,
  NotFound,
} from './pages';
import BackToTopBtn from './components/BackToTopBtn';
import ScrollToTop from './components/ScrollToTop';
import {
  MessageContext,
  messageReducer,
  initState,
} from './store/messageStore';
function App() {
  const reducer = useReducer(messageReducer, initState);
  return (
    <div className='App'>
      <MessageContext.Provider value={reducer}>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<FrontLayout />}>
            <Route path='' element={<Home />}></Route>
            <Route path='/aboutUs' element={<AboutUs />}></Route>
            <Route path='/shoppingNotice' element={<ShoppingNotice />}></Route>
            <Route path='/products/:category' element={<Products />}></Route>
            <Route path='/product/:id' element={<ProductDetail />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/checkout' element={<Checkout />}></Route>
            <Route
              path='/checkoutSuccess/:orderId'
              element={<CheckoutSuccess />}
            ></Route>
            <Route path='/login' element={<Login />}></Route>
          </Route>
          <Route path='/admin' element={<Dashboard />}>
            <Route path='products' element={<AdminProducts />}></Route>
            <Route path='coupons' element={<AdminCoupons />}></Route>
            <Route path='orders' element={<AdminOrders />}></Route>
          </Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
        <BackToTopBtn />
      </MessageContext.Provider>
    </div>
  );
}

export default App;
