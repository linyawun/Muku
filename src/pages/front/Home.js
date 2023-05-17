import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import Product from '../../components/Product';
import Loading from '../../components/Loading';
function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
  const getProducts = async (page = 1) => {
    setIsLoading(true);
    const productRes = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`
    );
    setProducts(productRes.data.products);
    setIsLoading(false);
  };
  useEffect(() => {
    getProducts(1);
  }, []);

  return (
    <>
      <div className='container'>
        <Loading isLoading={isLoading} />
        <div className='mb-3'>
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
              <Link to='/products/all'>
                <img src='https://i.imgur.com/7TVC1s0.png' alt='mukuBanner' />
              </Link>
            </SwiperSlide>

            <SwiperSlide>
              <Link to='/products/all'>
                <img src='https://i.imgur.com/w97DZVQ.png' alt='mukuBanner' />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to='/products/all'>
                <img src='https://i.imgur.com/q1uNiZL.jpg' alt='mukuBanner' />
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
            <Link to='/products/all' className='link-primary pe-5 arrowLink'>
              <small>關於我們</small>
            </Link>
          </div>
        </div>
        <div className='row mb-3 justify-content-between align-items-center'>
          <div className='col-7'>
            <h2 className='text-primary'>New Collection</h2>
          </div>
          <div className='col-5 d-flex justify-content-end'>
            <Link to='/products/all' className='link-primary pe-5 arrowLink'>
              <small>更多商品</small>
            </Link>
          </div>
        </div>
        <div className='row mb-5'>
          {products.map((product) => {
            return (
              <div className='col-lg-3 col-6 mb-4' key={product.id}>
                <Product product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default Home;
