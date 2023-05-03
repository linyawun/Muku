import { Link } from 'react-router-dom';
function Product({ product }) {
  return (
    <div className='card border-0 mb-4 position-relative'>
      <Link className='position-relative' to={`/product/${product.id}`}>
        <img
          src={product.imageUrl}
          className='card-img-top rounded-0 object-cover'
          height={300}
          alt='productImg'
        />

        <div className='overlay position-absolute top-0 start-0 w-100 h-100 bg-white'>
          <img
            className='card-img-top rounded-0 object-cover'
            height={300}
            src={product.imagesUrl?.[0] || product.imageUrl}
            alt='productImg'
          />
        </div>
      </Link>

      <div className='card-body p-0'>
        <h6 className='mb-0 mt-2'>
          <Link to={`/product/${product.id}`} className='link'>
            {product.title}
          </Link>
        </h6>

        <p className='text-primary mt-1 mb-0'>
          NT$ {product.price?.toLocaleString()}
        </p>
        <p className='text-decoration-line-through text-muted'>
          <small>NT$ {product.origin_price?.toLocaleString()}</small>
        </p>
      </div>
    </div>
  );
}
export default Product;
