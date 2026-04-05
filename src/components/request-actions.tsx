"use client";

import { useState } from "react";

export default function RequestActions({ requestId }: { requestId: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "approved" | "rejected">("idle");

  async function handleAction(action: "approve" | "reject") {
    setStatus("loading");

    const res = await fetch("/api/requests/action", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requestId, action }),
    });

    if (!res.ok) {
      setStatus("idle");
      return;
    }

    setStatus(action === "approve" ? "approved" : "rejected");
    window.location.reload();
  }

  if (status === "approved") {
    return (
      <button disabled className="rounded-full bg-green-500 px-4 py-2 text-sm font-bold text-white">
        Approved ✓
      </button>
    );
  }

  if (status === "rejected") {
    return (
      <button disabled className="rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white">
        Rejected
      </button>
    );
  }

  return (
    <div className="flex gap-3">
      <button
        onClick={() => handleAction("approve")}
        disabled={status === "loading"}
        className="rounded-full bg-white px-4 py-2 text-sm font-bold text-black"
      >
        {status === "loading" ? "Working..." : "Approve"}
      </button>

      <button
        onClick={() => handleAction("reject")}
        disabled={status === "loading"}
        className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white"
      >
        Reject
      </button>
    </div>
  );
}