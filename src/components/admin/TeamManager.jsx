"use client";
import { useEffect, useMemo, useState } from "react";
import { authFetch } from "@/utils/api";

// simple modal
function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-5 text-[#1b1d1e] shadow-lg">
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

// cloudinary upload
async function uploadToCloudinary(file) {
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

export default function TeamManager() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  // modal + form state
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create"); // 'create' | 'edit'
  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const makeKey = (m, i) =>
    m.id || m._id || m.uuid || m.slug || m.email || m.createdAt || `temp-${i}`;

  // load team (GET /team)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await authFetch("/team", { method: "GET" });
        if (!mounted) return;
        setList(Array.isArray(data) ? data : []);
      } catch (e) {
        setMsg(e.message || "Failed to load team.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  function openCreate() {
    setMode("create");
    setEditingId(null);
    setName("");
    setRole("");
    setPhotoUrl("");
    setFile(null);
    setFormError("");
    setOpen(true);
  }

  function openEdit(member) {
    setMode("edit");
    setEditingId(member._id || member.id);
    setName(member.name || "");
    setRole(member.role || "");
    setPhotoUrl(member.photo || "");
    setFile(null);
    setFormError("");
    setOpen(true);
  }

  function onPickFile(ev) {
    const f = ev.target.files?.[0] || null;
    setFile(f);
    if (f) {
      const reader = new FileReader();
      reader.onload = () => setPhotoUrl(String(reader.result || ""));
      reader.readAsDataURL(f);
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    setFormError("");
    try {
      setSaving(true);

      let finalPhoto = photoUrl;
      if (mode === "create" && !file) {
        setFormError("Please choose a photo.");
        setSaving(false);
        return;
      }
      if (file instanceof File) {
        finalPhoto = await uploadToCloudinary(file);
      }

      const payload = JSON.stringify({ name, role, photo: finalPhoto });

      if (mode === "create") {
        const created = await authFetch("/team", {
          method: "POST",
          body: payload,
        });
        setList((arr) => [...arr, created]);
      } else {
        const updated = await authFetch(`/team/${editingId}`, {
          method: "PUT",
          body: payload,
        });
        setList((arr) =>
          arr.map((m) =>
            m.id === editingId || m._id === editingId ? updated : m
          )
        );
      }

      setOpen(false);
    } catch (err) {
      setFormError(err?.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  // server decides order; display as-is
  const members = useMemo(() => list ?? [], [list]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Team</h2>
          <p className="text-white/70">Manage your team members</p>
        </div>
        <button
          onClick={openCreate}
          className="rounded-xl bg-[#EDF900] px-4 py-2 font-semibold text-black hover:brightness-95"
        >
          + Add member
        </button>
      </div>

      {loading ? (
        <p className="text-white/80">Loading…</p>
      ) : (
        // GRID: 1 col (sm), 2 cols (md), 3 cols (lg)
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((m, i) => (
            <div
              key={makeKey(m, i)}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
            >
              {/* Big image preview (uniform height via aspect ratio) */}
              <div className="relative w-full aspect-[4/3] bg-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {m.photo ? (
                  <img
                    src={m.photo}
                    alt={m.name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-white/50 text-3xl">
                    📷
                  </div>
                )}
              </div>

              {/* Card body */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-white">{m.name}</p>
                    <p className="text-sm text-white/70">{m.role}</p>
                  </div>
                  <button
                    onClick={() => openEdit(m)}
                    className="rounded-lg bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {msg && <p className="text-sm text-white/80">{msg}</p>}

      {/* Modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={mode === "create" ? "Add team member" : "Edit team member"}
        footer={
          <>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg bg-black/5 px-4 py-2 hover:bg-black/10"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              form="team-form"
              disabled={saving}
              className="rounded-lg bg-[#EDF900] px-4 py-2 font-semibold text-black hover:brightness-95 disabled:opacity-60"
            >
              {saving
                ? "Saving…"
                : mode === "create"
                ? "Create"
                : "Save changes"}
            </button>
          </>
        }
      >
        <form id="team-form" onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded border border-black/10 px-3 py-2"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Role</label>
            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full rounded border border-black/10 px-3 py-2"
              placeholder="Software Engineer"
            />
          </div>

          {/* Choose photo + bigger preview */}
          <div>
            <label className="mb-2 block text-sm font-medium">Photo</label>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#EDF900] px-4 py-2 font-semibold text-black hover:brightness-95">
              📷 Choose photo
              <input
                type="file"
                accept="image/*"
                onChange={onPickFile}
                className="hidden"
              />
            </label>

            <div className="mt-2 text-sm text-black/70">
              {file
                ? `Selected: ${file.name}`
                : mode === "edit" && photoUrl
                ? "Current photo loaded"
                : "No file selected"}
            </div>

            {photoUrl && (
              <div className="mt-3 h-40 w-40 md:h-48 md:w-48 overflow-hidden rounded-xl border border-black/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photoUrl}
                  alt="preview"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            {mode === "create" && (
              <p className="mt-1 text-xs text-black/60">
                Photo is required for new member.
              </p>
            )}
          </div>

          {formError && <p className="text-sm text-red-600">{formError}</p>}
        </form>
      </Modal>
    </div>
  );
}
