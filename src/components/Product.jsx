import { Link, useOutletContext } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { createAsyncMessage } from '../slice/messageSlice';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function Product({ product }) {
  const { getCart } = useOutletContext();
  const dispatch = useDispatch();

  const addToCart = async () => {
    const data = {
      data: {
        product_id: product.id,
        qty: 1,
      },
    };
    try {
      const res = await axios.post(
        `/v2/api/${import.meta.env.VITE_APP_API_PATH}/cart`,
        data
      );
      dispatch(createAsyncMessage(res.data));
      getCart();
    } catch (error) {
      dispatch(createAsyncMessage(error.response.data));
    }
  };
  return (
    <div className='card border-0 mb-4 position-relative h-100'>
      <Link className='position-relative' to={`/product/${product.id}`}>
        <LazyLoadImage
          className='card-img-top rounded-0 object-cover'
          alt='productImg'
          effect='blur'
          height={300}
          src={product.imageUrl}
          loading='lazy'
        />

        <div className='overlay position-absolute top-0 start-0 w-100 h-100 bg-white'>
          <LazyLoadImage
            className='card-img-top rounded-0 object-cover'
            alt='productImg'
            effect='blur'
            height={300}
            src={product.imagesUrl?.[0] || product.imageUrl}
            loading='lazy'
          />
          <div className='cart-block'>
            <button
              type='button'
              aria-label='Add to cart'
              className='btn btn-primary py-2 add-to-cart d-md-block d-none'
              onClick={(e) => {
                e.preventDefault();
                addToCart();
              }}
            >
              加入購物車
            </button>
          </div>
        </div>
      </Link>
      <div className='card-body p-0'>
        <h3 className='h6 mb-0 mt-2'>
          <Link to={`/product/${product.id}`} className='link stretched-link'>
            {product.title}
          </Link>
        </h3>
        <p className='text-primary mt-1 mb-0'>
          NT$ {product.price?.toLocaleString()}
        </p>
        <p className='text-decoration-line-through text-muted mb-0'>
          <small>NT$ {product.origin_price?.toLocaleString()}</small>
        </p>
      </div>
      <button
        type='button'
        className='btn btn-primary add-to-cart-icon w-100 d-md-none d-block'
        onClick={() => addToCart()}
        aria-label='Add to cart'
      >
        <i className='bi bi-cart-fill'></i>
      </button>
    </div>
  );
}
export default Product;
