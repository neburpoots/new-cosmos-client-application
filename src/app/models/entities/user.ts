export interface User {
    id: number;
    username: string;
    password: string;
    created: Date;
    modified?: Date | null;
    initials: string;
    fullname: string;
    holiday_start_balance?: number | null;
    overtime_start_balance?: number | null;
    url?: string | null;
    weekly_hours_full_access: boolean;
}
