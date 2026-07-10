// app/(auth)/login/page.js
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";
import BackButton from "@/src/components/ui/BackButton";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      router.push("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-6">
  <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-stone-200 p-8">

    <BackButton></BackButton>

    {/* Logo */}
    <div className="text-center mb-8">
      <h1 className="font-display text-4xl font-bold text-rust">
        MatriQ
      </h1>

      <p className="mt-2 text-sm text-ink/60">
        Sign in to continue to your workspace
      </p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-5">

      <div>
        <label className="block text-sm font-medium text-ink mb-2">
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@example.com"
          required
          className="
            w-full
            rounded-lg
            border
            border-stone-300
            px-4
            py-3
            outline-none
            transition
            focus:border-rust
            focus:ring-2
            focus:ring-rust/20
            text-gray-900
          "
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-2">
          Password
        </label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          className="
            w-full
            rounded-lg
            border
            border-stone-300
            px-4
            py-3
            outline-none
            transition
            focus:border-rust
            focus:ring-2
            focus:ring-rust/20
            text-gray-900
          "
        />
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3">
          <p className="text-sm text-red-700">
            {error}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="
          w-full
          rounded-lg
          bg-rust
          py-3
          font-medium
          text-chalk
          transition
          hover:brightness-95
          active:scale-[0.99]
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        {submitting ? "Signing in..." : "Sign In"}
      </button>

      <p className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-rust hover:underline"
        >
          Create an account →
        </Link>
      </p>

    </form>
  </div>
</div>
  );
}