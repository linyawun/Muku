import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import {
  useNavigate,
  useOutletContext,
  useParams,
  Link,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createAsyncMessage } from '../../slice/messageSlice';
import { Link as ScrollLink, Element as ScrollElement } from 'react-scroll';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import Loading from '../../components/Loading';
import Product from '../../components/Product';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const pagination = {
  clickable: true,
  renderBullet: function (index, className) {
    return `
      <div class="${className}">
        <span class=""></span>
      </div>
    `;
  },
};

function ProductDetail() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [cartQuantity, setCartQuantity] = useState(1);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { getCart } = useOutletContext();
  const dispatch = useDispatch();

  const getProduct = useCallback(
    async (id) => {
      setIsLoading(true);
      try {
        const productRes = await axios.get(
          `/v2/api/${import.meta.env.VITE_APP_API_PATH}/product/${id}`
        );
        setProduct(productRes.data.product);
        setIsLoading(false);
        getRelatedProducts(1, productRes.data.product.category);
      } catch (error) {
        dispatch(createAsyncMessage(error.response.data));
        navigate('/products/all');
        setIsLoading(false);
      }
    },
    [navigate, dispatch]
  );
  const addToCart = async () => {
    const data = {
      data: {
        product_id: product.id,
        qty: cartQuantity,
      },
    };
    setIsLoading(true);
    try {
      const res = await axios.post(
        `/v2/api/${import.meta.env.VITE_APP_API_PATH}/cart`,
        data
      );
      dispatch(createAsyncMessage(res.data));
      getCart();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      dispatch(createAsyncMessage(error.response.data));
    }
  };
  const getRelatedProducts = async (page = 1, category) => {
    setIsLoading(true);
    const productRes = await axios.get(
      `/v2/api/${
        import.meta.env.VITE_APP_API_PATH
      }/products?page=${page}&category=${category}`
    );
    setProducts(productRes.data.products);
    setIsLoading(false);
  };
  useEffect(() => {
    getProduct(id);
  }, [id, getProduct]);

  return (
    <>
      <div className='container-lg mb-5'>
        <Loading isLoading={isLoading} />
        <div className='row'>
          <div className='col-lg-8 mb-lg-0 mb-3'>
            <Swiper
              spaceBetween={30}
              pagination={pagination}
              modules={[Autoplay, Pagination]}
              autoplay={{
                delay: 6000,
                disableOnInteraction: false,
              }}
              className='mySwiper'
            >
              <SwiperSlide>
                <LazyLoadImage
                  alt='productImg'
                  effect='blur'
                  src={product.imageUrl}
                  fetchpriority='high'
                />
              </SwiperSlide>
              {product.imagesUrl &&
                product.imagesUrl.map(
                  (imageUrl, index) =>
                    imageUrl && (
                      <SwiperSlide key={`${imageUrl}_swiper_${index}`}>
                        <LazyLoadImage
                          alt='productImg'
                          effect='blur'
                          src={imageUrl}
                          fetchpriority='high'
                        />
                      </SwiperSlide>
                    )
                )}
            </Swiper>
          </div>
          <div className='col-lg-4 productInfo p-lg-2 p-4'>
            <nav aria-label='breadcrumb'>
              <ol className='breadcrumb'>
                <li className='breadcrumb-item'>
                  <Link
                    to='/products/all'
                    className='link'
                    aria-label='All Products'
                  >
                    <small>所有商品</small>
                  </Link>
                </li>
                <li className='breadcrumb-item active' aria-current='page'>
                  <Link
                    to={`/products/${product.category}`}
                    className='link'
                    aria-label={product.category}
                  >
                    <small>{product.category}</small>
                  </Link>
                </li>
              </ol>
            </nav>
            <h3 className='mb-1 text-primary'>{product.title}</h3>
            {product.description && (
              <>
                <p className='text-muted'>
                  <small>{product.description}</small>
                </p>
                <hr className='text-secondary' />
              </>
            )}
            <h5 className='fw-bold text-primary mb-0'>
              NT$ {product.price?.toLocaleString()}
            </h5>
            <p className='text-decoration-line-through text-muted'>
              <small>NT$ {product.origin_price?.toLocaleString()}</small>
            </p>
            <div className='row mb-3 align-items-center justify-content-between'>
              <div className='col-lg-5 col-md-4'>
                <label>貨況</label>
              </div>
              <div className='col-lg-6 col-md-4'>
                <select
                  className='form-select shadow-none'
                  aria-label='Default select example'
                  defaultValue='現貨'
                >
                  <option value='現貨'>現貨</option>
                  <option value='預購'>預購</option>
                </select>
              </div>
            </div>
            <div className='row mb-3 align-items-center justify-content-between'>
              <div className='col-lg-5 col-md-4'>
                <label>數量</label>
              </div>
              <div className='col-lg-6 col-md-4'>
                <div className='input-group border border-secondary '>
                  <div className='input-group-prepend'>
                    <button
                      className='btn btn-outline-primary rounded-0 border-0 py-2'
                      type='button'
                      id='button-addon1'
                      onClick={() =>
                        setCartQuantity((pre) => (pre === 1 ? pre : pre - 1))
                      }
                      aria-label='Minus'
                    >
                      <i className='bi bi-dash'></i>
                    </button>
                  </div>
                  <input
                    type='number'
                    className='form-control border-0 text-center my-auto shadow-none'
                    placeholder=''
                    aria-label='Example text with button addon'
                    aria-describedby='button-addon1'
                    value={cartQuantity}
                    readOnly
                  />
                  <div className='input-group-append'>
                    <button
                      className='btn btn-outline-primary rounded-0 border-0 py-2'
                      type='button'
                      id='button-addon2'
                      onClick={() => setCartQuantity((pre) => pre + 1)}
                      aria-label='Plus'
                    >
                      <i className='bi bi-plus'></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button
              type='button'
              href='./checkout.html'
              className='btn btn-primary w-100 py-2 mb-4'
              onClick={() => addToCart()}
              disabled={isLoading}
              aria-label='Add to cart'
            >
              加入購物車
            </button>
            <ul className='ps-0 text-muted'>
              <li className='link scroll-link'>
                <ScrollLink
                  to='productContent'
                  smooth={true}
                  duration={200}
                  offset={-100}
                >
                  <i className='bi bi-suit-diamond me-1'></i>
                  商品描述
                </ScrollLink>
              </li>
              <li className='link scroll-link'>
                <ScrollLink
                  to='productDelivery'
                  smooth={true}
                  duration={200}
                  offset={-100}
                >
                  <i className='bi bi-suit-diamond me-1'></i>
                  送貨及付款方式
                </ScrollLink>
              </li>
              <li className='link scroll-link'>
                <ScrollLink
                  to='productMore'
                  smooth={true}
                  duration={200}
                  offset={-100}
                >
                  <i className='bi bi-suit-diamond me-1'></i>
                  了解更多
                </ScrollLink>
              </li>
              <li className='link scroll-link'>
                <ScrollLink
                  to='productRelated'
                  smooth={true}
                  duration={200}
                  offset={-100}
                >
                  <i className='bi bi-suit-diamond me-1'></i>
                  相關商品
                </ScrollLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className='container-lg p-lg-3 p-4'>
        <div className='mt-4 mb-7'>
          <ScrollElement name='productContent'>
            <div className='mb-4'>
              <h4 className='text-primary'>商品描述</h4>
              {product.content ? (
                <p
                  className='mb-0'
                  dangerouslySetInnerHTML={{
                    __html: product.content.replace(/\n/g, '<br/>'),
                  }}
                ></p>
              ) : null}
            </div>
          </ScrollElement>
          <ScrollElement name='productDelivery'>
            <div className='mb-4'>
              <h4 className='text-primary'>送貨及付款方式</h4>
              <div className='row justify-content-between'>
                <div className='col-lg-6'>
                  <p className='mb-0 fw-bold'>送貨方式</p>
                  <ul className='ps-0'>
                    <li>7-11 取貨不付款 (C2C)</li>
                    <li>全家 取貨不付款 (C2C)</li>
                    <li>黑貓-常溫</li>
                  </ul>
                </div>
                <div className='col-lg-6'>
                  <p className='mb-0 fw-bold'>付款方式</p>
                  <ul className='ps-0'>
                    <li>信用卡 (支援VISA, MasterCard, JCB)</li>
                    <li>銀行轉帳／ATM</li>
                  </ul>
                </div>
              </div>
            </div>
          </ScrollElement>
          <ScrollElement name='productMore'>
            <div>
              <h4 className='text-primary'>了解更多</h4>

              <LazyLoadImage
                alt='productImg'
                effect='blur'
                src={product.imageUrl}
                className='img-fluid mb-4'
                loading='lazy'
              />
              {product.imagesUrl &&
                product.imagesUrl.map((imageUrl, index) =>
                  imageUrl ? (
                    <LazyLoadImage
                      alt='productImg'
                      effect='blur'
                      src={imageUrl}
                      className='img-fluid d-block mb-4'
                      key={`${imageUrl}_${index}`}
                      loading='lazy'
                    />
                  ) : null
                )}
            </div>
          </ScrollElement>
          <ScrollElement name='productRelated'>
            <div className='mb-4'>
              <h4 className='text-primary'>相關商品</h4>
              <div className='row'>
                {products
                  .filter((item) => item.id !== product.id)
                  .slice(0, 4)
                  .map((product) => {
                    return (
                      <div className='col-lg-3 col-6 mb-4' key={product.id}>
                        <Product product={product} />
                      </div>
                    );
                  })}
              </div>
            </div>
          </ScrollElement>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
