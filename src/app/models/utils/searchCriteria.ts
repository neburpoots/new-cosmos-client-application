export interface SearchCriteria {
    searchValue: string | null;
    orderBy: {
        orderByColumn: string | null;
        orderByDirection: string | null;
    };
}