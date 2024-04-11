interface filterOptions {
    label: string;
    id: number;
}

export interface filterInput {
    column: any;
    filterTypes: any;
    id: number;
    selectedFilterType: any;
    value: string;
}

export const filterTypes: filterOptions[] = [
    { label: 'Exact', id:  1},
    { label: 'Contains', id: 2},
    { label: 'Greater than', id: 3},
    { label: 'Smaller than', id: 4},
    { label: 'Range of items', id: 5},
    { label: 'True', id: 6},
    { label: 'False"', id: 7},
    { label: 'Exact date', id: 8},
    { label: 'After this date', id: 9},
    { label: 'Before this date', id: 10},
]

export class FilterBuilder {

    currentFilters: any[];

    filterInputs: filterInput[] = [];

    constructor() {
        this.currentFilters = [];
        this.addFilterInput();
    }

    async addFilterInput(): Promise<void> {
        this.filterInputs.push({
            column: null,
            filterTypes: null,
            id: this.filterInputs.length + 1,
            selectedFilterType: null,
            value: ''
        });
    }

    async deleteFilterInput(id: number): Promise<void> {
        this.filterInputs = this.filterInputs.filter((filterInput) => filterInput.id !== id);
    }

    async getFilterOptionsForType(type: string): Promise<any> {
        switch (type) {
            case 'string':
                return [filterTypes[0], filterTypes[1], filterTypes[4]];
            case 'number':
                return [filterTypes[0], filterTypes[2], filterTypes[3], filterTypes[4]];
            case 'boolean':
                return [filterTypes[4], filterTypes[6]];
            case 'datetime':
                return [filterTypes[7], filterTypes[8], filterTypes[9]]; 
             default:
                return []
        }
    }


}