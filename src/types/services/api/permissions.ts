import { APIListTeam } from "./team";
import { APIListUser } from "./user";

export type APICreatePermissionActors = {
  users?: string[];
  teams?: string[];
};

export type APICreatePermissions = {
  view?: APICreatePermissionActors;
  edit?: APICreatePermissionActors;
};

export type APIUpdatePermissionActors = {
  users?: string[];
  teams?: string[];
};

export type APIUpdatePermissions = {
  view?: APIUpdatePermissionActors;
  edit?: APIUpdatePermissionActors;
};

export type APIRetrievePermissionActors = {
  users?: APIListUser[];
  teams?: APIListTeam[];
};

export type APIRetrievePermissions = {
  view?: APIRetrievePermissionActors;
  edit?: APIRetrievePermissionActors;
};
