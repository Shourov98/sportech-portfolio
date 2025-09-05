"use client";
import { useEffect, useState } from "react";
import { authFetch } from "@/utils/api";

/* Small modal */
function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white p-5 text-[#1b1d1e] shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-black/60 hover:text-black">
            ✕
          </button>
        </div>
        <div>{children}</div>
        {footer && <div className="mt-4 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
}

export default function ContactManager() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  // modal + form state
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    location: "",
    email: "",
    phone: "",
    facebook: "",
    tiktok: "",
    instagram: "",
    youtube: "",
  });
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  /* Load existing contact info (GET /contact) */
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await authFetch("/contact", { method: "GET" });
        if (!mounted) return;
        setData(res || null);
      } catch (e) {
        setMsg(e.message || "Failed to load contact info.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  function openEdit() {
    setForm({
      location: data?.location || "",
      email: data?.email || "",
      phone: data?.phone || "",
      facebook: data?.facebook || "",
      tiktok: data?.tiktok || "",
      instagram: data?.instagram || "",
      youtube: data?.youtube || "",
    });
    setFormError("");
    setOpen(true);
  }

  function setField(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  /* Save changes (PUT /contact) */
  async function onSave(e) {
    e.preventDefault();
    setFormError("");
    try {
      setSaving(true);
      const updated = await authFetch("/contact", {
        method: "PUT",
        body: JSON.stringify(form),
      });
      setData(updated);
      setOpen(false);
    } catch (err) {
      setFormError(err?.message || "Update failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Contact</h2>
        <p className="text-white/70">
          Manage your public contact information and social links.
        </p>
      </div>

      <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
        {loading ? (
          <p className="text-white/80">Loading…</p>
        ) : data ? (
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Location" value={data.location} />
            <Field label="Email" value={data.email} />
            <Field label="Phone" value={data.phone} />
            <Field label="Facebook" value={data.facebook} link />
            <Field label="TikTok" value={data.tiktok} link />
            <Field label="Instagram" value={data.instagram} link />
            <Field label="YouTube" value={data.youtube} link />
          </div>
        ) : (
          <p className="text-white/80">No contact record found.</p>
        )}

        <div className="mt-4">
          {!loading && (
            <button
              onClick={openEdit}
              className="rounded-lg bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20"
            >
              Edit
            </button>
          )}
        </div>

        {msg && <p className="mt-3 text-sm text-white/80">{msg}</p>}
      </div>

      {/* Edit Modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Edit contact information"
        footer={
          <>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-2 bg-black/5 hover:bg-black/10"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              form="contact-form"
              disabled={saving}
              className="rounded-lg px-4 py-2 bg-[#EDF900] text-black font-semibold hover:brightness-95 disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
          </>
        }
      >
        <form id="contact-form" onSubmit={onSave} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Location"
              value={form.location}
              onChange={(v) => setField("location", v)}
            />
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(v) => setField("email", v)}
            />
            <Input
              label="Phone"
              value={form.phone}
              onChange={(v) => setField("phone", v)}
            />
            <Input
              label="Facebook"
              value={form.facebook}
              onChange={(v) => setField("facebook", v)}
              placeholder="https://facebook.com/…"
            />
            <Input
              label="TikTok"
              value={form.tiktok}
              onChange={(v) => setField("tiktok", v)}
              placeholder="https://tiktok.com/@…"
            />
            <Input
              label="Instagram"
              value={form.instagram}
              onChange={(v) => setField("instagram", v)}
              placeholder="https://instagram.com/…"
            />
            <Input
              label="YouTube"
              value={form.youtube}
              onChange={(v) => setField("youtube", v)}
              placeholder="https://youtube.com/…"
            />
          </div>

          {formError && <p className="text-sm text-red-600">{formError}</p>}
        </form>
      </Modal>
    </section>
  );
}

/* ------- tiny presentational helpers ------- */
function Field({ label, value, link = false }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-white/60">{label}</p>
      {link && value ? (
        <a
          href={value}
          target="_blank"
          rel="noreferrer"
          className="text-[#EDF900] break-all"
        >
          {value}
        </a>
      ) : (
        <p className="text-white break-all">{value || "—"}</p>
      )}
    </div>
  );
}

function Input({ label, value, onChange, type = "text", placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded border border-black/10 px-3 py-2"
        placeholder={placeholder}
      />
    </div>
  );
}
