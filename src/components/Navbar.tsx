import { useAllUserProductsQuery } from '@/hooks/api/front/product/queries';
import { TCollapse, TUserCarts } from '@/types';
import { Collapse } from 'bootstrap';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import mukuLogo from '../assets/mukuLogo-03.svg';

function Navbar({ cartData }: { cartData: TUserCarts['data'] }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { data: allUserProducts } = useAllUserProductsQuery();
  const categoryList = allUserProducts
    ? [...new Set(Object.values(allUserProducts).map((obj) => obj.category))]
    : [];
  const dataToggle = useRef<NodeListOf<Element> | null>(null);
  const menuToggle = useRef(null);
  const bsCollapse = useRef<TCollapse | null>(null);

  const handleClick = () => {
    setIsCollapsed((pre) => !pre);
  };

  useEffect(() => {
    dataToggle.current = document.querySelectorAll('[data-toggle]');
    function handleCollapse() {
      bsCollapse.current?.hide();
      setIsCollapsed(false);
    }
    if (menuToggle.current) {
      bsCollapse.current = new Collapse(menuToggle.current, {
        toggle: false,
      });

      dataToggle.current?.forEach((item) => {
        item.addEventListener('click', handleCollapse);
      });
    }
    return () => {
      dataToggle.current?.forEach((item) => {
        item.removeEventListener('click', handleCollapse);
      });
    };
  }, []);

  return (
    <header className='bg-white sticky-top'>
      <nav className='navbar navbar-expand-lg navbar-light bg-white px-lg-3 pe-2'>
        <div className='container-fluid position-relative'>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={handleClick}
          >
            {isCollapsed ? (
              <div style={{ textAlign: 'center' }}>
                <i className='bi bi-x-lg ms-1' style={{ fontSize: '26px' }}></i>
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <i className='bi bi-list' style={{ fontSize: '35px' }}></i>
              </div>
            )}
          </button>
          <NavLink className='navbar-brand' to='/'>
            <img src={mukuLogo} alt='muku' height='45' />
          </NavLink>
          <div
            className='collapse navbar-collapse bg-white'
            id='navbarSupportedContent'
            ref={menuToggle}
          >
            <ul className='navbar-nav'>
              <li className='nav-item dropdown'>
                <Link
                  className='nav-link dropdown-toggle'
                  type='button'
                  to='/products/all'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  所有商品
                </Link>
                <ul className='dropdown-menu ps-0'>
                  <li>
                    <NavLink
                      className='dropdown-item'
                      to={`/products/all`}
                      data-toggle
                    >
                      <i className='bi bi-flower2 me-1'></i>
                      所有商品
                    </NavLink>
                  </li>
                  {categoryList?.map((category) => {
                    return (
                      <li key={category}>
                        <NavLink
                          className='dropdown-item'
                          to={`/products/${category}`}
                          data-toggle
                        >
                          {category}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/aboutUs' data-toggle>
                  關於我們
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/shoppingNotice' data-toggle>
                  購物須知
                </NavLink>
              </li>
            </ul>
          </div>
          <div className='d-flex'>
            <NavLink to='/cart' className='nav-link position-relative'>
              <i className='bi bi-cart-fill cart-icon'></i>
              <span className='visually-hidden'>購物車</span>
              <span className='position-absolute start-100 translate-middle badge rounded-pill bg-danger cart-msg'>
                {cartData?.carts?.length === 0 ? '' : cartData?.carts?.length}
              </span>
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
