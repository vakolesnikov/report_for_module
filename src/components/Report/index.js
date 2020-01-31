import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import { getFormattedDate } from '../../helpers';

const REPORT_TITLES = ['№', 'Дата', 'ID операции', 'Тип операции', 'Сумма', 'Баланс'];

export default class Report extends React.Component {
    static propTypes = {
        historyOperations: PropTypes.arrayOf(PropTypes.any).isRequired,
        loadHistoryStatus: PropTypes.string.isRequired
    };

    renderReportTitles = () =>
        REPORT_TITLES.map(title => (
            <td key={title} className="order-table-cell">
                {title}
            </td>
        ));

    renderReportTable = () => {
        const { historyOperations } = this.props;

        return (
            <table className="order-table">
                <thead className="order-table-head">
                    <tr>{this.renderReportTitles()}</tr>
                </thead>
                <tbody>
                    {historyOperations.map((operation, index) => {
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
                                    {index + 1}
                                </td>
                                <td className="order-table-cell">
                                    {getFormattedDate(new Date(createdDate))}
                                </td>
                                <td className="order-table-cell order-table-cell__id">
                                    {operationId}
                                </td>
                                <td className="order-table-cell">{operationType}</td>
                                <td className="order-table-cell">{amount}</td>
                                <td className="order-table-cell">{balance}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
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
                return null;
            }
        }
    };

    render() {
        return <>{this.renderReport()}</>;
    }
}
