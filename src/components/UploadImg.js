import { Input } from './FormElement';
function UploadImg() {
  return (
    <>
      <div className='form-group mb-2'>
        <Input
          register={register}
          errors={errors}
          id='imageUrl'
          type='text'
          labelText='主圖網址*'
          placeholder='請輸入圖片連結'
          rules={{
            required: {
              value: true,
              message: '圖片網址為必填',
            },
          }}
          onChange={(e) =>
            setTempData((pre) => ({
              ...pre,
              imageUrl: e.target.value,
            }))
          }
        />
      </div>
      <div className='form-group mb-2'>
        <label className='w-100' htmlFor='customFile'>
          或 上傳圖片
          <input
            type='file'
            id='customFile'
            className='form-control mb-2'
            value={uploadImgVal}
            onChange={uploadImg}
          />
        </label>
        <p className='text-muted'>{uploadImgMsg}</p>
        <img
          className={imageUrl ? 'img-fluid' : 'd-none'}
          src={imageUrl}
          alt='product_mainImg'
        />
      </div>
    </>
  );
}

export default UploadImg;
