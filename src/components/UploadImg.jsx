import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUploadVal, setUploadMsg } from '../slice/uploadImgSlice';
function UploadImg({ id, property, setValue, imgUrl, setTempData }) {
  const uploadImages = useSelector((state) => state.uploadImg);
  const dispatchRedux = useDispatch();
  const uploadImg = async (e, property, name) => {
    dispatchRedux(
      setUploadVal({
        [property]: e.target.value,
      })
    );
    const file = e.target.files[0]; // 取得選定的檔案資訊
    const formData = new FormData(); // 建立FormData
    formData.append('file', file); // 將選定的檔案加入到FormData中
    if (file.type.split('/')[0] !== 'image') {
      dispatchRedux(
        setUploadMsg({ [property]: '格式錯誤，請選擇 jpg 或 png 檔' })
      );
      return;
    }
    try {
      dispatchRedux(setUploadMsg({ [property]: '上傳中...' }));
      const res = await axios.post(
        `/v2/api/${import.meta.env.VITE_APP_API_PATH}/admin/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (res.data.success) {
        setValue(name, res.data.imageUrl);
        setTempData((pre) => ({
          ...pre,
          [name]: res.data.imageUrl,
        }));
        dispatchRedux(setUploadMsg({ [property]: '' }));
      }
    } catch (error) {
      dispatchRedux(
        setUploadMsg({ [property]: '上傳失敗，請檢查檔案是否過大' })
      );
    }
  };
  return (
    <>
      <div className='form-group mb-2'>
        <label className='w-100' htmlFor={`${property}_file`}>
          或 上傳圖片
          <input
            type='file'
            id={`${property}_file`}
            className='form-control mb-1'
            value={uploadImages[property].uploadVal}
            onChange={(e) => uploadImg(e, property, id)}
          />
        </label>
        <p className='text-muted mb-1'>{uploadImages[property].uploadMsg}</p>
        <img
          className={imgUrl ? 'img-fluid' : 'd-none'}
          src={imgUrl}
          alt='productImg_preview'
        />
      </div>
    </>
  );
}

export default UploadImg;
