import { resolveRoleForEmail } from "./roles";
import { findUserByEmail, findUserById } from "./users";
import type { UserRole } from "./types";

type TokenLike = {
  sub?: string;
  role?: unknown;
  email?: unknown;
};

type AuthUserLike = {
  role?: string;
  email?: string | null;
};

export async function refreshTokenRole<T extends TokenLike>(token: T): Promise<T> {
  if (token.sub) {
    const stored = await findUserById(token.sub);
    if (stored) {
      token.role = stored.role;
      if (!token.email) token.email = stored.email;
      return token;
    }
  }

  if (typeof token.email === "string") {
    const storedByEmail = await findUserByEmail(token.email);
    if (storedByEmail) {
      token.role = storedByEmail.role;
    } else if (token.role !== "admin") {
      token.role = resolveRoleForEmail(token.email);
    }
  }

  return token;
}

export function normalizeSessionRole(role: unknown): UserRole {
  return role === "admin" ? "admin" : "user";
}

export function isAdminAuthUser(user: AuthUserLike | undefined | null): boolean {
  if (!user) return false;
  if (user.role === "admin") return true;
  if (user.email && resolveRoleForEmail(user.email) === "admin") return true;
  return false;
}
