import { useEffect, useState } from 'react';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import MessageToast from '../../components/MessageToast';
import { useDispatch, useSelector } from 'react-redux';
import { getAsyncCart } from '../../slice/cartSlice';
function FrontLayout() {
  const [cartData, setCartData] = useState({});
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const getCart = async () => {
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`
      );
      setCartData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   dispatch(getAsyncCart());
  // }, [dispatch]);
  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <Navbar cartData={cartData} />
      <MessageToast />
      <Outlet context={{ getCart, cartData }}></Outlet>
      <Footer />
    </>
  );
}
export default FrontLayout;
