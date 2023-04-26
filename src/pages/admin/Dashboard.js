import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import Message from '../../components/Message';

function Dashboard() {
  const navigate = useNavigate();
  const logout = () => {
    document.cookie = 'hexToken=';
    navigate('/');
  };
  //取出 token
  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('hexToken='))
    ?.split('=')[1];
  axios.defaults.headers.common['Authorization'] = token;
  useEffect(() => {
    //路由保護，確認有token
    if (!token) {
      return navigate('/login');
    }
    //確認token正確性與時效
    (async () => {
      try {
        await axios.post('/v2/api/user/check');
      } catch (error) {
        console.log(error);
        if (!error.response.data.success) {
          navigate('/login');
        }
      }
    })();
  }, [navigate, token]);
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
              >
                登出
              </button>
            </li>
          </ul>
          {/* <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon' />
          </button>
          <div
            className='collapse navbar-collapse justify-content-end'
            id='navbarNav'
          >
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <button
                  type='button'
                  className='btn btn-sm btn-outline-light'
                  onClick={logout}
                >
                  登出
                </button>
              </li>
            </ul>
          </div> */}
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
            {token && <Outlet />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
