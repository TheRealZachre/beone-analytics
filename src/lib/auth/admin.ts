import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isAdminAuthUser } from "@/lib/auth/session-role";

export async function requireAdmin() {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      session: null,
      response: NextResponse.json({ error: "Unauthorized." }, { status: 401 }),
    };
  }

  if (!isAdminAuthUser(session.user)) {
    return {
      session: null,
      response: NextResponse.json({ error: "Forbidden." }, { status: 403 }),
    };
  }

  return { session, response: null };
}

export function userIsAdmin(
  user: { role?: string; email?: string | null } | null | undefined
): boolean {
  return isAdminAuthUser(user ?? undefined);
}
