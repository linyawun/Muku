import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Collapse } from 'bootstrap';
import Product from '../../components/Product';
import Pagination from '../../components/Pagination';
import Loading from '../../components/Loading';

function Products() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const { category } = useParams();
  const [filterCategory, setFilterCategory] = useState(
    getCategoryParam(category)
  );
  const categoryCollapse = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const getProducts = async (page = 1) => {
    setIsLoading(true);
    const category = filterCategory === 'All' ? '' : filterCategory;
    const productRes = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}&category=${category}`
    );
    if (productRes.data.products.length === 0) {
      navigate('/products/all');
    }
    setProducts(productRes.data.products);
    setPagination(productRes.data.pagination);
    setIsLoading(false);
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
  function getCategoryParam(category) {
    let param = category;
    if (category[0].toUpperCase() !== category[0]) {
      param =
        category.slice(0, 1).toUpperCase() + category.slice(1).toLowerCase();
    }
    return param;
  }

  useEffect(() => {
    categoryCollapse.current = new Collapse('#categoryCollapse');
    getCategory(1);
  }, []);

  useEffect(() => {
    setFilterCategory(getCategoryParam(category));
  }, [category]);

  useEffect(() => {
    getProducts(1);
  }, [filterCategory]);

  return (
    <>
      <div className='container mt-md-5 mt-3 mb-7'>
        <Loading isLoading={isLoading} />
        <div className='row'>
          <div className='col-lg-2 col-md-3 mb-md-0 mb-4 d-md-block d-none'>
            <div className='d-flex justify-content-between align-items-center'>
              <Link to='/products/all' className='link'>
                所有商品
              </Link>
              <button
                className='btn p-0 btnLink '
                id='collapseBtn'
                type='button'
                aria-expanded='false'
                onClick={() => {
                  categoryCollapse.current.toggle();
                }}
              >
                <i className='bi bi-plus'></i>
              </button>
            </div>
            <div className='collapse' id='categoryCollapse'>
              <ul className='collapseList'>
                {categoryList.map((category) => {
                  return (
                    <li key={category}>
                      <Link to={`/products/${category}`} className='link'>
                        <small>{category}</small>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className='col-lg-10 col-md-9'>
            <h2 className='text-center text-primary mb-4'>
              {category.toLowerCase() === 'all' ? (
                <>
                  <i className='bi bi-flower2 me-2'></i>
                  所有商品
                </>
              ) : (
                category
              )}
            </h2>
            <div className='row'>
              {products.map((product) => {
                return (
                  <div className='col-lg-3 col-6 mb-4' key={product.id}>
                    <Product product={product} />
                  </div>
                );
              })}
            </div>
            <nav className='d-flex justify-content-center'>
              <Pagination pagination={pagination} changePage={getProducts} />
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
