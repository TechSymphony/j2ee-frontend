export const ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
  DONOR: "DONOR",
} as const;

export type Role = keyof typeof ROLES;
