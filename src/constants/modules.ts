export const MODULES = {
    USERS: "Users",
    ROLES: "Roles",
    DASHBOARD: "Dashboard",
    SETTINGS: "Settings",
  } as const;
  
  export type ModuleName = typeof MODULES[keyof typeof MODULES];
  