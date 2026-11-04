
import Link from "next/link";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Mail,
  MailOpen,
  ArrowUpRight,
  LogOut,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/admin/login");
  }

  // Fetch dashboard statistics from PostgreSQL
  const [projectCount, messageCount, unreadCount] =
    await Promise.all([
      prisma.project.count(),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({
        where: { isRead: false },
      }),
    ]);

  const stats = [
    {
      label: "Total Projects",
      value: projectCount,
      icon: FolderKanban,
    },
    {
      label: "Total Messages",
      value: messageCount,
      icon: Mail,
    },
    {
      label: "Unread Messages",
      value: unreadCount,
      icon: MailOpen,
    },
  ];

  return (
    <main className="min-h-screen bg-[#080811] px-5 py-10 text-white sm:px-10">
      <div className="mx-auto max-w-6xl">

        {/* Dashboard Header */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-5">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm text-purple-400">
              <LayoutDashboard className="h-4 w-4" />
              Administration
            </div>

            <h1 className="text-3xl font-bold sm:text-4xl">
              Admin{" "}
              <span className="text-purple-400">
                Dashboard
              </span>
            </h1>

            <p className="mt-3 text-gray-400">
              Welcome back, {session.user.email}.
            </p>
          </div>

          {/* Sign Out */}
          <form
            action={async () => {
              "use server";
              await signOut({
                redirectTo: "/admin/login",
              });
            }}
          >
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium transition hover:border-purple-500/40 hover:bg-purple-500/10"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </form>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-purple-500/20"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10">
                  <Icon className="h-6 w-6 text-purple-400" />
                </div>

                <p className="text-sm text-gray-400">
                  {stat.label}
                </p>

                <p className="mt-2 text-4xl font-bold">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Portfolio Management */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold">
            Portfolio{" "}
            <span className="text-purple-400">
              Management
            </span>
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Manage your portfolio content and visitor messages.
          </p>

          {/* Navigation Cards */}
          <div className="mt-6 grid gap-5 sm:grid-cols-2">

            {/* Manage Projects */}
            <Link
              href="/admin/projects"
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:border-purple-500/40 hover:bg-purple-500/5"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10">
                  <FolderKanban className="h-6 w-6 text-purple-400" />
                </div>

                <ArrowUpRight className="h-5 w-5 text-gray-500 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-purple-400" />
              </div>

              <h3 className="text-lg font-semibold text-white transition group-hover:text-purple-400">
                Manage Projects
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                Add, edit, publish, unpublish, and delete
                your portfolio projects.
              </p>

              <div className="mt-5 text-sm font-medium text-purple-400">
                {projectCount} Total Projects
              </div>
            </Link>

            {/* Contact Messages */}
            <Link
              href="/admin/messages"
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:border-fuchsia-500/40 hover:bg-fuchsia-500/5"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-fuchsia-500/10">
                  <Mail className="h-6 w-6 text-fuchsia-400" />
                </div>

                <ArrowUpRight className="h-5 w-5 text-gray-500 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-fuchsia-400" />
              </div>

              <h3 className="text-lg font-semibold text-white transition group-hover:text-fuchsia-400">
                Contact Messages
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                View visitor inquiries, manage read status,
                and delete unwanted messages.
              </p>

              <div className="mt-5 text-sm font-medium text-fuchsia-400">
                {unreadCount} Unread Messages
              </div>
            </Link>
          </div>
        </div>

        {/* Dashboard Footer */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm leading-7 text-gray-400">
            Your admin dashboard is connected to PostgreSQL.
            Projects and contact messages are managed through
            your authenticated admin system.
          </p>
        </div>
      </div>
    </main>
  );
}
