export interface PostQueries {
    search: string;
    page: number;
    limit: number;
    sort: SortType | string;
    order: OrderDirection;
    startDate: string;
    endDate: string;
}

export enum OrderDirection {
    ASC = 'asc',
    DESC = 'desc',
}

export enum SortType {
    CREATOR = 'creator',
    PUB_DATE = 'pubDate',
}
