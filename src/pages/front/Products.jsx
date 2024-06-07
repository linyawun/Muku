import { useAllUserProductsQuery } from '@/hooks/api/front/product/queries';
import axios from 'axios';
import { Collapse } from 'bootstrap';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination';
import Product from '../../components/Product';

function Products() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const { category } = useParams();
  const categoryCollapse = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: allUserProducts } = useAllUserProductsQuery();
  const getProducts = useCallback(
    async (page = 1) => {
      setIsLoading(true);
      const filterCategory = category === 'all' ? '' : category;
      const productRes = await axios.get(
        `/v2/api/${
          import.meta.env.VITE_APP_API_PATH
        }/products?page=${page}&category=${filterCategory}`
      );
      if (productRes.data.products.length === 0) {
        navigate('/products/all');
      }
      setProducts(productRes.data.products);
      setPagination(productRes.data.pagination);
      setIsLoading(false);
    },
    [category, navigate]
  );
  const getCategory = async () => {
    const res = await axios.get(
      `/v2/api/${import.meta.env.VITE_APP_API_PATH}/products/all`
    );
    const categories = [
      ...new Set(Object.values(res.data.products).map((obj) => obj.category)),
    ];
    setCategoryList(categories);
  };

  useEffect(() => {
    categoryCollapse.current = new Collapse('#categoryCollapse');
    getCategory();
  }, []);

  useEffect(() => {
    getProducts(1);
  }, [category, getProducts]);

  return (
    <>
      <div className='container mt-md-5 mt-3 mb-7'>
        <Loading isLoading={isLoading} />
        <div className='row'>
          <div className='col-lg-2 col-md-3 mb-md-0 mb-4 d-md-block d-none'>
            <div className='d-flex justify-content-between align-items-center'>
              <Link
                to='/products/all'
                className='link'
                aria-label='All Products'
              >
                所有商品
              </Link>
              <button
                className='btn p-0 btnLink '
                id='collapseBtn'
                type='button'
                aria-expanded='false'
                aria-label='Toggle'
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
                    <li key={category} className='mt-1'>
                      <Link
                        to={`/products/${category}`}
                        className='link'
                        aria-label={category}
                      >
                        {category}
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
