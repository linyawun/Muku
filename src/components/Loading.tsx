import { useEffect } from 'react';
function Loading({ isLoading }: { isLoading: boolean }) {
  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      body.style.overflow = isLoading ? 'hidden' : 'auto';
    }
    return () => {
      if (body) {
        body.style.overflow = 'auto';
      }
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
