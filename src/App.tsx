import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AxiosError } from 'axios';
import { useReducer, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import BackToTopBtn from './components/BackToTopBtn';
import ScrollToTop from './components/ScrollToTop';
import { useAppDispatch } from './hooks/reduxHooks';
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
import { createAsyncMessage } from './slice/messageSlice';
import {
  MessageContext,
  initState,
  messageReducer,
} from './store/messageStore';
import { TCreateMessagePayload } from './types';

function App() {
  const reducer = useReducer(messageReducer, initState);
  const dispatch = useAppDispatch();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error: AxiosError) => {
            const errorMessage = error?.response?.data as TCreateMessagePayload;
            void dispatch(createAsyncMessage(errorMessage));
          },
        }),
        mutationCache: new MutationCache({
          onError: (error: AxiosError) => {
            const errorMessage = error?.response?.data as TCreateMessagePayload;
            void dispatch(createAsyncMessage(errorMessage));
          },
        }),
      })
  );

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
