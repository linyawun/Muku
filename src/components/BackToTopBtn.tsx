import { useEffect, useState } from 'react';

function BackToTopBtn() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          aria-label='Back to top'
          className='btn btn-primary btn-lg back-to-top-button d-flex justify-content-center'
          onClick={scrollToTop}
        >
          <i className='bi bi-arrow-up text-white'></i>
        </button>
      )}
    </>
  );
}

export default BackToTopBtn;
