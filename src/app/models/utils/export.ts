export const ExportType: 'csv' | 'excel' = 'excel';

export type SelectedRows = {
    title: string;
    description: string;
    key: string;
    selected: boolean;
} 

export type exportOptions = {
    type: 'csv' | 'excel';
    withHeaders: boolean;
    records: 'all' | 'paginated' | 'filtered';
    exportHeaders: string[];
    data?: any[]
}