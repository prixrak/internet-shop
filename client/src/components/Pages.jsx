import { observer } from 'mobx-react-lite';
import { Pagination } from 'react-bootstrap';

const Pages = observer(({store}) => {
  const pageCount = Math.ceil(store.totalCount / store.limit)
  const pages = []
  for (let i = 0; i < pageCount; i++) pages.push(i + 1);

  return (
    <Pagination className='mt-4'>
      {pages.map(page => 
        <Pagination.Item 
          activeLabel = "" // to delete signature of (current)
          key={page}
          active={store.page === page}
          onClick={() => store.setPage(page)}
        >
          {page}
        </Pagination.Item>
      )}
    </Pagination>
  );
});

export default Pages;