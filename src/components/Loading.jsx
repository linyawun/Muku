import { useEffect } from 'react';
function Loading({ isLoading }) {
  useEffect(() => {
    const body = document.querySelector('body');
    if (isLoading) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }
    return () => {
      body.style.overflow = 'auto';
    };
  }, [isLoading]);
  return (
    <>
      {isLoading && (
        <div className='loading'>
          <span className='loader'></span>
        </div>
      )}
    </>
  );
}
export default Loading;
