import React from 'react';
import Select from 'react-select';

var Contributors = React.createClass({
        displayName: 'Contributors',
        propTypes: {
            label: React.PropTypes.string,
        },

        getInitialState: function() {
            return {
                multi: true,
                value: [],
            };
        },

        getDefaultProps: function() {
            return {
                create: true,
                multi: true
            };
        },

        componentWillMount: function() {
            this.setState({
                multi: this.props.multi,
                value: (this.props.defaultValue) ? this.state.value.push([this.props.defaultValue]) : []
            });
        },

        getContributors: function(input, callback) {
            setTimeout(function() {
                callback(null, {
                    options: [
                        { value: 'one', label: 'One' },
                        { value: 'two', label: 'Two' }
                    ],
                    // CAREFUL! Only set this to true when there are no more options,
                    // or more specific queries will not be sent to the server.
                    complete: true
                });
            }, 500);

            // input = input.toLowerCase();
            // // var options = this.props.options.filter(i => {
            // //     return i.github.substr(0, input.length) === input;
            // // });

            // var options = this.props.options;
            // var data = {
            //     options: options.slice(0, MAX_CONTRIBUTORS),
            //     complete: options.length <= MAX_CONTRIBUTORS,
            // };

            // return options;
            // setTimeout(function() {
            //     callback(null, data);
            // }, ASYNC_DELAY);
        },

        onChange: function(value) {
            this.setState({
                value: value,
            });
        },
        switchToMulti: function() {
            this.setState({
                multi: true,
                value: [this.state.value],
            });
        },
        switchToSingle: function() {
            this.setState({
                multi: false,
                value: this.state.value[0],
            });
        },
        render: function() {

            var options = [
                { label: 'Basic customer support', value: 'basic', color: '#E31864' },
                { label: 'Premium customer support', value: 'premium', color: '#6216A3' },
                { label: 'Pro customer support', value: 'pro', disabled: true, link: false },
            ];

            return (
                <div className="section">
                    <h3 className="section-heading">{this.props.label}</h3>

                    <UX.CustomComponents
                            // multi={this.state.multi}
                            // value={this.state.value}
                            // onChange={this.onChange}
                            // onValueClick={this.gotoContributor}

                            // labelKey="name"
                            // loadOptions={this.getContributors}
                             />

                    <div className="hint">Wybierz lub dodaj nową pozycję</div>
                </div>
            );
        }
    });

/*


import React from 'react';

var Contributors = React.createClass({


    /*


    },



    render: function() {
        return (
            <div className="section">
                <h3 className="section-heading">{this.props.label}</h3>
                <Select.Async multi={this.state.multi} value={this.state.value} onChange={this.onChange} onValueClick={this.gotoContributor} valueKey="github" labelKey="name" loadOptions={this.getContributors} />
                <div className="checkbox-list">
                    <label className="checkbox">
                        <input type="radio" className="checkbox-control" checked={this.state.multi} onChange={this.switchToMulti}/>
                        <span className="checkbox-label">Multiselect</span>
                    </label>
                    <label className="checkbox">
                        <input type="radio" className="checkbox-control" checked={!this.state.multi} onChange={this.switchToSingle}/>
                        <span className="checkbox-label">Single Value</span>
                    </label>
                </div>
                <div className="hint">This example implements custom label and value properties, async options and opens the github profiles in a new window when values are clicked</div>
            </div>

        );
    }

});

export default Contributors;
*/

/*


import React from 'react';

var Contributors = React.createClass({


	/*

	getContributors (input, callback) {
		input = input.toLowerCase();
		var options = this.props.contributors.filter(i => {
			return i.github.substr(0, input.length) === input;
		});
		var data = {
			options: options.slice(0, MAX_CONTRIBUTORS),
			complete: options.length <= MAX_CONTRIBUTORS,
		};
		setTimeout(function() {
			callback(null, data);
		}, ASYNC_DELAY);
	},



	render: function() {
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select.Async multi={this.state.multi} value={this.state.value} onChange={this.onChange} onValueClick={this.gotoContributor} valueKey="github" labelKey="name" loadOptions={this.getContributors} />
				<div className="checkbox-list">
					<label className="checkbox">
						<input type="radio" className="checkbox-control" checked={this.state.multi} onChange={this.switchToMulti}/>
						<span className="checkbox-label">Multiselect</span>
					</label>
					<label className="checkbox">
						<input type="radio" className="checkbox-control" checked={!this.state.multi} onChange={this.switchToSingle}/>
						<span className="checkbox-label">Single Value</span>
					</label>
				</div>
				<div className="hint">This example implements custom label and value properties, async options and opens the github profiles in a new window when values are clicked</div>
			</div>

		);
	}

});

export default Contributors;
*/