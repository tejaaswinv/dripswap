"use client";

import { useState } from "react";

export default function ReturnButton({ requestId }: { requestId: string }) {
  const [loading, setLoading] = useState(false);

  async function handleReturn() {
    setLoading(true);

    try {
      const res = await fetch("/api/return", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestId }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("RETURN_FAILED", text);
        setLoading(false);
        return;
      }

      window.location.reload();
    } catch (error) {
      console.error("RETURN_BUTTON_ERROR", error);
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleReturn}
      disabled={loading}
      className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-bold text-white disabled:opacity-70"
    >
      {loading ? "Processing..." : "Mark Returned"}
    </button>
  );
}