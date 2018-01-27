import React from 'react'

import ReactPaginate from 'react-paginate'

export default class Pagination extends React.Component {
    render() {
        return (
            <ReactPaginate
                {...this.props}
                disableInitialCallback={true}
                previousLabel={'Précédent'}
                nextLabel={'Suivant'}
                breakLabel={<a href="#" className="page-link">...</a>}
                breakClassName={'pagination-items page-item disable'}
                containerClassName={'pagination pagination-gap'}
                pageClassName={'pagination-items page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'pagination-items page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'pagination-items page-item'}
                nextLinkClassName={'page-link'}
                activeClassName={'active'} />
        )
    }
}
