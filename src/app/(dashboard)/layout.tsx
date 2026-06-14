import { AppShell } from "@/components/layout/AppShell";
import { auth } from "@/lib/auth";
import { isAdminAuthUser } from "@/lib/auth/session-role";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const showAdminNav = isAdminAuthUser(session?.user);

  return <AppShell showAdminNav={showAdminNav}>{children}</AppShell>;
}
