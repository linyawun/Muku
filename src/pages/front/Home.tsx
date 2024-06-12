import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';
import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Loading from '../../components/Loading';
import Product from '../../components/Product';

import { useUserProductsQuery } from '@/hooks/api/front/product/queries';

import { pagination } from '@/utils/constant';

function Home() {
  // const [products, setProducts] = useState([]);
  //const [isLoading, setIsLoading] = useState(false);
  const {
    status,
    data: productsData,
    isLoading,
  } = useUserProductsQuery({
    params: { page: '1' },
  });

  // const getProducts = async (page = 1) => {
  //   setIsLoading(true);
  //   const productRes = await axios.get(
  //     `/v2/api/${import.meta.env.VITE_APP_API_PATH}/products?page=${page}`
  //   );
  //   setProducts(productRes.data.products);
  //   setIsLoading(false);
  // };
  // useEffect(() => {
  //   getProducts(1);
  // }, []);

  return (
    <>
      <div className='container'>
        <Loading isLoading={isLoading} />
        <div className='mb-3 banner-swiper-wrapper'>
          <Swiper
            spaceBetween={30}
            pagination={pagination}
            modules={[Autoplay, Pagination]}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
            }}
            className='banner-swiper'
          >
            <SwiperSlide>
              <Link
                to='/products/all'
                className='position-relative'
                aria-label='Go Shopping'
              >
                <LazyLoadImage
                  alt='mukuBanner'
                  effect='blur'
                  srcSet={`
                      https://i.ibb.co/6ssW0X8/a8z3v-7rgo8.webp 480w,
                      https://i.ibb.co/N7rqvQh/Muku-banner-1-tablet.webp 1024w,
                      https://i.ibb.co/k6nXnkN/Muku-banner-01.webp 1280w
                  `}
                  src='https://i.ibb.co/k6nXnkN/Muku-banner-01.webp'
                  // fetchpriority='high'
                  sizes='(max-width: 480px) 480px, (max-width: 1024px) 1024px, 100vw'
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to='/products/all' aria-label='Go Shopping'>
                <LazyLoadImage
                  alt='mukuBanner'
                  effect='blur'
                  src='https://i.ibb.co/rxMhsxN/aailg-q2cz8.webp'
                  loading='lazy'
                />
                <div className='bg-white opacity-50 w-100 h-100 position-absolute top-0 start-0'></div>
                <button
                  type='button'
                  className='btn btn-primary btn-lg position-absolute CTA'
                  aria-label='Go shopping'
                >
                  前往購物
                </button>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to='/products/all' aria-label='Go Shopping'>
                <LazyLoadImage
                  alt='mukuBanner'
                  effect='blur'
                  src='https://i.ibb.co/pn2nvKj/ahv96-47phg.webp'
                  loading='lazy'
                />
                <div className='bg-white opacity-50 w-100 h-100 position-absolute top-0 start-0'></div>
                <button
                  type='button'
                  className='btn btn-primary btn-lg position-absolute CTA'
                  aria-label='Go shopping'
                >
                  前往購物
                </button>
              </Link>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className='bg-light text-center p-4 mb-5'>
          <h5 className='text-primary fw-bold mb-4'>
            Muku. 純粹美好的穿衣日常
          </h5>
          <div className='row justify-content-center home-intro mb-4'>
            <div className='col-md-3 col-9'>
              <h6>
                <i className='bi bi-flower2 me-2'></i>簡約選物風格
              </h6>
              <p>
                <small>
                  適合各種場合穿搭，主打日常舒適感，寬鬆自在的穿著風格
                </small>
              </p>
            </div>
            <div className='col-md-3 col-9'>
              <h6>
                <i className='bi bi-flower2 me-2'></i>純淨自然的品牌理念
              </h6>
              <p>
                <small>
                  以「Muku」為名，透過商品傳達純淨自然的訴求，引領大家過放鬆的生活
                </small>
              </p>
            </div>
            <div className='col-md-3 col-9'>
              <h6>
                <i className='bi bi-flower2 me-2'></i>注重品質與環保
              </h6>
              <p>
                <small>
                  選用高品質面料，盡量減少對環境的影響，提倡可持續發展的生活方式
                </small>
              </p>
            </div>
          </div>
          <div className='d-flex justify-content-center'>
            <Link
              to='/aboutUs'
              className='link-primary pe-5 arrowLink'
              aria-label='About us'
            >
              <small>關於我們</small>
            </Link>
          </div>
        </div>
        <div className='row mb-3 justify-content-between align-items-center'>
          <div className='col-7'>
            <h2 className='text-primary'>最新商品</h2>
          </div>
          <div className='col-5 d-flex justify-content-end'>
            <Link
              to='/products/all'
              className='link-primary pe-5 arrowLink'
              aria-label='More Products'
            >
              <small>更多商品</small>
            </Link>
          </div>
        </div>
        <div className='row mb-5'>
          {status !== 'success' ? (
            <div>Loading...</div>
          ) : (
            productsData?.products?.map((product) => (
              <div className='col-lg-3 col-6 mb-4' key={product.id}>
                <Product product={product} />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
export default Home;
