import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useReducer } from 'react';
import { Route, Routes } from 'react-router-dom';
import BackToTopBtn from './components/BackToTopBtn';
import ScrollToTop from './components/ScrollToTop';
import {
  AboutUs,
  AdminCoupons,
  AdminOrders,
  AdminProducts,
  Cart,
  Checkout,
  CheckoutSuccess,
  Dashboard,
  FrontLayout,
  Home,
  Login,
  NotFound,
  ProductDetail,
  Products,
  ShoppingNotice,
} from './pages';
import {
  MessageContext,
  initState,
  messageReducer,
} from './store/messageStore';

const queryClient = new QueryClient();

function App() {
  const reducer = useReducer(messageReducer, initState);

  return (
    <QueryClientProvider client={queryClient}>
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
        <ReactQueryDevtools initialIsOpen={false} />
      </MessageContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
