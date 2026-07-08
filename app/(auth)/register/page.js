// app/(auth)/register/page.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/src/context/AuthContext";
import { getMe } from "../api";
import { register } from "../api";

export default function RegisterPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "CUSTOMER",
    birthDate: "",
    phoneNumber: "",
  });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await register(form);
      const me = await getMe(); // cookie's already set by register, pull the full user
      router.push("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

    return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-6 py-12">
        <div className="w-full max-w-2xl rounded-xl border border-stone-200 bg-white shadow-lg p-8">

        {/* Header */}
        <div className="text-center mb-8">
            <h1 className="font-display text-4xl font-bold text-rust">
            Create your account
            </h1>

            <p className="mt-2 text-sm text-ink/60">
            Join MatriQ and start discovering trusted building materials.
            </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

            {/* Two-column grid */}
            <div className="grid gap-5 md:grid-cols-2">

            <div>
                <label className="block mb-2 text-sm font-medium text-gray-800">
                Full name
                </label>

                <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full rounded-lg border border-stone-300 px-4 py-3 transition focus:border-rust focus:ring-2 focus:ring-rust/20 outline-none text-gray-900"
                />
            </div>

            <div>
                <label className="block mb-2 text-sm font-medium text-gray-800">
                Email
                </label>

                <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
                className="w-full rounded-lg border border-stone-300 px-4 py-3 transition focus:border-rust focus:ring-2 focus:ring-rust/20 outline-none text-gray-900"
                />
            </div>

            <div>
                <label className="block mb-2 text-sm font-medium text-gray-800">
                Password
                </label>

                <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full rounded-lg border border-stone-300 px-4 py-3 transition focus:border-rust focus:ring-2 focus:ring-rust/20 outline-none text-gray-900"
                />
            </div>

            <div>
                <label className="block mb-2 text-sm font-medium  text-gray-800">
                Phone number
                </label>

                <input
                type="tel"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                required
                placeholder="+994 50 123 45 67"
                className="w-full rounded-lg border border-stone-300 px-4 py-3 transition focus:border-rust focus:ring-2 focus:ring-rust/20 outline-none text-gray-900"
                />
            </div>

            <div>
                <label className="block mb-2 text-sm font-medium text-gray-800">
                Date of birth
                </label>

                <input
                type="date"
                name="birthDate"
                value={form.birthDate}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-stone-300 px-4 py-3 transition focus:border-rust focus:ring-2 focus:ring-rust/20 outline-none text-gray-900"
                />
            </div>
            </div>

            {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3">
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
                disabled:cursor-not-allowed
                disabled:opacity-50
            "
            >
            {submitting ? "Creating account..." : "Create Account"}
            </button>

            <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
                href="/login"
                className="font-medium text-rust hover:underline"
            >
                Sign In
            </Link>
            </p>

        </form>
        </div>
    </div>
);
}