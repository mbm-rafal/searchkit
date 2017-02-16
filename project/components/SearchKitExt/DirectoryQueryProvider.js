
const assign = require("lodash/assign")
const get = require("lodash/get")
const set = require("lodash/set")
const concat = require("lodash/concat")

import {
  TermsQuery,
  FilterBucket,
  NestedBucket,
  NestedQuery,
  BoolMust,
  CustomAggregator
} from "searchkit";

interface IDirectoryQueryProvider {
  events?:Array
  // containerComponent?: RenderComponentType<any>
  // rangeComponent?: RenderComponentType<RangeProps>
  // rangeFormatter?:(count:number)=> number | string
  // marks?:Object
  // fieldOptions?:FieldOptions
}


class DirectoryQueryProvider {
    constructor (events = [], naics = [], roles = []) {
        this.events = events
        this.naics = naics
        this.roles = roles
    }

    getGlobalQuery() {
        let elements = [];

        if (this.events.length) {
            elements.push([NestedQuery("events", TermsQuery("events.id", this.events))]);
        }

        if (this.naics.length) {
            elements.push([NestedQuery("events.categories", TermsQuery("events.categories.value", this.naics))]);
        }

        if (this.roles.length) {
            elements.push([NestedQuery("events.role", TermsQuery("events.role.name", this.roles))]);
        }

        if (elements.length) {
          return BoolMust(elements);
        }

        return null
    }

    getAggregatorFor(key) {
      switch (key) {
        case "events.name":
          return null;
        break;

        case "events.role.name":
          return this._getEventsNestedBucket()
        break;

        case "events.categories.value":
          return this._getEventsNestedBucket()
        break;

        case "events.profile_attributes":
          return this._getEventsNestedBucket()
        break;
      }

      throw new Error("Invalid aggregator definition for key: " + key );
    }

    _getEventsNestedBucket() {
      if (this.events.length)
        return new CustomAggregator(
          ["events.filter", "parent.filtered", "inner", "filtered.aggs"],
          function(fieldContext, ...aggs) {
              return [NestedBucket(
                "events.filter",
                "events", // path
                FilterBucket(
                  "parent.filtered",
                  TermsQuery("events.id", this.events), // TODO: Append other filters
                  ...fieldContext.getAggregations(...aggs)
                )
              )];
          }.bind(this)
        );

      return null;
    }

    getFilterFor(key) {
      switch (key) {

        case "events.name":
          if (this.events.length)
            return TermsQuery("events.id", this.events);

          return {};
        break;

        case "events.role.name":
          if (this.roles.length)
            return TermsQuery("events.role.name", this.roles);

          return {};
        break;

        case "events.categories.value":
          if (this.naics.length)
            return TermsQuery("events.categories.value", this.naics);

          return {};
        break;

        case "events.profile_attributes":

          return {};
        break;
      }

      throw new Error("Invalid filter definition for key: " + key );
    }
}

export default DirectoryQueryProvider;