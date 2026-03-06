export type APIListLanguage = {
  name: string;
  code: string;
};

export type APIOptionalLocalized<K extends string, T = string> = {
  [P in K | `${K}_en` | `${K}_uk` | `${K}_ru`]?: T;
};

export type APIRequiredLocalized<K extends string, T = string> = {
  [P in K | `${K}_en` | `${K}_uk` | `${K}_ru`]: T;
};
