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

    columns: TableHead<any>[];

    columnTypes: string[] = [];

    baseTableRow: any;

    constructor(columns: TableHead<any>[]) {
        this.currentFilters = [];
        this.columns = columns;
        this.addFilterInput();
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
            return { [filterInput.selectedFilterType.keyWord]: fomattedDate }

        } else {
            const endDate = date.add(1, 'day').format('YYYY-MM-DDTHH:mm:ss[Z]');

            return {
                greaterThanOrEqualTo: fomattedDate,
                smallerThanOrEqualTo: endDate
            }

        }
    }

    //handles the global search
    async handleGlobalSearch(): Promise<any> {
        let orFilter: any[] = [];

        await this.columns.forEach((column) => {
            if (column.type === 'string') {

                //FOR EMBEDDED OBJECTS SPLIT THE VARIABLE AT $ AND CREATE A NESTED OBJECT
                const dynamicFilterEmbedding: Record<string, any> = {};

                // Assuming orderByColumn is in the format 'nestedProperty$subproperty'
                const columns = column.key.split('$');
                let currentObject = dynamicFilterEmbedding;

                for (let i = 0; i < columns.length - 1; i++) {
                    currentObject[columns[i]] = {};
                    currentObject = currentObject[columns[i]];
                }

                currentObject[columns[columns.length - 1]] = { includesInsensitive: this.globalSearch };

                orFilter.push(dynamicFilterEmbedding);

                // orFilter.push({ [column.key]: { includesInsensitive: this.globalSearch } })
            }
        })

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

            //FOR EMBEDDED OBJECTS SPLIT THE VARIABLE AT $ AND CREATE A NESTED OBJECT
            const dynamicFilterEmbedding: Record<string, any> = {};

            // Assuming orderByColumn is in the format 'nestedProperty$subproperty'
            const columns = filterInput.column.split('$');
            let currentObject = dynamicFilterEmbedding;

            for (let i = 0; i < columns.length - 1; i++) {
                currentObject[columns[i]] = {};
                currentObject = currentObject[columns[i]];
            }

            //handles the date filter
            if ([10, 11, 12].includes(id)) {
                currentObject[columns[columns.length - 1]] = this.handleDateFilter(filterInput);
                return dynamicFilterEmbedding
            }

            //handles the boolean filter
            if ([8, 9].includes(id)) {
                currentObject[columns[columns.length - 1]] = { [filterInput.selectedFilterType.keyWord]: id === 8 };
                return dynamicFilterEmbedding
            }

            //handles the range filter
            if ([3, 7].includes(id)) {
                if (id === 7) {
                    filterInput.range = filterInput.range.map((value) => {
                        return +value;
                    })
                }
                currentObject[columns[columns.length - 1]] = { [filterInput.selectedFilterType.keyWord]: filterInput.range };
                return dynamicFilterEmbedding
            }

            currentObject[columns[columns.length - 1]] = { [filterInput.selectedFilterType.keyWord]: filterInput.value };

            return dynamicFilterEmbedding;
        });

        if (this.currentFilters[0] == undefined) {
            this.currentFilters = []
        }

        return this.currentFilters;
    }


}