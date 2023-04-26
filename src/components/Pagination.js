function Pagination({ pagination, changePage }) {
  return (
    <nav
      aria-label='Page navigation example'
      className=' d-flex justify-content-center'
    >
      <ul className='pagination '>
        <li className='page-item'>
          <a
            className={`page-link ${pagination.has_pre ? '' : 'd-none'}`}
            href='/'
            aria-label='Previous'
            onClick={(e) => {
              e.preventDefault();
              changePage(pagination.current_page - 1);
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
            // eslint-disable-next-line react/no-array-index-key
            <li className='page-item' key={`${i}_page`}>
              <a
                className={`page-link ${
                  i + 1 === pagination.current_page && 'active'
                }`}
                href='/'
                onClick={(e) => {
                  e.preventDefault();
                  changePage(i + 1);
                }}
              >
                {i + 1}
              </a>
            </li>
          )
        )}
        <li className='page-item'>
          <a
            className={`page-link ${pagination.has_next ? '' : 'd-none'}`}
            href='/'
            aria-label='Next'
            onClick={(e) => {
              e.preventDefault();
              changePage(pagination.current_page + 1);
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
