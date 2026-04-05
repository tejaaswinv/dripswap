"use client";

import { useState } from "react";
import { CalendarDays, Clock3, Sparkles } from "lucide-react";

export default function BorrowRequestForm({ itemId }: { itemId: string }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [purpose, setPurpose] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/borrow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId,
          startDate,
          endDate,
          purpose,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Could not submit request");
        setLoading(false);
        return;
      }

      setMessage("Request submitted successfully.");

      setTimeout(() => {
        window.location.href = "/borrow";
      }, 900);
    } catch (error) {
      console.error("BORROW_REQUEST_FORM_ERROR", error);
      setMessage("Something went wrong.");
    }

    setLoading(false);
  }

  const isSuccess = message.toLowerCase().includes("success");

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border-b border-white/10 pb-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-200">
          <Sparkles className="h-3.5 w-3.5" />
          Borrow requisition
        </div>

        <h2 className="mt-4 text-2xl font-black leading-tight text-white">
          Send a request for this piece
        </h2>

        <p className="mt-3 max-w-md text-sm leading-7 text-white/55">
          Choose the exact time window you need it for and add a short note so
          the owner understands the occasion.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4">
          <div className="mb-3 flex items-center gap-2 text-white/45">
            <CalendarDays className="h-4 w-4" />
            <label className="text-[11px] uppercase tracking-[0.18em]">
              Start
            </label>
          </div>

          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-300/30"
            required
          />
        </div>

        <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4">
          <div className="mb-3 flex items-center gap-2 text-white/45">
            <Clock3 className="h-4 w-4" />
            <label className="text-[11px] uppercase tracking-[0.18em]">
              End
            </label>
          </div>

          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-300/30"
            required
          />
        </div>
      </div>

      <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4">
        <label className="mb-3 block text-[11px] uppercase tracking-[0.18em] text-white/45">
          Occasion / note
        </label>

        <textarea
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          placeholder="Birthday dinner, formal presentation, photoshoot, temple function, date night..."
          className="min-h-[130px] w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-7 text-white outline-none placeholder:text-white/25 transition focus:border-indigo-300/30"
        />
      </div>

      <div className="rounded-[1.4rem] border border-white/10 bg-gradient-to-r from-white/[0.05] to-white/[0.02] p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">Ready to request?</p>
            <p className="mt-1 text-xs leading-6 text-white/45">
              The owner will review your dates and approve if the piece is
              available.
            </p>
          </div>

          <button
            disabled={loading}
            className="rounded-full bg-white px-6 py-3 text-sm font-black text-black transition hover:scale-[1.02] disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Send request"}
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`rounded-[1.2rem] border px-4 py-3 text-sm ${
            isSuccess
              ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-200"
              : "border-red-400/20 bg-red-500/10 text-red-200"
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );
}