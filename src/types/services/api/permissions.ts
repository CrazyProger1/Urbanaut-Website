export type APIPermissionActors = {
  users?: string[];
  teams?: number[];
};

export type APIPermissions = {
  view?: APIPermissionActors;
  edit?: APIPermissionActors;
};
