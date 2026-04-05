"use client";

import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text();

      let data: any = {};
      try {
        data = JSON.parse(text);
      } catch {
        setMessage("Server returned HTML instead of JSON. Check terminal.");
        setLoading(false);
        return;
      }

      if (!res.ok) {
        setMessage(data.error || "Login failed");
        setLoading(false);
        return;
      }

      setMessage("Login successful. Redirecting...");
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("LOGIN_PAGE_ERROR", error);
      setMessage("Something went wrong during login.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-white/80">
          Email
        </label>
        <input
          type="email"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/25 focus:border-white/20"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@sutd.edu.sg"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-white/80">
          Password
        </label>
        <input
          type="password"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/25 focus:border-white/20"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
      </div>

      <button
        disabled={loading}
        className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-black text-black transition hover:scale-[1.01] disabled:opacity-60"
      >
        {loading ? "Logging in..." : "Log in"}
      </button>

      <p className="pt-1 text-sm text-white/60">
        New user?{" "}
        <a
          href="/signup"
          className="font-semibold text-white underline transition hover:text-white/80"
        >
          Sign up
        </a>
      </p>

      {message && <p className="text-sm text-white/70">{message}</p>}
    </form>
  );
}