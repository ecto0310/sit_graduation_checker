export type MaximumCreditFilter = {
  type: "maximumCredit";
  targets: MaximumCreditFilterTarget[];
  maximum: number;
};

export type MaximumCreditFilterTarget =
  | MaximumCreditFilterTargetGroup
  | MaximumCreditFilterTargetSubject;

export type MaximumCreditFilterTargetGroup = {
  type: "group";
  groups: string[];
  divisions: string[];
};

export type MaximumCreditFilterTargetSubject = {
  type: "subject";
  subjects: string[];
};
