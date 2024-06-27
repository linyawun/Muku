import { Link } from 'react-router-dom';

function OrderNotFound() {
  return (
    <div className='row flex-column justify-content-center align-items-center py-5'>
      <h5 className='col-lg-4 col-10 text-center mb-4'>此訂單不存在</h5>
      <Link
        to='/'
        type='button'
        className='col-lg-4 col-10 btn btn-primary py-2'
        aria-label='Go to Home'
      >
        回到首頁
      </Link>
    </div>
  );
}

export default OrderNotFound;
