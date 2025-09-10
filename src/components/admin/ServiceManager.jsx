"use client";
import { useEffect, useMemo, useState } from "react";
import { authFetch } from "@/utils/api";

/* helpers */
const keyOf = (s, i) =>
  s.id || s._id || s.slug || s.uuid || s.createdAt || `svc-${i}`;

function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white p-5 text-[#1b1d1e] shadow-lg">
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

/* main */
export default function ServiceManager() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  // modal/edit state
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  // load list
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // you can pass ?published=true if you only want published
        const data = await authFetch("/services", { method: "GET" });
        if (mounted) setRows(Array.isArray(data) ? data : []);
      } catch (e) {
        setMsg(e.message || "Failed to load services.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  function openEdit(row) {
    setCurrent(row);
    // Support both snake_case and camelCase coming from API
    setShortDesc(row.short_description ?? row.shortDesc ?? "");
    setDescription(row.description ?? "");
    setFormError("");
    setOpen(true);
  }

  // build a payload the API accepts:
  // PUT schema shows snake_case keys; we’ll send all non-editable fields unchanged.
  function buildPayload(original, { shortDesc, description }) {
    return JSON.stringify({
      title: original.title ?? "",
      subtitle: original.subtitle ?? "",
      short_description: shortDesc ?? "",
      description: description ?? "",
      banner_image: original.banner_image ?? original.bannerImage ?? "",
      right_image: original.right_image ?? original.rightImage ?? "",
    });
  }

  async function onSave(e) {
    e.preventDefault();
    setFormError("");
    if (!current) return;

    try {
      setSaving(true);
      const id = current.id || current._id || current.slug;
      const payload = buildPayload(current, { shortDesc, description });
      const updated = await authFetch(`/services/${id}`, {
        method: "PUT",
        body: payload,
      });

      // Normalize a bit so UI shows values after save regardless of case differences
      const normalized = (s) => ({
        ...s,
        shortDesc: s.short_description ?? s.shortDesc,
        bannerImage: s.banner_image ?? s.bannerImage,
        rightImage: s.right_image ?? s.rightImage,
      });

      setRows((arr) =>
        arr.map((r) =>
          (r.id || r._id || r.slug) === id ? normalized(updated) : r
        )
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
    <section className="space-y-3">
      <div>
        <h2 className="text-2xl font-bold text-white">Services</h2>
        <p className="text-white/70">
          View details. You can edit only the short description and full
          description.
        </p>
      </div>

      {loading ? (
        <p className="text-white/80">Loading…</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((s, i) => {
            const cover =
              s.banner_image ??
              s.bannerImage ??
              s.right_image ??
              s.rightImage ??
              null;

            return (
              <div
                key={keyOf(s, i)}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
              >
                {/* Smaller/capped cover so it doesn't look huge */}
                <div className="relative w-full aspect-[4/3] max-h-48 bg-white/10">
                  {/* always SVG: center both axes, no cropping */}
                  <img
                    src={cover}
                    alt={s.title}
                    className="absolute inset-0 h-full w-full object-contain object-center"
                  />
                </div>

                {/* Body */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-lg font-semibold text-[#EDF900]">
                        {s.title}
                      </h3>
                      {s.subtitle && (
                        <p className="mt-1 line-clamp-1 text-sm text-white/70">
                          {s.subtitle}
                        </p>
                      )}
                    </div>

                    {/* EDIT button — clearly visible top-right */}
                    <button
                      onClick={() => openEdit(s)}
                      className="shrink-0 rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/20"
                    >
                      Edit
                    </button>
                  </div>

                  {/* Short description (bold + clamped) */}
                  <div className="mt-4">
                    <p className="text-md font-bold uppercase tracking-wide text-[#EDF900]">
                      Short description
                    </p>
                    <p className="mt-1 text-white/90 line-clamp-3">
                      {s.short_description ?? s.shortDesc ?? ""}
                    </p>
                  </div>

                  {/* Description (bold + clamped) */}
                  <div className="mt-4">
                    <p className="text-md font-bold uppercase tracking-wide text-[#EDF900]">
                      Description
                    </p>
                    <p className="mt-1 text-white/90 line-clamp-5 whitespace-pre-line">
                      {s.description ?? ""}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {msg && <p className="text-sm text-white/80">{msg}</p>}

      {/* Edit modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Edit service content"
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
              form="service-edit-form"
              disabled={saving}
              className="rounded-lg px-4 py-2 bg-[#EDF900] text-black font-semibold hover:brightness-95 disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
          </>
        }
      >
        <form id="service-edit-form" onSubmit={onSave} className="space-y-4">
          {/* read-only fields */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                value={current?.title ?? ""}
                readOnly
                className="w-full rounded border border-black/10 px-3 py-2 bg-black/5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subtitle</label>
              <input
                value={current?.subtitle ?? ""}
                readOnly
                className="w-full rounded border border-black/10 px-3 py-2 bg-black/5"
              />
            </div>
          </div>

          {/* editable fields */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Short description
            </label>
            <input
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              required
              className="w-full rounded border border-black/10 px-3 py-2"
              placeholder="Brief summary…"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              rows={8}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full rounded border border-black/10 px-3 py-2"
              placeholder="Full description…"
            />
          </div>

          {formError && <p className="text-sm text-red-600">{formError}</p>}
        </form>
      </Modal>
    </section>
  );
}
