import { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import ProductModal from '../../components/ProductModal';
import DeleteModal from '../../components/DeleteModal';
import Pagination from '../../components/Pagination';
import { Modal } from 'bootstrap';
import {
  MessageContext,
  handleSuccessMessage,
  handleErrorMessage,
} from '../../store/messageStore';
import Loading from '../../components/Loading';
function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [filterCategory, setFilterCategory] = useState('All');
  //type: 決定 modal 展開的用途
  const [type, setType] = useState('create'); //預設為create，另一type為edit
  const [tempProduct, setTempProduct] = useState({});
  const productModal = useRef(null);
  const deleteModal = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [, dispatch] = useContext(MessageContext);

  const getCategory = async () => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/admin/products/all`
    );
    const categories = [
      ...new Set(Object.values(res.data.products).map((obj) => obj.category)),
    ];
    setCategoryList(categories);
  };
  const getProducts = async (page = 1) => {
    setIsLoading(true);
    const category = filterCategory === 'All' ? '' : filterCategory;
    const productRes = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/admin/products?page=${page}&category=${category}`
    );
    setProducts(productRes.data.products);
    setPagination(productRes.data.pagination);
    setIsLoading(false);
  };
  const openProductModal = (type, product) => {
    //展開modal時確認modal用途
    setType(type);
    setTempProduct(product);
    productModal.current.show();
  };
  const closeProductModal = () => {
    productModal.current.hide();
    setTempProduct({});
  };

  const openDeleteModal = (product) => {
    setTempProduct(product);
    deleteModal.current.show();
  };
  const closeDeleteModal = () => {
    deleteModal.current.hide();
  };
  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${id}`
      );
      console.log(res);
      if (res.data.success) {
        handleSuccessMessage(dispatch, res);
        getProducts();
        getCategory();
        closeDeleteModal();
      }
    } catch (error) {
      console.log(error);
      handleErrorMessage(dispatch, error);
    }
  };
  useEffect(() => {
    productModal.current = new Modal('#productModal', {
      backdrop: 'static',
    }); //放在useEffect內綁定，確認DOM已被渲染
    deleteModal.current = new Modal('#deleteModal', {
      backdrop: 'static',
    });
    getProducts();
    getCategory();
  }, []);
  useEffect(() => {
    getProducts();
  }, [filterCategory]);
  return (
    <div className='p-3'>
      <Loading isLoading={isLoading} />
      <ProductModal
        closeProductModal={closeProductModal}
        getProducts={getProducts}
        tempProduct={tempProduct}
        type={type}
        categoryList={categoryList}
      />
      <DeleteModal
        close={closeDeleteModal}
        text={tempProduct.title}
        handleDelete={deleteProduct}
        id={tempProduct.id}
      />
      <h3>產品列表</h3>
      <hr />

      <div className='text-end mb-2'>
        <button
          type='button'
          className='btn btn-primary btn-sm'
          onClick={() => openProductModal('create', {})}
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
            value={filterCategory}
            onChange={(e) => {
              setFilterCategory(e.target.value);
            }}
          >
            <option value='All'>All</option>
            {categoryList.map((category) => (
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
            {products.map((product) => {
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
                      >
                        編輯
                      </button>
                      <button
                        type='button'
                        className='btn btn-outline-danger btn-sm'
                        onClick={() => openDeleteModal(product)}
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
      <Pagination pagination={pagination} changePage={getProducts} />
    </div>
  );
}

export default AdminProducts;
