import { useEffect, useRef, useState } from 'react';
import { Collapse } from 'bootstrap';
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';
import mukuLogo from '../assets/mukuLogo-03.svg';
function Navbar({ cartData }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const dataToggle = useRef(null);
  const menuToggle = useRef(null);
  const bsCollapse = useRef(null);
  dataToggle.current = document.querySelectorAll('[data-toggle]');

  const handleClick = () => {
    setIsCollapsed((pre) => !pre);
  };
  const getCategory = async () => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
    );
    const categories = [
      ...new Set(Object.values(res.data.products).map((obj) => obj.category)),
    ];
    setCategoryList(categories);
  };
  useEffect(() => {
    getCategory();
  }, []);
  useEffect(() => {
    function handleCollapse() {
      bsCollapse.current.hide();
      setIsCollapsed(false);
    }
    if (menuToggle.current && categoryList) {
      bsCollapse.current = new Collapse(menuToggle.current, {
        toggle: false,
      });

      dataToggle.current.forEach((item) => {
        item.addEventListener('click', handleCollapse);
      });
    }
    return () => {
      dataToggle.current.forEach((item) => {
        item.removeEventListener('click', handleCollapse);
      });
    };
  }, [categoryList]);

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
                  {categoryList.map((category) => {
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
