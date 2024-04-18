export interface TableHead<T> {
    label: string;
    asc: T;
    desc: T;
    key: string;
    type: 'string' | 'number' | 'boolean' | 'datetime' | 'array';
}