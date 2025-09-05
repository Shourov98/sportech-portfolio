"use client";
import { useEffect, useMemo, useState } from "react";
import { authFetch } from "@/utils/api";

/* ---------- helpers ---------- */
function makeKey(x, i) {
  return x.id || x._id || x.uuid || x.createdAt || `row-${i}`;
}

async function uploadToCloudinary(file) {
  if (!file) return null;
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  if (!cloud || !preset) throw new Error("Cloudinary env vars missing");
  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", preset);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/upload`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) {
    let msg = "Upload failed";
    try {
      const j = await res.json();
      msg = j?.error?.message || msg;
    } catch {}
    throw new Error(msg);
  }
  const data = await res.json();
  return data.secure_url;
}

function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-5 text-[#1b1d1e] shadow-lg">
        <div className="flex items-center justify-between mb-3">
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

function Stars({ value, onChange }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          type="button"
          key={n}
          onClick={() => onChange(n)}
          aria-label={`${n} star`}
          className={`text-2xl leading-none ${
            n <= value ? "text-yellow-400" : "text-black/20"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

/* ---------- main ---------- */
export default function FeedbackManager() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  // modal/edit state
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null); // whole row
  const [name, setName] = useState("");
  const [stars, setStars] = useState(5);
  const [message, setMessage] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await authFetch("/feedback", { method: "GET" });
        if (mounted) setRows(Array.isArray(data) ? data : []);
      } catch (e) {
        setMsg(e.message || "Failed to load feedback.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  function openEdit(row) {
    setEditing(row);
    setName(row.name || "");
    setStars(Number(row.stars) || 5);
    setMessage(row.message || "");
    setAvatarUrl(row.avatar || "");
    setFile(null);
    setFormError("");
    setOpen(true);
  }

  function onPick(ev) {
    const f = ev.target.files?.[0] || null;
    setFile(f);
    if (f) {
      const reader = new FileReader();
      reader.onload = () => setAvatarUrl(String(reader.result || ""));
      reader.readAsDataURL(f);
    }
  }

  async function submit(e) {
    e.preventDefault();
    setFormError("");
    try {
      setSaving(true);
      let finalAvatar = editing?.avatar || "";
      if (file instanceof File) {
        finalAvatar = await uploadToCloudinary(file);
      }
      const payload = JSON.stringify({
        name,
        stars: Number(stars) || 1,
        avatar: finalAvatar,
        message,
      });
      const id = editing?.id || editing?._id;
      const updated = await authFetch(`/feedback/${id}`, {
        method: "PUT",
        body: payload,
      });
      setRows((arr) =>
        arr.map((r) => (r.id === id || r._id === id ? updated : r))
      );
      setOpen(false);
    } catch (err) {
      setFormError(err?.message || "Update failed.");
    } finally {
      setSaving(false);
    }
  }

  const list = useMemo(() => rows ?? [], [rows]);

  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-2xl font-bold text-white">Feedback</h3>
        <p className="text-white/70">
          Edit existing testimonials. Creation happens on the public site.
        </p>
      </div>

      {loading ? (
        <p className="text-white/80">Loading…</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((f, i) => (
            <div
              key={makeKey(f, i)}
              className="rounded-2xl bg-white/5 border border-white/10 p-4 flex gap-3"
            >
              <div className="h-14 w-14 overflow-hidden rounded-full bg-white/10 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {f.avatar ? (
                  <img
                    src={f.avatar}
                    alt={f.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-white/50">
                    👤
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-white">{f.name}</p>
                    <p className="text-sm text-yellow-300">
                      {"★".repeat(Number(f.stars) || 0)}
                      <span className="text-white/40">
                        {" "}
                        ({Number(f.stars) || 0})
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => openEdit(f)}
                    className="rounded-lg bg-white/10 px-3 py-1 text-sm hover:bg-white/20"
                  >
                    Edit
                  </button>
                </div>
                <p className="mt-2 text-white/80 text-sm">{f.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {msg && <p className="text-sm text-white/80">{msg}</p>}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Edit feedback"
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
              form="fb-form"
              disabled={saving}
              className="rounded-lg px-4 py-2 bg-[#EDF900] text-black font-semibold hover:brightness-95 disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
          </>
        }
      >
        <form id="fb-form" onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded border border-black/10 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Stars</label>
            <Stars value={stars} onChange={setStars} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full rounded border border-black/10 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Avatar</label>
            <label className="inline-flex items-center gap-2 rounded-xl bg-[#EDF900] text-black font-semibold px-4 py-2 cursor-pointer hover:brightness-95">
              📷 Choose photo
              <input
                type="file"
                accept="image/*"
                onChange={onPick}
                className="hidden"
              />
            </label>
            {avatarUrl && (
              <div className="mt-3 h-20 w-20 overflow-hidden rounded-full border border-black/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatarUrl}
                  alt="avatar preview"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>

          {formError && <p className="text-sm text-red-600">{formError}</p>}
        </form>
      </Modal>
    </section>
  );
}
