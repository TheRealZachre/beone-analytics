import { redirect } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { AdminUserConsole } from "@/components/admin/AdminUserConsole";
import { auth } from "@/lib/auth";
import { isAdminAuthUser } from "@/lib/auth/session-role";
import { listUsers } from "@/lib/auth/users";
import { getPlatformAppUrl, platformHref } from "@/lib/platform-app-url";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await auth();

  if (!isAdminAuthUser(session?.user)) {
    redirect("/");
  }

  const users = await listUsers();
  const platformAdminUrl = platformHref("/admin", getPlatformAppUrl());

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-wide text-brand-indigo">
          Admin
        </p>
        <h1 className="mt-2 font-serif text-3xl text-brand-ink">User management</h1>
        <p className="mt-2 max-w-2xl text-sm text-brand-muted">
          Create username and password accounts for your team. New users can sign
          in with their username or email address. Analytics uses a separate user
          database from the main platform.
        </p>
        <a
          href={platformAdminUrl}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-indigo transition hover:text-brand-indigo-bright"
        >
          Open Platform Admin Console
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <AdminUserConsole initialUsers={users} scope="analytics" />
    </div>
  );
}
