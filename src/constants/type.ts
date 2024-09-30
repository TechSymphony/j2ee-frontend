export const TokenType = {
  ForgotPasswordToken: "ForgotPasswordToken",
  AccessToken: "AccessToken",
  RefreshToken: "RefreshToken",
} as const;

export const Role = {
  Admin: "Admin",
  Employee: "Employee",
} as const;

export const RoleValues = [Role.Admin, Role.Employee] as const;
