import { TPagination } from '@/types';

function Pagination({
  pagination,
  changePage,
}: {
  pagination: TPagination;
  changePage: (page: number | string) => void;
}) {
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  };
  return (
    <nav
      aria-label='Page navigation example'
      className=' d-flex justify-content-center'
    >
      <ul className='pagination '>
        <li className='page-item'>
          <a
            className={`page-link ${!pagination.has_pre && 'd-none'}`}
            href='/'
            aria-label='Previous'
            onClick={(e) => {
              e.preventDefault();
              if (pagination.current_page) {
                changePage(Number(pagination.current_page) - 1);
                scrollToTop();
              }
            }}
          >
            <i className='bi bi-chevron-left'></i>
          </a>
        </li>
        {[...new Array(pagination.total_pages)].map(
          (
            _,
            i //i 從0開始，頁數從1開始
          ) => (
            <li className='page-item' key={`${i}_page`}>
              <a
                className={`page-link ${
                  i + 1 === pagination.current_page && 'active'
                }`}
                href='/'
                onClick={(e) => {
                  e.preventDefault();
                  changePage(i + 1);
                  scrollToTop();
                }}
              >
                {i + 1}
              </a>
            </li>
          )
        )}
        <li className='page-item'>
          <a
            className={`page-link ${!pagination.has_next && 'd-none'}`}
            href='/'
            aria-label='Next'
            onClick={(e) => {
              e.preventDefault();
              if (pagination.current_page) {
                changePage(Number(pagination.current_page) + 1);
                scrollToTop();
              }
            }}
          >
            <i className='bi bi-chevron-right'></i>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
