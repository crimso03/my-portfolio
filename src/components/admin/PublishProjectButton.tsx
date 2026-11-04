
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";

type PublishProjectButtonProps = {
  projectId: string;
  published: boolean;
};

export default function PublishProjectButton({
  projectId,
  published,
}: PublishProjectButtonProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleToggle() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/admin/projects/${encodeURIComponent(projectId)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            published: !published,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.error || "Failed to update publication status."
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
        className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
          published
            ? "border-amber-500/20 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
            : "border-green-500/20 bg-green-500/10 text-green-400 hover:bg-green-500/20"
        }`}
      >
        {loading ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : published ? (
          <EyeOff className="h-3.5 w-3.5" />
        ) : (
          <Eye className="h-3.5 w-3.5" />
        )}

        {loading
          ? "Updating..."
          : published
            ? "Unpublish"
            : "Publish"}
      </button>

      {error && (
        <p
          role="alert"
          className="mt-2 max-w-44 text-xs text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  );
}
