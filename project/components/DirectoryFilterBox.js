var _ = require('lodash');

import React, { Component, PropTypes  } from 'react';
import update from 'react-addons-update';
import Button from 'react-button';
import JSONConsoleComponent from './JSONConsoleComponent.js';
import NaicsSelectComponent from './NaicsSelectComponent.js';

import { Modal, OverlayTrigger } from 'react-bootstrap';

const SubmitButton = ({ onClick }) => {
  return (
    <div>
      <Button className={"btn btn-block btn-success pull-right btn-icon-block"} onClick={onClick}>{tt('search_btn')}</Button>
    </div>
  );
}

const ClearButton = ({ onClick }) => {
  return (
    <div>
      <Button className={"btn btn-block btn-danger pull-right btn-icon-block"} onClick={onClick}>{tt('clear_btn')}</Button>
    </div>
  );
}

const HistoryButton = ({ onClick }) => {
  return (
    <div>
      <Button className={"btn btn-block btn-info pull-right btn-orange btn-icon-block"} onClick={onClick}>{tt('history_btn')}</Button>
    </div>
  );
}

/**
 * OnOpen load filters if not loaded
 * @param  {[type]} options.count   [description]
 * @param  {[type]} options.onClick [description]
 * @return {[type]}                 [description]
 */
const AddFilterButton = ({ count, onClick }) => {
  return (
    <div>
      <Button className={"btn btn-block btn-info pull-right"} onClick={onClick}>
        <span>{tt('add_filter_btn')}</span><span className="filter-counter">{count}</span>
      </Button>
    </div>
  );
}

const FilterModal = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} bsSize={"large"}>
      <Modal.Header closeButton>
        <Modal.Title>{tt('filter_header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Text in a modal</h4>
        <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

        <hr />

        <h4>Overflowing text to show scroll behavior</h4>
        <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
        <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
        <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
        <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
        <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
        <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

class DirectoryFilterBox extends React.Component {

  constructor(props)
  {
    super(props);

    // Set initial state
    this.state = _.merge(this.state, {
        showModal: false,
        filter: props.filter
    });
  }

  countSelectedFilters()
  {
      return 2;
  }

  clearForms()
  {
    // TMP clearing NAICS Component select2
    jQuery("#NaicsSelectComponent").select2('data', null);

    // Clear filters
    this.setState({
      filter: {},
    });

    this.props.onUpdate({}, true);
  }

  onFilterUpdate(type, value)
  {
    // Create helper object
    let _o = { filter: {} };

    // Set applicable values
    _o.filter[type] = {$set: value};

    let _filter = update(this.state, _o);

    // Update state
    this.setState(_filter);

    // Provide filter object
    this.props.onUpdate(_filter.filter);
  }

  open() {
    this.setState({ showModal: true });
  }

  close() {
    this.setState({ showModal: false });
  }

  render() {
    return (
        <div>
          <h3>Filter box component</h3>

          {this.props.infoText ?
            <div className="well well-small" dangerouslySetInnerHTML={{__html: this.props.infoText}} />
            : null}

          <input
              className={"form-control"}
              placeholder={tt('dir_filter_search_by_org_name')}
              value={this.state.filter.search_text || ''}
              onChange={(e) => this.onFilterUpdate("search_text", e.target.value)}
          /><br />

          <FilterModal
            onClose={this.close.bind(this)}
            show={this.state.showModal}
          />

          <NaicsSelectComponent
            id={"NaicsSelectComponent"}
            eventId={this.props.config.event}
            userType={this.props.config.userType}
            onUpdate={(component) => this.onFilterUpdate('naics', component.getValue())}
            selected={this.state.filter.naics}
          />

          <div className="row" style={{paddingTop: '8px'}}>
            <div className="col-md-6 col-sm-6 col-xs-12">
              <div className="pull-left matches-action-column">
                <AddFilterButton
                  count={this.countSelectedFilters()}
                  onClick={this.open.bind(this)}
                />
              </div>
              <div className="pull-left matches-action-column">
                <SubmitButton
                  onClick={this.props.onSearch.bind(this)}
                />
              </div>
              <div className="pull-left matches-action-column">
                <ClearButton
                  onClick={this.clearForms.bind(this)}
                />
              </div>
              <div className="pull-left matches-action-column">
                <HistoryButton
                  submit_text={"Search"}
                  onClick={() => console.log('test')}
                />
              </div>
            </div>
          </div>

          <br />
          {this.props.console ?
          <JSONConsoleComponent json={this.state} />
          : null}
        </div>
    );
  }
}

DirectoryFilterBox.propTypes = {
    // initialCount: React.PropTypes.number
};

DirectoryFilterBox.defaultProps = {
    api:            null,
    config:         {
      event: null,
      userType: null,
      participantId: null
    },
    infoText:       null,
    filters:        [],
    filter:         {},
    onUpdate:       function(filters) { console.log(filters); },
    onSearch:       function(component) { console.log('Search for data!'); },
    console:        false,
};

export default DirectoryFilterBox;