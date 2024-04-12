import dayjs from "dayjs";
import { TableHead } from "../utils/tableHead";

interface filterOptions {
    label: string;
    id: number;
    keyWord: string;
}

export interface filterInput {
    column: any;
    filterTypes: any;
    id: number;
    selectedFilterType: any;
    value: string;
    range: any[];
}

export const filterTypes: filterOptions[] = [

    //Strings
    { label: 'Exact match', id: 1, keyWord: 'equalTo' },
    { label: 'Contains', id: 2, keyWord: 'includesInsensitive' },
    { label: 'Range of items', id: 3, keyWord: 'inExpansive' },

    //Numbers
    { label: 'Exact match', id: 4, keyWord: 'equalTo' },
    { label: 'Greater than', id: 5, keyWord: 'greaterThan' },
    { label: 'Smaller than', id: 6, keyWord: 'lessThan' },
    { label: 'Range of items', id: 7, keyWord: 'inExpansive' },

    //Booleans
    { label: 'True', id: 8, keyWord: 'equalTo' },
    { label: 'False', id: 9, keyWord: 'equalTo' },

    //Dates
    { label: 'Exact date', id: 10, keyWord: 'equalTo' },
    { label: 'After this date', id: 11, keyWord: 'greaterThanOrEqualTo' },
    { label: 'Before this date', id: 12, keyWord: 'lessThanOrEqualTo' },
]

export class FilterBuilder {

    //these are the current filters that are applied
    currentFilters: any[];

    //these are the current filter inputs that are applied
    currentFilterInputs: filterInput[] = [];

    //these are the filter inputs that are displayed in the filter popup
    filterInputs: filterInput[] = [];

    //global search value for the search bar top left of table
    globalSearch: string | null = null;

    //all columns that are string which can be searched by global search
    searchableColumns: string[] = [];

    columns: TableHead<any>[] = [];

    columnTypes: string[] = [];

    baseTableRow: any;

    constructor() {
        this.currentFilters = [];
        this.addFilterInput();
    }

    //calculates the type of the filter based upon the first row of the data
    getColumnType(key: string, tableBaseRow: any, isValidDate : (date : string) => boolean): string {

        console.log(tableBaseRow[key]);
        console.log(typeof tableBaseRow[key].value);

        let type: string = typeof tableBaseRow[key].value;

        //check if the column is a date
        if (type == 'string') {
            if (isValidDate(tableBaseRow[key].value)) {
                type = 'datetime';
            }
        }

        if (type == 'string') {
            this.searchableColumns.push(key);
        }

        return type;
    }

    async setUpColumnTypes(columns : TableHead<any>[], tableBaseRow: any, isValidDate : (date : string) => boolean): Promise<void> {
        
        this.columns = await columns.map((column) => {
            column.type = this.getColumnType(column.key, tableBaseRow, isValidDate);
            return column
        })

        console.log(this.columns)
    }

    //adds a empty filter to the filerinput array
    async addFilterInput(): Promise<void> {
        this.filterInputs.push({
            column: null,
            filterTypes: null,
            id: this.filterInputs.length + 1,
            selectedFilterType: null,
            value: '',
            range: []
        });
    }

    //deletes a single filter
    async deleteFilterInput(id: number): Promise<void> {
        this.filterInputs = this.filterInputs.filter((filterInput) => filterInput.id !== id);
    }


    //gets the filters for the different selects
    async getFilterOptionsForType(type: string): Promise<any> {
        switch (type) {
            case 'string':
                return filterTypes.slice(0, 3);
            case 'number':
                return filterTypes.slice(3, 7);
            case 'boolean':
                return filterTypes.slice(7, 9);
            case 'datetime':
                return filterTypes.slice(9, 12);
            default:
                return []
        }
    }

    //handles the date filter
    handleDateFilter(filterInput: filterInput): any {
        let id = filterInput.selectedFilterType.id;

        const date = dayjs(filterInput.value);

        if (!date.isValid()) {
            throw new Error('Invalid date on date filter');
        }

        const fomattedDate = date.format('YYYY-MM-DDTHH:mm:ss[Z]');

        if ([11, 12].includes(id)) {
            return {
                [filterInput.column]: { [filterInput.selectedFilterType.keyWord]: fomattedDate }
            }
        } else {
            const endDate = date.add(1, 'day').format('YYYY-MM-DDTHH:mm:ss[Z]');

            return {
                [filterInput.column]: {
                    greaterThanOrEqualTo: fomattedDate,
                    smallerThanOrEqualTo: endDate
                }
            }
        }
    }

    //handles the global search
    async handleGlobalSearch(): Promise<any> {

        let orFilter = await this.searchableColumns.map((column) => {
            return { [column]: { includesInsensitive: this.globalSearch } }
        })

        console.log(orFilter)

        if (this.globalSearch) {
            return {
                or: orFilter
            }
        }

        return null;
    }

    //gets the active filters for the request
    async getFilters(): Promise<any> {

        //this line makes sure that when the the filters are changed and not saved
        //the current filters are still used and are able to be recovered
        this.currentFilterInputs = this.filterInputs;

        this.currentFilters = this.filterInputs.map((filterInput) => {

            let id = filterInput.selectedFilterType?.id;

            //ignore an empty filter
            if (!id) {
                return;
            }

            //handles the date filter
            if ([10, 11, 12].includes(id)) {
                return this.handleDateFilter(filterInput);
            }

            //handles the boolean filter
            if ([8, 9].includes(id)) {
                console.log()
                return { [filterInput.column]: { [filterInput.selectedFilterType.keyWord]: id === 8 } }
            }

            //handles the range filter
            if ([3, 7].includes(id)) {
                if (id === 7) {
                    filterInput.range = filterInput.range.map((value) => {
                        return +value;
                    })
                }
                return { [filterInput.column]: { [filterInput.selectedFilterType.keyWord]: filterInput.range } }
            }

            return {
                [filterInput.column]: { [filterInput.selectedFilterType.keyWord]: filterInput.value }
            }

        });

        return this.currentFilters[0] == undefined ? [] : this.currentFilters;
    }


}