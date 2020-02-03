import React from 'react';
import './index.css';

class Paginator extends React.Component {
    constructor() {
        super();

        this.countPages = 12;

        this.pages = new Array(this.countPages).fill(0).map((_, index) => index + 1);

        this.state = {
            currentPage: 1,
            startPage: 1,
            endPage: 9
        };
    }

    changeCurrentPage = action => {
        const { currentPage, startPage, endPage } = this.state;

        let newCurrentPage = currentPage;
        let newStartPage = startPage;
        let newEndPage = endPage;

        switch (action) {
            case 'increment': {
                newCurrentPage += 1;
                break;
            }

            case 'decrement': {
                newCurrentPage -= 1;
                break;
            }

            default: {
                newCurrentPage = action.params;
            }
        }

        if (newCurrentPage > endPage) {
            newEndPage += 1;
            newStartPage += 1;
        }

        if (newCurrentPage < startPage) {
            newStartPage -= 1;
            newEndPage -= 1;
        }

        this.setState({
            currentPage: newCurrentPage,
            startPage: newStartPage,
            endPage: newEndPage
        });
    };

    render() {
        const { currentPage, startPage, endPage } = this.state;

        return (
            <div className="paginator">
                <button
                    onClick={() => this.changeCurrentPage('decrement')}
                    disabled={currentPage === 1}
                >
                    -
                </button>
                {this.pages.slice(startPage - 1, endPage).map(page => (
                    <div
                        key={page}
                        className={`paginator-item${
                            page === currentPage ? ' selected-paginator-item' : ''
                        }`}
                        onClick={() => this.changeCurrentPage({ params: page })}
                    >
                        {page}
                    </div>
                ))}
                <button
                    onClick={() => this.changeCurrentPage('increment')}
                    disabled={currentPage === this.countPages}
                >
                    +
                </button>
            </div>
        );
    }
}

export default Paginator;
