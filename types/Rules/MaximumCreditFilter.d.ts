export type MaximumCreditFilter = {
    type: "maximumCredit";
    targets: MaximumCreditFilterTarget[];
    maximum: number;
}

export type MaximumCreditFilterTarget = {
    subjects: string[];
}
