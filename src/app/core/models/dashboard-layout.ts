export interface DashboardLayout {
    columns: number,
    miniCard: Tile,
    chart: Tile,
    table: Tile,
}

export interface Tile {
    color?: string;
    cols: number;
    rows: number;
    text?: string;
}