export default interface Pyrolyser {
    id: number;
    name?: string;
    created?: Date;
    modified?: Date;
    owner_id?: number;
    replacement_interval_months?: number;
    cdartikel: string;
}