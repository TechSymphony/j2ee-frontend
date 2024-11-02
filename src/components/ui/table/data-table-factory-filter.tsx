import {
    DataTableFilterBox,
    DataTableFilterBoxProps,
} from "./data-table-filter-box";
import {
    DataTableResetFilter,
    DataTableResetFilterProps,
} from "./data-table-reset-filter";
import { DataTableSearch, DataTableSearchProps } from "./data-table-search";
import { DataTableFilterDateProps } from "./data-table-filter-date";

export enum DataTableComponentType {
    Search = "search",
    FilterBox = "filterBox",
    ResetFilter = "resetFilter",
    FilterDate = "filterDate",
}

export type DataTableComponentProps =
    | { type: DataTableComponentType.Search; props: DataTableSearchProps }
    | { type: DataTableComponentType.FilterBox; props: DataTableFilterBoxProps }
    | {
          type: DataTableComponentType.FilterDate;
          props: DataTableFilterDateProps;
      }
    | {
          type: DataTableComponentType.ResetFilter;
          props: DataTableResetFilterProps;
      };

const DataTableComponentFactory: React.FC<DataTableComponentProps> = ({
    type,
    props,
}) => {
    switch (type) {
        case DataTableComponentType.Search:
            return <DataTableSearch {...(props as DataTableSearchProps)} />;
        case DataTableComponentType.FilterBox:
            return (
                <DataTableFilterBox {...(props as DataTableFilterBoxProps)} />
            );
        case DataTableComponentType.ResetFilter:
            return (
                <DataTableResetFilter
                    {...(props as DataTableResetFilterProps)}
                />
            );
        case DataTableComponentType.FilterDate:
            return <></>;
        default:
            throw new Error(`Unknown component type: ${type}`);
    }
};

export default DataTableComponentFactory;
