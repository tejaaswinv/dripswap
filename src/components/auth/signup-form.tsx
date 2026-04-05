"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpInput } from "@/lib/validators/auth";

export function SignUpForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpInput) => {
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setMessage(result.error ?? "Something went wrong.");
        setLoading(false);
        return;
      }

      setMessage("Account created successfully. Redirecting to login...");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1200);
    } catch (error) {
      console.error("SIGNUP_FORM_ERROR", error);
      setMessage("Something went wrong.");
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-white/80">
          Name
        </label>
        <input
          {...register("name")}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/25 focus:border-white/20"
          placeholder="Your name"
        />
        {errors.name && (
          <p className="mt-2 text-sm text-red-300">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-white/80">
          University Email
        </label>
        <input
          type="email"
          {...register("email")}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/25 focus:border-white/20"
          placeholder="name@sutd.edu.sg"
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-300">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-white/80">
          Password
        </label>
        <input
          type="password"
          {...register("password")}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/25 focus:border-white/20"
          placeholder="Create a password"
        />
        {errors.password && (
          <p className="mt-2 text-sm text-red-300">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-black text-black transition hover:scale-[1.01] disabled:opacity-60"
      >
        {loading ? "Creating account..." : "Create account"}
      </button>

      <p className="pt-1 text-sm text-white/60">
        Already have an account?{" "}
        <a
          href="/login"
          className="font-semibold text-white underline transition hover:text-white/80"
        >
          Log in
        </a>
      </p>

      {message && <p className="text-sm text-white/70">{message}</p>}
    </form>
  );
}