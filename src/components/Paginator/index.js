import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import ArrowIcon from '../../ui/ArrowIcon';

class Paginator extends React.Component {
    static propTypes = {
        countPages: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        const { countPages } = this.props;

        this.countPages = countPages;
        this.pages = new Array(countPages).fill(0).map((_, index) => index);

        this.state = {
            currentPage: 0,
            startPage: 0,
            endPage: countPages
        };
    }

    changeCurrentPage = action => {
        const { onChange } = this.props;
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

        onChange(newCurrentPage);
    };

    render() {
        const { currentPage, startPage, endPage } = this.state;

        return (
            <div className="paginator">
                <button
                    onClick={() => this.changeCurrentPage('decrement')}
                    disabled={currentPage === 0}
                    className="decrement-button paginator-button"
                    type="button"
                >
                    <ArrowIcon />
                </button>
                {this.pages.slice(startPage, endPage).map(page => (
                    <div
                        key={page}
                        className={`paginator-item${
                            page === currentPage ? ' selected-paginator-item' : ''
                        }`}
                        onClick={() => this.changeCurrentPage({ params: page })}
                    >
                        {page + 1}
                    </div>
                ))}
                <button
                    onClick={() => this.changeCurrentPage('increment')}
                    disabled={currentPage === this.countPages}
                    className="increment-button paginator-button"
                    type="button"
                >
                    <ArrowIcon />
                </button>
            </div>
        );
    }
}

export default Paginator;
