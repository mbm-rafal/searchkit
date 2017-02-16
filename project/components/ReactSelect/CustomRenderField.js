import React from 'react';
import Select from 'react-select';

const ASYNC_DELAY = 500;

var CustomRenderField = React.createClass({
    displayName: 'CustomRenderField',
    propTypes: {
        delimiter:  React.PropTypes.string,
        label:      React.PropTypes.string,
        multi:      React.PropTypes.bool,
        // values:     React.PropTypes.Array
    },
    getInitialState: function() {
        return {
            multi: null
        };
    },

    componentDidMount: function() {
        this.setState({
            multi: this.props.multi
        });
    },

    getDefaultProps: function() {
        return {
            multiple:       false,
            defaultValue:   '',
            placeholder:    'Zacznij pisać',
            allowCreate:    false,
            addLabelText:   "Dodać: {label} ?",
            values:         [],
            options:        []
        };
    },

    onChangeMulti: function(event) {
        this.setState({
            multi: event.target.checked
        });
    },

    renderOption: function(option) {
        return React.createElement(
            'span',
            { style: { color: option.hex } },
            option.label,
            ' (',
            option.hex,
            ')'
        );
    },

    renderValue: function(option) {
        return React.createElement(
            'strong',
            { style: { color: option.hex } },
            option.label
        );
    },

    render: function() {
        return React.createElement(
            'div',
            { className: 'select-section' },

            this.props.label ?
            React.createElement(
                'h3',
                { className: 'select-section-heading' },
                this.props.label
            ) : null,

            <Select

                {...this.props}
                multi={this.state.multi}
                value={this.props.value || this.props.defaultValue}
                allowCreate={this.props.allowCreate}
                onChange={(val) => this.props.onChange(val)}

            />,

            this.props.multiple ?
            React.createElement(
                'div',
                { className: 'checkbox-list' },
                React.createElement(
                    'label',
                    { className: 'checkbox' },
                    React.createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.multi, onChange: this.onChangeMulti }),
                    React.createElement(
                        'span',
                        { className: 'checkbox-label' },
                        'Multi-Select'
                    )
                )
            ) : null
        );
    }
});

export default CustomRenderField;