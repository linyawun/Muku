import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';
import mukuLogo from '../assets/mukuLogo-03.svg';
function Navbar({ cartData }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  const handleClick = () => {
    setIsCollapsed(!isCollapsed);
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
  return (
    <header className='bg-white sticky-top'>
      <nav className='navbar navbar-expand-lg navbar-light bg-white'>
        <div className='container-fluid position-relative'>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNavAltMarkup'
            aria-controls='navbarNavAltMarkup'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={handleClick}
          >
            {isCollapsed ? (
              <i className='bi bi-x-lg'></i>
            ) : (
              <i className='bi bi-list'></i>
            )}
          </button>
          <NavLink className='navbar-brand' to='/'>
            <img src={mukuLogo} alt='muku' height='45' />
          </NavLink>
          <div
            className='collapse navbar-collapse bg-white'
            id='navbarNavAltMarkup'
          >
            <ul className='navbar-nav'>
              <li className='nav-item dropdown'>
                <Link
                  className='nav-link dropdown-toggle'
                  type='button'
                  to='/products/all'
                  data-bs-toggle='dropdown'
                >
                  所有商品
                </Link>
                <ul className='dropdown-menu ps-0'>
                  <li>
                    <NavLink className='dropdown-item' to={`/products/all`}>
                      <i className='bi bi-flower2 me-1'></i>
                      All
                    </NavLink>
                  </li>
                  {categoryList.map((category) => {
                    return (
                      <li key={category}>
                        <NavLink
                          className='dropdown-item'
                          to={`/products/${category}`}
                        >
                          {category}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/aboutUs'>
                  關於我們
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/shoppingNotice'>
                  購物須知
                </NavLink>
              </li>
            </ul>
          </div>
          <div className='d-flex'>
            <NavLink to='/cart' className='nav-link position-relative'>
              <i className='bi bi-cart-fill'></i>

              <span className='position-absolute start-100 translate-middle badge rounded-pill bg-danger cart-msg'>
                {cartData?.carts?.length}
              </span>
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
