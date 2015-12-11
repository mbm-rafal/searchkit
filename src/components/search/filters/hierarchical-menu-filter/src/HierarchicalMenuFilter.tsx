import * as React from "react";
import * as _ from "lodash";
import * as classNames from 'classnames';
import "../styles/index.scss";

import {
	SearchkitComponent,
  HierarchicalFacetAccessor,
	FastClick
} from "../../../../../core"

export interface IHierarchicalMenuFilter {
	id:string
	fields:Array<string>
	title:string
}

export class HierarchicalMenuFilter extends SearchkitComponent<IHierarchicalMenuFilter, any> {
	public accessor:HierarchicalFacetAccessor

	constructor(props:IHierarchicalMenuFilter) {
		super(props)
	}

	shouldCreateNewSearcher() {
		return true;
	}

	defineAccessor() {
		return new HierarchicalFacetAccessor(
			this.props.id,
			{id:this.props.id, title:this.props.title, fields:this.props.fields}
		)
	}

	addFilter(option, level) {
		if (this.accessor.state.contains(level, option.key)) {
			// if clicked on leaf then toggle off the option
			// else remove all child options
			if (this.accessor.state.isLeafLevel(level)) {
				this.accessor.state = this.accessor.state.clear(level);
			} else {
				this.accessor.state = this.accessor.state.removeChilds(level);
			}
		} else {
			this.accessor.state = this.accessor.state.clear(level);
			this.accessor.state = this.accessor.state.add(level, option.key);
		}

		this.searchkit.performSearch()
	}

	renderOption(level, option) {

		var className = classNames({
			"hierarchical-menu-option--selected":this.accessor.state.contains(level, option.key),
			"hierarchical-menu-option":true
		})

		return (
			<div key={option.key}>
				<FastClick handler={this.addFilter.bind(this, option,level)}>
					<div className={className}>
						<div className="hierarchical-menu-option__text">{this.translate(option.key)}</div>
						<div className="hierarchical-menu-option__count">{option.doc_count}</div>
					</div>
				</FastClick>
					{(() => {
						if(this.accessor.resultsState.contains(level,option.key)) {
							return this.renderOptions(level+1);
						}
					})()}
			</div>
		)
	}

	renderOptions(level) {
		return (
			<div className="hierarchical-menu-list__hierarchical-options">
			{_.map(this.accessor.getBuckets(level), this.renderOption.bind(this,level))}
			</div>
		)
	}

  render(){
		var className = classNames({
			"hierarchical-menu-list":true,
			[`filter--${this.props.id}`]:true
		})
    return (
			<div className={className}>
				<div className="hierarchical-menu-list__header">{this.props.title}</div>
				<div className="hierarchical-menu-list__root">
					{this.renderOptions(0)}
				</div>
			</div>
		)
	}

}
