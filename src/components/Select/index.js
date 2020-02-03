import React from 'react';
import PropTypes from 'prop-types';
import UserIcon from '../../ui/UserIcon';
import ArrowIcon from '../../ui/ArrowIcon';
import './index.css';

export default class Select extends React.Component {
    static propTypes = {
        options: PropTypes.arrayOf(PropTypes.any).isRequired,
        defaultSelectOptions: PropTypes.object,
        onChange: PropTypes.func.isRequired,
        className: PropTypes.string.isRequired,
        title: PropTypes.string,
        OptionIcon: PropTypes.func,
        SelectIcon: PropTypes.func
    };

    static defaultProps = {
        defaultSelectOptions: { title: 'Не выбрано', value: null },
        OptionIcon: null,
        SelectIcon: null,
        title: ''
    };

    constructor(props) {
        super(props);

        const { defaultSelectOptions } = this.props;

        this.state = {
            showOptions: false,
            selectedOption: defaultSelectOptions
        };
    }

    handleOptionClick = option => {
        const { onChange } = this.props;

        this.setState({ selectedOption: option });
        onChange(option);
    };

    render() {
        const { showOptions, selectedOption } = this.state;
        const { options, title, OptionIcon, SelectIcon, className } = this.props;

        return (
            <div
                className={className}
                onClick={() => this.setState({ showOptions: !showOptions })}
            >
                {SelectIcon && (
                    <div className="user-icon">
                        <UserIcon />
                    </div>
                )}

                {title && <div className="select-title">{title}</div>}

                <div className="option-text">{selectedOption.title}</div>

                <div className={`arrow-icon${showOptions ? ' arrow-icon-rotate' : ''}`}>
                    <ArrowIcon />
                </div>
                {showOptions && (
                    <div className="options-container">
                        {options.map(option => (
                            <div
                                key={option.title}
                                className="option-item option-text"
                                onClick={() => this.handleOptionClick(option)}
                            >
                                {OptionIcon && (
                                    <div className="option-item-icon">
                                        <OptionIcon />
                                    </div>
                                )}

                                {option.title}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}
