"use client";

import { useState } from "react";

export default function BorrowButton({ itemId }: { itemId: string }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleBorrow() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/borrow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Could not request item");
        setLoading(false);
        return;
      }

      setDone(true);
    } catch {
      setError("Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div className="mt-4">
      <button
        onClick={handleBorrow}
        disabled={loading || done}
        className="w-full rounded-full bg-white px-4 py-2 font-bold text-black disabled:opacity-70"
      >
        {done ? "Requested ✓" : loading ? "Requesting..." : "Borrow"}
      </button>

      {error && (
        <p className="mt-2 text-xs text-red-300">{error}</p>
      )}
    </div>
  );
}