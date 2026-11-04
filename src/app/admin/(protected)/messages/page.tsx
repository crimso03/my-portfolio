import DeleteMessageButton from "@/components/admin/DeleteMessageButton";
import MessageStatusButton from "@/components/admin/MessageStatusButton";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  ArrowLeft,
  Mail,
  MailOpen,
  Inbox,
  CalendarDays,
} from "lucide-react";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const unreadCount = messages.filter(
    (message) => !message.isRead
  ).length;

  return (
    <main className="min-h-screen bg-[#080811] px-5 py-10 text-white sm:px-10">
      <div className="mx-auto max-w-5xl">

        {/* Back to Dashboard */}
        <Link
          href="/admin"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-purple-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        {/* Page Heading */}
        <div className="mb-9">
          <div className="mb-3 flex items-center gap-2 text-sm text-purple-400">
            <Inbox className="h-4 w-4" />
            Message Management
          </div>

          <h1 className="text-3xl font-bold sm:text-4xl">
            Contact{" "}
            <span className="text-purple-400">
              Messages
            </span>
          </h1>

          <p className="mt-3 text-sm text-gray-400">
            View messages submitted through your portfolio.
          </p>
        </div>

        {/* Message Statistics */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-3 flex items-center gap-2 text-gray-400">
              <Mail className="h-5 w-5 text-purple-400" />
              Total Messages
            </div>

            <p className="text-3xl font-bold">
              {messages.length}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-3 flex items-center gap-2 text-gray-400">
              <MailOpen className="h-5 w-5 text-fuchsia-400" />
              Unread Messages
            </div>

            <p className="text-3xl font-bold">
              {unreadCount}
            </p>
          </div>
        </div>

        {/* Message List */}
        {messages.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center">
            <Inbox className="mx-auto mb-4 h-10 w-10 text-gray-500" />

            <h2 className="text-lg font-semibold">
              No Messages Yet
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              Messages from your contact form will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-purple-500/20"
              >
                {/* Sender and Status */}
                <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold">
                      {message.name}
                    </h2>

                    <a
                      href={`mailto:${message.email}`}
                      className="mt-1 block text-sm text-purple-400 hover:underline"
                    >
                      {message.email}
                    </a>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      message.isRead
                        ? "bg-gray-500/10 text-gray-400"
                        : "bg-purple-500/10 text-purple-300"
                    }`}
                  >
                    {message.isRead ? "Read" : "Unread"}
                  </span>
                </div>

                {/* Subject */}
                <h3 className="mb-2 font-semibold text-gray-200">
                  {message.subject}
                </h3>

                {/* Message Body */}
                <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-gray-400">
                  {message.message}
                </p>

                {/* Date */}
                
<div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
  <div className="flex items-center gap-2 text-xs text-gray-500">
    <CalendarDays className="h-4 w-4" />
    {message.createdAt.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Dhaka",
    })}
  </div>

  
<div className="flex flex-wrap items-center gap-3">
  <MessageStatusButton
    messageId={message.id}
    isRead={message.isRead}
  />

  <DeleteMessageButton
    messageId={message.id}
    senderName={message.name}
  />
</div>

</div>

              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
