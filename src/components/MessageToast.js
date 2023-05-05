// import { useContext } from 'react';
// import { MessageContext } from '../store/messageStore';
import { useSelector } from 'react-redux';
function Message() {
  //const [message, setMessage] = useState({});
  //在useContext內，可用context取得資料
  // const [message] = useContext(MessageContext); //useContext 會回傳reducer，reducer解構得到message和dispatch方法
  const messages = useSelector((state) => state.message);
  console.log(messages);
  return (
    <>
      <div
        className='toast-container position-fixed'
        style={{ top: '64px', right: '15px' }}
      >
        {/* {message.title && (
          <div
            className='toast show'
            role='alert'
            aria-live='assertive'
            aria-atomic='true'
            data-delay='3000'
          >
            <div className={`toast-header text-white bg-${message.type}`}>
              <strong className='me-auto'>{message.title}</strong>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='toast'
                aria-label='Close'
              />
            </div>
            <div className='toast-body'>{message.text}</div>
          </div>
        )} */}
      </div>
    </>
  );
}

export default Message;
