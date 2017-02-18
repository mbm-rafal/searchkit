import React, { Component, PropTypes  } from 'react';

const EventItem = ({name}) => (
     <li>{name}</li>
)

export default class HitItem extends React.Component {
  hideItem() {
  }

  businessOppCounter(events) {
      var counter = 0;

      events.map(function(event, i) {
          counter += event.items.length;
      });

      return counter
  }

  render() {

      let props = this.props;
      let address1 = _.get(props.result._source,'address.address', '');
      let address2 = _.get(props.result._source,'address.city','');
      let state    = _.get(props.result._source,'address.state','');
      let country  = _.get(props.result._source,'address.country','');

      return (
        <div className="col-md-12">
        <div className="property-row col-md-12 col-lg-12 nopadding">
            <div className="property-row-content col-sm-9 col-md-8">
                <h4 className="property-row-title ">
                    <b>{props.result._source.email}</b> ({props.result._source.company_name}) <br />
                    {address1}, {address2}, {state}, {country}
                </h4>
            </div>
            <div className="property-row-meta">
                <ul className="nav nav-tabs property-row-meta-item col-md-12 col-lg-12 col-xs-12" id="myTab">
                    <li onClick={this.hideItem}><a data-toggle="tab"
                                                   className="nav_tabs_a"
                                                   href={"#event" + props.index }
                    ><strong>Events ({props.result._source.events.length})</strong></a></li>
                    <li onClick={this.hideItem}>
                        <a data-toggle="tab" className="nav_tabs_a" href={"#bo" + props.index }>
                            <strong>Items ({ this.businessOppCounter(props.result._source.events) })</strong>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="tab-content col-md-12">
              <div id={"event" + props.index} className="tab-pane fade">
              EVENTS:
                  <ul className="ev_bop_list">
                  {props.result._source.events.map((item, index) =>
                      <EventItem
                          key={"event"+index}
                          name={item.name}
                      />
                  )}
                  </ul>
              </div>
              <div id={"bo" + props.index} className="tab-pane fade">
              ITEMS:
                  <ul className="ev_bop_list">
                      {props.result._source.events.map((event, index) =>
                          event.items.map((bopp,boppindex) =>
                              <EventItem
                                  key={"item"+boppindex}
                                  name={bopp.name}
                              />
                          )
                      )}
                  </ul>
              </div>
          </div>
        </div>
    </div>
      );

  }
}