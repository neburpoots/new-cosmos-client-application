export interface TableHead<T> {
    label: string;
    asc: T;
    desc: T;
    key: string;
    round?: number;
    type: 'string' | 'number' | 'boolean' | 'datetime' | 'array';
}


