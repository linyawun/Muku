import {
  useAllUserProductsQuery,
  useUserProductsQuery,
} from '@/hooks/api/front/product/queries';
import { TCollapse, TUserProductsParams } from '@/types';
import { Collapse } from 'bootstrap';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination';
import Product from '../../components/Product';

function Products() {
  const navigate = useNavigate();
  const { category } = useParams();
  const categoryCollapse = useRef<TCollapse | null>(null);
  const [productsParams, setProductsParams] = useState<TUserProductsParams>({
    page: '1',
    category: category === 'all' ? '' : category,
  });
  const { data: allProducts, status: allProductsStatus } =
    useAllUserProductsQuery();
  const { data: products, status: productsStatus } = useUserProductsQuery({
    params: {
      ...productsParams,
      category: category === 'all' ? '' : category,
    },
  });
  const pagination = products?.pagination || {};
  const categoryList = allProducts
    ? [...new Set(Object.values(allProducts).map((obj) => obj.category))]
    : [];

  if (products?.products?.length === 0) {
    navigate('/products/all');
  }

  const changePage = (page: string) => {
    setProductsParams((pre) => ({
      ...pre,
      page,
    }));
  };

  useEffect(() => {
    categoryCollapse.current = new Collapse('#categoryCollapse') as TCollapse;
  }, []);

  return (
    <>
      <div className='container mt-md-5 mt-3 mb-7'>
        <Loading
          isLoading={
            allProductsStatus === 'pending' || productsStatus === 'pending'
          }
        />
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
                  categoryCollapse.current?.toggle();
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
              {category?.toLowerCase() === 'all' ? (
                <>
                  <i className='bi bi-flower2 me-2'></i>
                  所有商品
                </>
              ) : (
                category
              )}
            </h2>
            <div className='row'>
              {products?.products?.map((product) => {
                return (
                  <div className='col-lg-3 col-6 mb-4' key={product.id}>
                    <Product product={product} />
                  </div>
                );
              })}
            </div>
            <nav className='d-flex justify-content-center'>
              <Pagination pagination={pagination} changePage={changePage} />
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
