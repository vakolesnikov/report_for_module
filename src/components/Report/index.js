import React from 'react';
import PropTypes from 'prop-types';
import Select from '../Select';
import FilledArrowIcon from '../../ui/FilledArrowIcon';
import Paginator from '../Paginator';
import './index.css';
import { getFormattedDateTime } from '../../helpers';
import { OPERATION_TYPES, COUNTS_PAGE } from '../../constants';

export default class Report extends React.Component {
    static propTypes = {
        historyOperations: PropTypes.arrayOf(PropTypes.any).isRequired,
        loadHistoryStatus: PropTypes.string.isRequired
    };

    constructor() {
        super();

        this.state = {
            sortToTop: true,
            maxCountToPage: 5,
            currentPage: 0
        };
    }

    handleSortClick = () => {
        const { sortToTop } = this.state;

        this.setState({ sortToTop: !sortToTop });
    };

    handleChangePage = currentPage => this.setState({ currentPage });

    handleChangeMaxCount = ({ value }) => this.setState({ maxCountToPage: value });

    renderReportTable = () => {
        const { historyOperations } = this.props;
        const { sortToTop, maxCountToPage, currentPage } = this.state;

        const startIndexPages = currentPage * maxCountToPage;

        const sortedHistoryOperations = historyOperations
            .slice(startIndexPages, startIndexPages + maxCountToPage)
            .sort((operation1, operation2) => {
                if (sortToTop) {
                    return operation1.createdDate > operation2.createdDate ? 1 : -1;
                }
                return operation1.createdDate > operation2.createdDate ? -1 : 1;
            });

        return (
            <div className="order-table-container">
                <div className="report-count-select__container">
                    <span className="select-count-title">Показывать по:</span>
                    <Select
                        onChange={this.handleChangeMaxCount}
                        className="report-count-select"
                        options={COUNTS_PAGE}
                        defaultSelectOptions={COUNTS_PAGE[0]}
                    />
                </div>

                <table className="order-table">
                    <thead className="order-table-head">
                        <tr>
                            <td className="order-table-cell number-cell">№</td>
                            <td className="order-table-cell">
                                <span
                                    className={`sort-icon ${
                                        sortToTop ? ' sort-icon__to-bottom' : ''
                                    }`}
                                    onClick={this.handleSortClick}
                                >
                                    <FilledArrowIcon />
                                </span>
                                Дата создания
                            </td>
                            <td className="order-table-cell">Идентификатор отчета</td>
                            <td className="order-table-cell">Тип операции</td>
                            <td className="order-table-cell">Расход</td>
                            <td className="order-table-cell">Баланс</td>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedHistoryOperations.map((operation, index) => {
                            const {
                                operationId,
                                operationType,
                                createdDate,
                                amount,
                                balance
                            } = operation;

                            return (
                                <tr key={operation.id}>
                                    <td className="order-table-cell order-table-cell__index">
                                        {index + 1 + maxCountToPage * currentPage}
                                    </td>
                                    <td className="order-table-cell">
                                        {getFormattedDateTime(new Date(createdDate))}
                                    </td>
                                    <td className="order-table-cell order-table-cell__id">
                                        {operationId}
                                    </td>
                                    <td className="order-table-cell">
                                        {OPERATION_TYPES[operationType]}
                                    </td>
                                    <td className="order-table-cell">{amount}</td>
                                    <td className="order-table-cell">{balance}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <Paginator
                    onChange={this.handleChangePage}
                    countPages={Math.ceil(historyOperations.length / maxCountToPage)}
                />
            </div>
        );
    };

    renderReport = () => {
        const { loadHistoryStatus } = this.props;

        switch (loadHistoryStatus) {
            case 'request': {
                return <div className="report-load-status">Загрузка...</div>;
            }

            case 'failure': {
                return (
                    <div className="report-load-status">
                        В выбранные даты операций не происходило
                    </div>
                );
            }

            case 'success': {
                return this.renderReportTable();
            }

            default: {
                return (
                    <div className="report-load-status">
                        Введите необходимые данные и сформируйте отчет
                    </div>
                );
            }
        }
    };

    render() {
        return this.renderReport();
    }
}
