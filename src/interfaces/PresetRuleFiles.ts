export type PresetRuleFiles = {
  years: Year[];
};

export type Year = {
  name: string;
  departments: Department[];
};

export type Department = {
  name: string;
  ruleFiles: RuleFile[];
};

export type RuleFile = {
  name: string;
  file: string;
};
