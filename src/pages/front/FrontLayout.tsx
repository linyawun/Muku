import { useUserCartsQuery } from '@/hooks/api/front/cart/queries';
import { CartContextType } from '@/types';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';
import MessageToast from '../../components/MessageToast';
import Navbar from '../../components/Navbar';

function FrontLayout() {
  // const [cartData, setCartData] = useState({});
  const {
    status: cartStatus,
    data: cartData,
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

  // useEffect(() => {
  //   if (cartError) {
  //     const handleError = async () => {
  //       const errorData = cartError.response?.data as TCreateMessagePayload;
  //       await dispatch(createAsyncMessage(errorData));
  //     };

  //     void handleError()
  //   }
  // }, [cartError, dispatch]);

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
