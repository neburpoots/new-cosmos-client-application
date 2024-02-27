import { ModalWidth } from "../enums/modalWidth.enum";
import { PaginatedResult } from "../utils/pagination";
import { SearchCriteria } from "../utils/searchCriteria";

export interface IAbstractComponent<T> {
    mapTableData: (data: any[]) => any[];
    loadFilteredItems: (searchValue: any) => Promise<void>;
    loadItems: () => Promise<void>;
    createUrlParams: () => string;
    data: PaginatedResult<T>;
    url: string;
    searchCriteria: SearchCriteria;
    tableData: any[];
    isCreateModalVisible: boolean;
    isEditModalVisible: boolean;
    isDeleteModalVisible: boolean;
}