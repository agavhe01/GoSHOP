import React from 'react';
import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

function Paginate({ pages, page, keyword = '', isAdmin = false }) {
  if (keyword) {
    keyword = keyword.split('?keyword=')[1].split('&')[0];
  }

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <Link
            key={x + 1}
            to={
              !isAdmin
                ? `/?keyword=${keyword}&page=${x + 1}`
                : `/admin/productlist/?keyword=${keyword}&page=${x + 1}`
            }
          >
            <Pagination.Item disabled={x + 1 !== page} active s>
              {x + 1}
            </Pagination.Item>
          </Link>
        ))}
      </Pagination>
    )
  );
}

export default Paginate;
