import { RefObject } from 'react';

function DeleteModal({
  ref,
  close,
  text,
  handleDelete,
  id,
}: {
  ref: RefObject<HTMLDivElement>;
  close: () => void;
  text: string;
  handleDelete: (id?: string) => void;
  id?: string;
}) {
  return (
    <div
      ref={ref}
      className='modal fade'
      tabIndex={-1}
      id='deleteModal'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header bg-danger'>
            <h1 className='modal-title text-white fs-5' id='exampleModalLabel'>
              刪除
            </h1>
            <button
              type='button'
              className='btn-close'
              aria-label='Close'
              onClick={close}
            />
          </div>
          <div className='modal-body'>確定刪除 {text} 嗎?</div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              onClick={close}
              aria-label='Cancel'
            >
              取消
            </button>
            <button
              type='button'
              className='btn btn-danger'
              aria-label='Confirm delete'
              onClick={() => handleDelete(id)}
            >
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
