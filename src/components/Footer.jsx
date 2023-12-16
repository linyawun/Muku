import { NavLink } from 'react-router-dom';
import mukuLogo from '../assets/mukuLogo-03.svg';
function Footer() {
  return (
    <footer className='bg-light'>
      <div className='container'>
        <div className='row py-5 justify-content-lg-between justify-content-start align-items-center'>
          <div className='col-md-5'>
            <div className='d-flex flex-md-row flex-column align-items-center mb-lg-0 mb-md-6 mb-4'>
              <img src={mukuLogo} alt='muku logo' style={{ height: '80px' }} />
              <div>
                <h5 className='text-primary mb-0'>Muku</h5>
              </div>
            </div>
          </div>
          <div className='col-md-7'>
            <div className='row justify-content-center'>
              <div className='col-md-4'>
                <p className='mb-1'>商店資訊</p>
                <ul className='ps-0'>
                  <li>
                    <NavLink className='link' to='/aboutUs'>
                      關於我們
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className='link' to='/shoppingNotice'>
                      購物須知
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div className='col-md-4'>
                <p className='mb-1'>關注我們</p>
                <ul className='ps-0'>
                  <li>
                    <a
                      className='link'
                      href='https://www.facebook.com/'
                      target='_blank'
                      rel='noreferrer'
                    >
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      className='link'
                      href='https://www.instagram.com/'
                      target='_blank'
                      rel='noreferrer'
                    >
                      Instgram
                    </a>
                  </li>
                </ul>
              </div>
              <div className='col-md-4'>
                <p className='mb-1'>後台管理</p>
                <ul className='ps-0'>
                  <li>
                    <NavLink className='link' to='/login'>
                      管理者登入
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='d-flex align-items-center justify-content-center text-primary py-3'>
          <p className='mb-0'>
            <small>© 2023 Muku All Rights Reserved.</small>
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
