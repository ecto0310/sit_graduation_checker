export type Credits = {
    credits: Credit[];
}

export type Credit = {
    group: string;
    name: string;
    division: string;
    count: number;
    evaluation: string;
    period: string;
}
