import {
  SortingSelector
} from "searchkit";

export const InitialLoaderComponent = (props) => (
  <div className={"loading"} style={{"padding":"12px"}}>
        {window.translations.loading}
  </div>
)

export const FilterComponent = () => (
    <div>
        <b>Sort by: </b>
        <SortingSelector options={[
            {label:"Company Name ASC", field:"company_name.raw", order:"asc"},
            {label:"Company Name DESC", field:"company_name.raw", order:"desc"},
        ]}
        />
    </div>
)

export const CompanyItemComponent = (props) => (
    <div className={props.bemBlocks.option().state({selected:props.selected}).mix(props.bemBlocks.container("item"))} onClick={props.onClick}>
        <div className={props.bemBlocks.option("text")}>
          {_.get(window.translations, 'directory.' + props.label, props.label)}
        </div>

        <div className={props.bemBlocks.option("count")}>{props.count}</div>
    </div>
);