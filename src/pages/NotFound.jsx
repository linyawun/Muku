import { Link } from 'react-router-dom';
import mukuLogo from '../assets/mukuLogo-03.svg';

function NotFound() {
  return (
    <>
      <div className='d-flex align-items-center justify-content-center vh-100'>
        <div className='text-center'>
          <img
            src={mukuLogo}
            alt='mukulogo'
            style={{ height: '200px' }}
            className='mb-3'
          />
          <h1 className='display-2 fw-bold text-primary mb-3'>404 Not Found</h1>
          <p className='fs-4 mb-0'>很抱歉，您所請求的頁面並不存在。</p>
          <p className='fs-5 text-muted mb-5'>請再次檢查網址是否正確。</p>
          <Link to='/' className='btn btn-primary py-3 w-md-25 w-50 fs-5'>
            回到首頁
          </Link>
        </div>
      </div>
    </>
  );
}

export default NotFound;
