import { useEffect, useState, useRef } from 'react';

import ProductModal from '../../components/ProductModal';
import DeleteModal from '../../components/DeleteModal';
import Pagination from '../../components/Pagination';
import { Modal } from 'bootstrap';

import Loading from '../../components/Loading';
import {
  useAdminProductsQuery,
  useAllAdminProductsQuery,
} from '@/hooks/api/admin/product/queries';
import {
  TAdminModalType,
  TAdminProduct,
  TAdminProductsPayload,
  TDeleteProductPayload,
} from '@/types';
import { useDeleteProductMutation } from '@/hooks/api/admin/product/mutations';

function AdminProducts() {
  const [productsParams, setProductsParams] = useState<TAdminProductsPayload>({
    page: '1',
    category: '',
  });
  const { data: products, status: productsStatus } = useAdminProductsQuery({
    params: {
      page: productsParams.page,
      category:
        productsParams.category === 'All' ? '' : productsParams.category,
    },
  });
  const { data: allProducts, status: allProductsStatus } =
    useAllAdminProductsQuery();
  const categoryList = allProducts
    ? [...new Set(Object.values(allProducts).map((obj) => obj?.category))]
    : [];
  const pagination = products?.pagination || {};
  //type: 決定 modal 展開的用途
  const [type, setType] = useState<TAdminModalType>('create'); //預設為create，另一type為edit
  const [tempProduct, setTempProduct] = useState<TAdminProduct>({});
  const productModal = useRef<Modal | null>(null);
  const deleteModal = useRef<Modal | null>(null);
  const { mutate: deleteProductMutate, status: deleteProductStatus } =
    useDeleteProductMutation({
      reactQuery: {
        onSuccess: () => {
          closeDeleteModal();
        },
      },
    });

  const changePage = (page: string | number) => {
    setProductsParams((pre) => ({
      ...pre,
      page: page.toString(),
    }));
  };

  const openProductModal = (type: TAdminModalType, product: TAdminProduct) => {
    //展開modal時確認modal用途
    setType(type);
    setTempProduct(product);
    productModal.current?.show();
  };

  const closeProductModal = () => {
    productModal.current?.hide();
    setTempProduct({});
  };

  const openDeleteModal = (product: TAdminProduct) => {
    setTempProduct(product);
    deleteModal.current?.show();
  };

  const closeDeleteModal = () => {
    deleteModal.current?.hide();
  };

  const deleteProduct = (id: TDeleteProductPayload['id']) => {
    deleteProductMutate({ id });
  };

  useEffect(() => {
    productModal.current = new Modal('#productModal', {
      backdrop: 'static',
    }); //放在useEffect內綁定，確認DOM已被渲染
    deleteModal.current = new Modal('#deleteModal', {
      backdrop: 'static',
    });
  }, []);

  return (
    <div className='p-3'>
      <Loading
        isLoading={
          productsStatus === 'pending' || allProductsStatus === 'pending'
        }
      />
      <ProductModal
        closeProductModal={closeProductModal}
        tempProduct={tempProduct}
        type={type}
        categoryList={categoryList}
      />
      <DeleteModal
        close={closeDeleteModal}
        text={tempProduct.title || ''}
        handleDelete={(id) => id && deleteProduct(id)}
        id={tempProduct.id}
        deleteDisabled={deleteProductStatus === 'pending'}
      />
      <h3>產品列表</h3>
      <hr />

      <div className='text-end mb-2'>
        <button
          type='button'
          className='btn btn-primary btn-sm'
          onClick={() => openProductModal('create', {})}
          aria-label='Create Product'
        >
          建立新商品
        </button>
      </div>
      <div className='row gx-3 align-items-center me-2'>
        <div className='col-auto'>
          <label htmlFor='filterCategory' className='col-form-label'>
            分類
          </label>
        </div>
        <div className='col-auto'>
          <select
            className='form-select-sm'
            aria-label='Default select example'
            id='filterCategory'
            value={productsParams.category}
            onChange={(e) => {
              setProductsParams((pre) => ({
                ...pre,
                category: e.target.value,
                page: '1',
              }));
            }}
          >
            <option value='All'>All</option>
            {categoryList?.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='table-responsive'>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>分類</th>
              <th scope='col'>名稱</th>
              <th scope='col'>售價</th>
              <th scope='col'>啟用狀態</th>
              <th scope='col'>編輯</th>
            </tr>
          </thead>
          <tbody>
            {products?.products?.map((product) => {
              return (
                <tr key={product.id}>
                  <td>{product.category}</td>
                  <td>{product.title}</td>
                  <td>{product.price}</td>
                  <td>{product.is_enabled ? '啟用' : '未啟用'}</td>
                  <td>
                    <div className='d-flex gap-2'>
                      <button
                        type='button'
                        className='btn btn-primary btn-sm'
                        onClick={() => openProductModal('edit', product)}
                        aria-label='Edit'
                      >
                        編輯
                      </button>
                      <button
                        type='button'
                        className='btn btn-outline-danger btn-sm'
                        onClick={() => openDeleteModal(product)}
                        aria-label='Delete'
                        disabled={deleteProductStatus === 'pending'}
                      >
                        刪除
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination pagination={pagination} changePage={changePage} />
    </div>
  );
}

export default AdminProducts;
