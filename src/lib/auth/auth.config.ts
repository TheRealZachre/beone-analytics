import type { NextAuthConfig } from "next-auth";
import { getAuthSecret } from "@/lib/env";
import { isAdminAuthUser, normalizeSessionRole, refreshTokenRole } from "./session-role";

export const authConfig = {
  secret: getAuthSecret(),
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  trustHost: true,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const pathname = nextUrl.pathname;

      const isAuthRoute =
        pathname.startsWith("/login") ||
        pathname.startsWith("/register") ||
        pathname.startsWith("/forgot-password") ||
        pathname.startsWith("/reset-password");
      const isAuthApi = pathname.startsWith("/api/auth");
      const isPublicApi =
        isAuthApi || pathname.startsWith("/api/health");
      const isAdminRoute =
        pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
      const isStaticAsset =
        pathname.startsWith("/brand") ||
        /\.(?:svg|png|jpg|jpeg|gif|webp|ico)$/.test(pathname);

      if (isPublicApi || isStaticAsset) return true;

      if (isAuthRoute) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/", nextUrl));
        }
        return true;
      }

      if (isAdminRoute) {
        if (!isLoggedIn) return false;
        if (!isAdminAuthUser(auth.user)) {
          return Response.redirect(new URL("/", nextUrl));
        }
        return true;
      }

      return isLoggedIn;
    },
    async jwt({ token, user, trigger, session }) {
      if (user?.id) {
        token.sub = user.id;
      }
      if (user?.role) {
        token.role = user.role;
      }
      if (user?.name) {
        token.name = user.name;
      }
      if (user?.email) {
        token.email = user.email;
      }
      if (trigger === "update" && session) {
        if (typeof session.name === "string") token.name = session.name;
        if (typeof session.email === "string") token.email = session.email;
      }
      return await refreshTokenRole(token);
    },
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.role = normalizeSessionRole(token.role);
        if (typeof token.name === "string") session.user.name = token.name;
        if (typeof token.email === "string") session.user.email = token.email;
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
