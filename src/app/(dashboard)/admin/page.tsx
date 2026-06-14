import { redirect } from "next/navigation";
import { AdminUserConsole } from "@/components/admin/AdminUserConsole";
import { auth } from "@/lib/auth";
import { listUsers } from "@/lib/auth/users";

export const dynamic = "force-dynamic";

export default async function AnalyticsAdminPage() {
  const session = await auth();

  if (session?.user?.role !== "admin") {
    redirect("/");
  }

  const users = await listUsers();

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-wide text-brand-indigo">
          Analytics Admin
        </p>
        <h1 className="mt-2 font-serif text-3xl text-brand-ink">
          Analytics Admin Console
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-brand-muted">
          Manage who can sign in to BeOne Analytics — reports, channel data, and
          sync. User accounts here are separate from the main Digital Dashboard
          platform and do not sync automatically.
        </p>
      </div>

      <AdminUserConsole initialUsers={users} scope="analytics" />
    </div>
  );
}
