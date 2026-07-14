"use client";

import { useEffect, useState } from "react";
import { User, Mail, Phone, Calendar, Shield } from "lucide-react";

import { apiFetch } from "@/src/lib/apiClient";
import { updateUser } from "@/src/features/users/api";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    fullName: "",
    birthDate: "",
    phoneNumber: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const data = await apiFetch("/auth/me");

      setUser(data);

      setForm({
        fullName: data.fullName || "",
        birthDate: data.birthDate || "",
        phoneNumber: data.phoneNumber || "",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setSaving(true);

      await updateUser(user.id, form);

      alert("Profile updated successfully!");

      loadProfile();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">

      <div>
        <h1 className="font-display text-3xl font-bold text-ink">
          My Profile
        </h1>

        <p className="mt-2 text-ink/60">
          Manage your personal information.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">

        {/* Left Card */}

        <div className="rounded-xl border border-ink/10 bg-white p-8 shadow-sm">

          <div className="flex flex-col items-center">

            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-rust text-white">
              <User size={48} />
            </div>

            <h2 className="mt-5 text-xl font-semibold">
              {user.fullName}
            </h2>

            <p className="text-sm text-ink/60">
              {user.email}
            </p>

            <span className="mt-4 rounded-full bg-rust/10 px-4 py-2 text-sm font-semibold text-rust">
              {user.role}
            </span>

          </div>

        </div>

        {/* Right Card */}

        <div className="lg:col-span-2">

          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-xl border border-ink/10 bg-white p-8 shadow-sm"
          >

            <div className="grid gap-6 md:grid-cols-2">

              <div>

                <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <User size={16} />
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-ink/10 px-4 py-3 outline-none focus:border-rust"
                />

              </div>

              <div>

                <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <Mail size={16} />
                  Email
                </label>

                <input
                  value={user.email}
                  disabled
                  className="w-full rounded-lg border border-ink/10 bg-gray-100 px-4 py-3"
                />

              </div>

              <div>

                <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <Phone size={16} />
                  Phone Number
                </label>

                <input
                  type="text"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-ink/10 px-4 py-3 outline-none focus:border-rust"
                />

              </div>

              <div>

                <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <Calendar size={16} />
                  Birth Date
                </label>

                <input
                  type="date"
                  name="birthDate"
                  value={form.birthDate}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-ink/10 px-4 py-3 outline-none focus:border-rust"
                />

              </div>

              <div className="md:col-span-2">

                <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <Shield size={16} />
                  Role
                </label>

                <input
                  value={user.role}
                  disabled
                  className="w-full rounded-lg border border-ink/10 bg-gray-100 px-4 py-3"
                />

              </div>

            </div>

            <div className="flex justify-end">

              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-rust px-6 py-3 font-medium text-white transition hover:bg-rust/90 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}