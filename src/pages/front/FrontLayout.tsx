import { useUserCartsQuery } from '@/hooks/api/front/cart/queries';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';
import MessageToast from '../../components/MessageToast';
import Navbar from '../../components/Navbar';
import { createAsyncMessage } from '../../slice/messageSlice';
type TCreateMessagePayload = {
  id: string;
  success: boolean;
  message: string;
};
function FrontLayout() {
  // const [cartData, setCartData] = useState({});
  const dispatch = useDispatch();
  const {
    status: cartStatus,
    data: cartData,
    error: cartError,
    refetch: getCart,
  } = useUserCartsQuery({
    reactQuery: {
      select: (res) => res?.data,
    },
  });
  console.log('cartData', cartData);

  // const getCart = useCallback(async () => {
  //   try {
  //     const res = await axios.get(
  //       `/v2/api/${import.meta.env.VITE_APP_API_PATH}/cart`
  //     );
  //     setCartData(res.data.data);
  //   } catch (error) {
  //     dispatch(createAsyncMessage(error.response.data));
  //   }
  // }, [dispatch]);
  // useEffect(() => {
  //   getCart();
  // }, [getCart]);
  useEffect(() => {
    if (cartError) {
      const errorData = cartError?.response?.data as TCreateMessagePayload;
      dispatch(createAsyncMessage(errorData));
    }
  }, [cartError, dispatch]);

  return cartStatus === 'pending' ? (
    <Loading isLoading={true} />
  ) : (
    <>
      <Navbar cartData={cartData} />
      <MessageToast />
      <Outlet context={{ getCart, cartData }}></Outlet>
      <Footer />
    </>
  );
}
export default FrontLayout;
