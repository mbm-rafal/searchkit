
import React, { Component, PropTypes  } from 'react';
import MultiSelect from './SearchKitExt/MultiSelect.js';

import {
  CompanyItemComponent
} from './SearchKitExt/DirectoryComponents';

import HitItem from './SearchKitExt/DirectoryHitItem';
import DirectoryQueryProvider from './SearchKitExt/DirectoryQueryProvider';

import {
  SearchkitManager,
  SearchkitProvider,
  SearchBox,
  Hits,
  NoHits,
  InitialLoader,
  HitItemProps,
  MenuFilter,
  Panel,
  TermsQuery,

  CustomAggregator,
  FilterBucket
} from "searchkit";

// layout components
import {
  Layout, TopBar, LayoutBody, LayoutResults,
  ActionBar, ActionBarRow, SideBar, RefinementListFilter,
  HitsStats, SelectedFilters, ResetFilters, GroupedSelectedFilters,
  Pagination, Tabs,
  CheckboxItemList, Select, ItemList, ItemHistogramList,
  RangeFilter
} from "searchkit"

class FasetDirectoryListing extends React.Component {

  render() {

      const searchkit = new SearchkitManager("https://search-testing-1-4co5g2sonm67jboa5767dixy44.us-east-1.es.amazonaws.com/mbm.test.v1/");

      let queryProvider = new DirectoryQueryProvider(
        this.props.filters.events || [],
        this.props.filters.naics  || [],
        this.props.filters.roles  || []
      );

      let gQuery;

      // if (gQuery = queryProvider.getGlobalQuery()) {
      //   searchkit.addDefaultQuery((query)=> {
      //     return query.addQuery(gQuery);
      //   })
      // }

      return (
        <SearchkitProvider searchkit={searchkit}>
            <Layout>
              <LayoutBody>
                <LayoutResults>
                  <ActionBar>

                    <ActionBarRow>
                      <GroupedSelectedFilters/>
                      <ResetFilters/>

                      <HitsStats />
                    </ActionBarRow>

                    <ActionBarRow>
                        <MenuFilter
                            id="role"
                            title="Role"
                            field="events.role.name"
                            operator="AND"
                            fieldOptions={{
                              type:'nested',
                              options:{
                                path:'events.role'
                              }
                              // ,
                              // customAggregator: queryProvider.getAggregatorFor("events.role.name"),
                              // filter:           queryProvider.getFilterFor("events.role.name"),
                            }}
                            listComponent={Tabs}
                        />
                    </ActionBarRow>
                  </ActionBar>

                  <Hits
                    mod="sk-hits-grid"
                    hitsPerPage={20}
                    itemComponent={function(props) {
                        return <HitItem
                          {...props}
                          config={this.props.config}
                        />
                    }.bind(this)}
                    highlightFields={["events"]}
                    sourceFilter={["email", "company_name", "events", "full_name", "state", "country", "avatar", "revenue", "address", "url"]}
                  />

                  <NoHits/>
                  <Pagination showNumbers={true}/>

                </LayoutResults>

                 <SideBar>

                    <SearchBox
                      autofocus={true}
                      searchOnChange={true}
                      placeholder={"Search for match"}
                      prefixQueryFields={["email^1","company_name^2","full_name^2", "event.name^3"]} />

                    <Panel title="Profile attributes" collapsable={true} defaultCollapsed={false}>
                      <RefinementListFilter
                          id="profile_attributes_pc"
                          title={"Test"}
                          operator="AND"
                          field="events.profile_attributes.product_certs.attributes.key"
                          listComponent={CheckboxItemList}
                          size={5}
                          fieldOptions={{
                            type:'nested',
                            options:{
                              path:'events.profile_attributes.product_certs.attributes'
                            }
                            // ,
                            // customAggregator: queryProvider.getAggregatorFor("events.profile_attributes"),
                            // filter:           queryProvider.getFilterFor("events.profile_attributes"),
                          }} />
                    </Panel>

                    <RefinementListFilter
                        id="categories"
                        title="CATEGORIES"
                        field="events.categories.value"
                        operator="AND"
                        listComponent={MultiSelect}
                        size={10000}
                        fieldOptions={{
                          type:'nested',
                          options:{
                            path:'events.categories'
                          }
                          //,
                          // customAggregator: queryProvider.getAggregatorFor("events.categories.value"),
                          // filter:           queryProvider.getFilterFor("events.categories.value"),
                        }} />

                    {/*
                    <Panel title="Revenue" collapsable={true} defaultCollapsed={false}>
                      <RangeFilter
                          field="revenue.2016"
                          id="revenue2016"
                          min={10000}
                          max={5000000}
                          showHistogram={true}
                          title="2016"
                          fieldOptions={{type:'nested', options:{ path:'revenue' }}}
                      />
                    </Panel>
                    */}

                    <RefinementListFilter
                        id="event_name"
                        title="Events"
                        operator="AND"
                        field="events.name"
                        listComponent={CheckboxItemList}
                        fieldOptions={{
                          type:'nested',
                          options:{
                            path:'events'
                          }
                          //,
                          // customAggregator: queryProvider.getAggregatorFor("events.name"),
                          // filter:           queryProvider.getFilterFor("events.name"),
                        }}
                        size={5} />

                </SideBar>
              </LayoutBody>
              <br />
            </Layout>
          </SearchkitProvider>
      );
  }
}

FasetDirectoryListing.defaultProps = {
    config: {
      mode: 'global',
      owner_id: null,
      event: null,
    },
    filters:  [],
};

export default FasetDirectoryListing;
