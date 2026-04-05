"use client";

import { useState } from "react";

export default function ToggleListingButton({
  itemId,
  availability,
}: {
  itemId: string;
  availability: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);

    try {
      const res = await fetch("/api/items/toggle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      });

      if (res.ok) {
        window.location.reload();
      } else {
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  }

  const isLive = availability === "AVAILABLE";

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`rounded-full px-4 py-2 text-xs font-bold transition ${
        isLive
          ? "bg-white text-black hover:scale-[1.03]"
          : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
      }`}
    >
      {loading ? "Updating..." : isLive ? "Make inactive" : "Make live"}
    </button>
  );
}