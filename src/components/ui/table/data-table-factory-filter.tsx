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
import {
  DataTableFilterSelect,
  DataTableSelectProps,
} from "@/components/ui/table/data-table-select";

export enum DataTableComponentType {
  Search = "search",
  FilterBox = "filterBox",
  ResetFilter = "resetFilter",
  FilterDate = "filterDate",
  Select = "filterSelect",
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
    }
  | {
      type: DataTableComponentType.Select;
      props: DataTableSelectProps;
    };

const DataTableComponentFactory: React.FC<DataTableComponentProps> = ({
  type,
  props,
}) => {
  switch (type) {
    case DataTableComponentType.Search:
      return <DataTableSearch {...(props as DataTableSearchProps)} />;
    case DataTableComponentType.FilterBox:
      return <DataTableFilterBox {...(props as DataTableFilterBoxProps)} />;
    case DataTableComponentType.ResetFilter:
      return <DataTableResetFilter {...(props as DataTableResetFilterProps)} />;
    case DataTableComponentType.Select:
      return <DataTableFilterSelect {...(props as DataTableSelectProps)} />;
    case DataTableComponentType.FilterDate:
      return <></>;
    default:
      throw new Error(`Unknown component type: ${type}`);
  }
};

export default DataTableComponentFactory;
