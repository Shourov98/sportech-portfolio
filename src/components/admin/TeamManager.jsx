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
  const [photoUrl, setPhotoUrl] = useState(""); // existing photo for preview (edit)
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
    return () => (mounted = false);
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
    setEditingId(member._id);
    setName(member.name || "");
    setRole(member.role || "");
    setPhotoUrl(member.photo || "");
    setFile(null);
    setFormError("");
    setOpen(true);
  }

  // choose file handler
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

      // need a photo when creating (no URL input anymore)
      let finalPhoto = photoUrl;
      if (mode === "create") {
        if (!file) {
          setFormError("Please choose a photo.");
          setSaving(false);
          return;
        }
      }
      // upload new file if provided
      if (file instanceof File) {
        finalPhoto = await uploadToCloudinary(file);
      }

      const payload = JSON.stringify({
        name,
        role,
        photo: finalPhoto, // no 'order' field sent
      });

      if (mode === "create") {
        const created = await authFetch("/team", {
          method: "POST",
          body: payload,
        });
        setList((arr) => [...arr, created]); // backend sets order = cluster size
      } else {
        const updated = await authFetch(`/team/${editingId}`, {
          method: "PUT",
          body: payload,
        });
        setList((arr) => arr.map((m) => (m.id === editingId ? updated : m)));
      }

      setOpen(false);
    } catch (err) {
      setFormError(err?.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  // no manual order; display as-is (server decides)
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((m, i) => (
            <div
              key={makeKey(m, i)}
              className="rounded-2xl bg-white/5 border border-white/10 p-4 flex gap-3"
            >
              <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {m.photo ? (
                  <img
                    src={m.photo}
                    alt={m.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-white/50">
                    📷
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-white">{m.name}</p>
                    <p className="text-sm text-white/70">{m.role}</p>
                  </div>
                  <button
                    onClick={() => openEdit(m)}
                    className="rounded-lg bg-white/10 px-3 py-1 text-sm hover:bg-white/20"
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

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={mode === "create" ? "Add team member" : "Edit team member"}
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
              form="team-form"
              disabled={saving}
              className="rounded-lg px-4 py-2 bg-[#EDF900] text-black font-semibold hover:brightness-95 disabled:opacity-60"
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
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded border border-black/10 px-3 py-2"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full rounded border border-black/10 px-3 py-2"
              placeholder="Software Engineer"
            />
          </div>

          {/* highlighted choose-photo button + preview */}
          <div>
            <label className="block text-sm font-medium mb-2">Photo</label>

            <label className="inline-flex items-center gap-2 rounded-xl bg-[#EDF900] text-black font-semibold px-4 py-2 cursor-pointer hover:brightness-95">
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
              <div className="mt-3 h-28 w-28 overflow-hidden rounded-xl border border-black/10">
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
