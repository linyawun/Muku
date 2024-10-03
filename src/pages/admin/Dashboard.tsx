import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import Message from '../../components/Message';
import {
  useLogoutMutation,
  useUserCheckMutation,
} from '@/hooks/api/admin/signin/mutations';
import { TUserCheckErrorResponse } from '@/types';
import request from '@/utils/request';
import MessageToast from '@/components/MessageToast';

function Dashboard() {
  const navigate = useNavigate();
  const { mutate: logoutMutate } = useLogoutMutation();
  //取出 token
  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('hexToken='))
    ?.split('=')[1];
  axios.defaults.headers.common['Authorization'] = token;
  request.defaults.headers.common['Authorization'] = token;
  const { mutate: userCheckMutation } = useUserCheckMutation({
    reactQuery: {
      onError: (error: TUserCheckErrorResponse) => {
        if (!error?.response?.data?.success) {
          document.cookie = 'hexToken=';
          navigate('/login');
        }
      },
    },
  });
  const logout = () => {
    logoutMutate();
    document.cookie = 'hexToken=';
    navigate('/');
  };

  useEffect(() => {
    if (!token) {
      return navigate('/login');
    }
    userCheckMutation();
  }, [token, navigate, userCheckMutation]);

  return (
    <>
      <Message />
      <nav className='navbar navbar-dark navbar-expand-lg bg-dark py-3'>
        <div className='container-fluid'>
          <p className='text-white mb-0'>Muku 後台管理系統</p>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <button
                type='button'
                className='btn btn-sm btn-outline-light'
                onClick={logout}
                aria-label='Logout'
              >
                登出
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div className='container-fluid'>
        <div className='row' style={{ minHeight: 'calc(100vh - 56px)' }}>
          <div className='bg-light col-md-2 mb-md-0 mb-4 p-0'>
            <ul className='list-group list-group-flush'>
              <NavLink
                className='list-group-item list-group-item-action py-3'
                to='/admin/products'
              >
                <i className='bi bi-cup-fill me-2' />
                產品列表
              </NavLink>
              <NavLink
                className='list-group-item list-group-item-action py-3'
                to='/admin/coupons'
              >
                <i className='bi bi-ticket-perforated-fill me-2' />
                優惠券列表
              </NavLink>
              <NavLink
                className='list-group-item list-group-item-action py-3'
                to='/admin/orders'
              >
                <i className='bi bi-receipt me-2' />
                訂單列表
              </NavLink>
            </ul>
          </div>
          <div className='col-md-10'>
            {/* 有token才渲染outlet */}
            {token && (
              <>
                <MessageToast />
                <Outlet />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
