export type Credits = {
    credits: Credit[];
}

export type Credit = {
    group: string;
    division: string;
    name: string;
    count: number;
    evaluation: string;
    period: string;
}
