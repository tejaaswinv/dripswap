"use client";

import { useState } from "react";

export default function ListItemForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/items", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        setMessage(text || "Failed to list item");
        setLoading(false);
        return;
      }

      setMessage("Item listed successfully.");
      form.reset();
      window.location.reload();
    } catch {
      setMessage("Something went wrong.");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="mt-6 space-y-4">
      <input
        name="title"
        placeholder="Item title"
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30"
        required
      />

      <input
        name="category"
        placeholder="Category (e.g. Jacket, Kurta, Formal)"
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30"
        required
      />

      <input
        name="size"
        placeholder="Size (S, M, L, XL)"
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30"
        required
      />

      <select
        name="condition"
        defaultValue="GOOD"
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
      >
        <option value="NEW" className="text-black">NEW</option>
        <option value="LIKE_NEW" className="text-black">LIKE_NEW</option>
        <option value="GOOD" className="text-black">GOOD</option>
        <option value="FAIR" className="text-black">FAIR</option>
        <option value="WORN" className="text-black">WORN</option>
      </select>

      <textarea
        name="description"
        placeholder="Description"
        className="min-h-[120px] w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30"
      />

      <input
        type="file"
        name="image"
        accept="image/*"
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-bold file:text-black"
      />

      <button
        disabled={loading}
        className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-black text-black transition hover:scale-[1.02] disabled:opacity-70"
      >
        {loading ? "Listing..." : "List item"}
      </button>

      {message && <p className="text-sm text-white/60">{message}</p>}
    </form>
  );
}