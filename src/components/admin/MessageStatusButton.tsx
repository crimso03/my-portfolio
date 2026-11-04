
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCheck, Mail, Loader2 } from "lucide-react";

type MessageStatusButtonProps = {
  messageId: string;
  isRead: boolean;
};

export default function MessageStatusButton({
  messageId,
  isRead,
}: MessageStatusButtonProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleToggle() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/admin/messages/${encodeURIComponent(messageId)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isRead: !isRead,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.error || "Failed to update message status."
        );
      }

      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleToggle}
        disabled={loading}
        className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
          isRead
            ? "border-amber-500/20 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
            : "border-green-500/20 bg-green-500/10 text-green-400 hover:bg-green-500/20"
        }`}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isRead ? (
          <Mail className="h-4 w-4" />
        ) : (
          <CheckCheck className="h-4 w-4" />
        )}

        {loading
          ? "Updating..."
          : isRead
            ? "Mark as Unread"
            : "Mark as Read"}
      </button>

      {error && (
        <p
          role="alert"
          className="mt-2 max-w-48 text-xs text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  );
}
