export type Classes = {
    classes: Class[];
}

export type Class = {
    group: string;
    name: string;
    division: string;
    count: number;
    day: string;
    time: string;
}

export const times = ["1限", "2限", "3限", "4限", "5限", "6限"];
export const days = ["月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];
