import { useUserCartsQuery } from '@/hooks/api/front/cart/queries';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { CartContextType, TCreateMessagePayload } from '@/types';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';
import MessageToast from '../../components/MessageToast';
import Navbar from '../../components/Navbar';
import { createAsyncMessage } from '../../slice/messageSlice';

function FrontLayout() {
  // const [cartData, setCartData] = useState({});
  const dispatch = useAppDispatch();
  const {
    status: cartStatus,
    data: cartData,
    error: cartError,
    refetch: getCart,
  } = useUserCartsQuery();

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
  console.log('cartError', cartError);
  console.log('cartStatus', cartStatus);

  useEffect(() => {
    if (cartError) {
      const handleError = async () => {
        const errorData = cartError.response?.data as TCreateMessagePayload;
        await dispatch(createAsyncMessage(errorData));
      };

      handleError().catch((error) => {
        console.error('Error dispatching createAsyncMessage:', error);
      });
    }
  }, [cartError, dispatch]);

  return cartStatus !== 'success' ? (
    <Loading isLoading={true} />
  ) : (
    <>
      <Navbar cartData={cartData} />
      <MessageToast />
      <Outlet
        context={{ getCart, cartData } satisfies CartContextType}
      ></Outlet>
      <Footer />
    </>
  );
}
export default FrontLayout;
