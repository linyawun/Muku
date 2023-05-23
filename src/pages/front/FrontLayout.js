import { useEffect, useState } from 'react';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import MessageToast from '../../components/MessageToast';
import { useDispatch } from 'react-redux';
import { createAsyncMessage } from '../../slice/messageSlice';
function FrontLayout() {
  const [cartData, setCartData] = useState({});
  const dispatch = useDispatch();
  const getCart = async () => {
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`
      );
      setCartData(res.data.data);
    } catch (error) {
      dispatch(createAsyncMessage(error.response.data));
    }
  };
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
