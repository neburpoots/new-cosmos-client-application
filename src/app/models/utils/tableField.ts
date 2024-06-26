export interface TableField {
    url?: string | null;
    value?: any | null;
    color?: string | null; //This is the field that colors the cell red if false, green if null, undefined or null is nothing
}