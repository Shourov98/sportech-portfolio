"use client";
import { useEffect, useMemo, useState } from "react";
import { authFetch } from "@/utils/api";

/* --------- helpers --------- */
const makeKey = (p, i) =>
  p.id || p._id || p.slug || p.uuid || p.createdAt || `partner-${i}`;

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

/* --------- main --------- */
export default function PartnerManager() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  // modal state
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [googlePlay, setGooglePlay] = useState("");
  const [appGallery, setAppGallery] = useState("");
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await authFetch("/partners", { method: "GET" });
        if (mounted) setRows(Array.isArray(data) ? data : []);
      } catch (e) {
        setMsg(e.message || "Failed to load partners.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  function openEdit(row) {
    setCurrent(row);
    setShortDesc(row.short_description ?? row.shortDesc ?? "");
    setDescription(row.description ?? "");
    setWebsite(row.website ?? "");
    setGooglePlay(row.googlePlay ?? row.google_play ?? "");
    setAppGallery(row.appGallery ?? row.app_gallery ?? "");
    setFormError("");
    setOpen(true);
  }

  // Build PUT payload in snake_case as per your API
  function buildPayload(original) {
    return JSON.stringify({
      name: original.name ?? "", // read-only, but send back unchanged
      short_description: shortDesc ?? "",
      description: description ?? "",
      website: website ?? "",
      googlePlay: googlePlay ?? "", // PUT schema screenshot shows camel here
      appGallery: appGallery ?? "", // (keeping as the docs show for PUT)
      logo: original.logo ?? "", // read-only, keep unchanged
    });
  }

  async function onSave(e) {
    e.preventDefault();
    if (!current) return;
    setFormError("");

    try {
      setSaving(true);
      const id = current.id || current._id || current.slug;
      const payload = buildPayload(current);
      const updated = await authFetch(`/partners/${id}`, {
        method: "PUT",
        body: payload,
      });

      // Normalize so UI keeps showing consistent keys
      const normalize = (p) => ({
        ...p,
        shortDesc: p.short_description ?? p.shortDesc,
        googlePlay: p.googlePlay ?? p.google_play,
        appGallery: p.appGallery ?? p.app_gallery,
      });

      setRows((arr) =>
        arr.map((r) =>
          (r.id || r._id || r.slug) === id ? normalize(updated) : r
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
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Our Partners</h2>
        <p className="text-white/70">
          View details. You can edit all fields except{" "}
          <span className="font-semibold">Name</span> and{" "}
          <span className="font-semibold">Logo</span>.
        </p>
      </div>

      {loading ? (
        <p className="text-white/80">Loading…</p>
      ) : (
        <div className="space-y-4">
          {list.map((p, i) => (
            <div
              key={makeKey(p, i)}
              className="rounded-2xl bg-white/5 border border-white/10 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    {/* logo preview (read-only) */}
                    <div className="h-10 w-10 overflow-hidden rounded bg-white/10 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      {p.logo ? (
                        <img
                          src={p.logo}
                          alt={p.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-white/50">
                          🏢
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {p.name}
                    </h3>
                  </div>

                  {(p.short_description ?? p.shortDesc) && (
                    <>
                      <p className="mt-3 text-sm uppercase tracking-wide text-white/60">
                        Short description
                      </p>
                      <p className="text-white">
                        {p.short_description ?? p.shortDesc}
                      </p>
                    </>
                  )}

                  {p.description && (
                    <>
                      <p className="mt-3 text-sm uppercase tracking-wide text-white/60">
                        Description
                      </p>
                      <p className="text-white/90 whitespace-pre-line">
                        {p.description}
                      </p>
                    </>
                  )}

                  {(p.website ||
                    p.googlePlay ||
                    p.appGallery ||
                    p.google_play ||
                    p.app_gallery) && (
                    <div className="mt-3 grid gap-2 sm:grid-cols-3">
                      {p.website && (
                        <div>
                          <p className="text-xs text-white/60">Website</p>
                          <p className="text-white break-all">{p.website}</p>
                        </div>
                      )}
                      {(p.googlePlay || p.google_play) && (
                        <div>
                          <p className="text-xs text-white/60">Google Play</p>
                          <p className="text-white break-all">
                            {p.googlePlay ?? p.google_play}
                          </p>
                        </div>
                      )}
                      {(p.appGallery || p.app_gallery) && (
                        <div>
                          <p className="text-xs text-white/60">AppGallery</p>
                          <p className="text-white break-all">
                            {p.appGallery ?? p.app_gallery}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => openEdit(p)}
                  className="h-9 rounded-lg bg-white/10 px-3 text-sm text-white hover:bg-white/20"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {msg && <p className="text-sm text-white/80">{msg}</p>}

      {/* Edit modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Edit partner"
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
              form="partner-form"
              disabled={saving}
              className="rounded-lg px-4 py-2 bg-[#EDF900] text-black font-semibold hover:brightness-95 disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
          </>
        }
      >
        <form id="partner-form" onSubmit={onSave} className="space-y-4">
          {/* read-only */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                value={current?.name ?? ""}
                readOnly
                className="w-full rounded border border-black/10 px-3 py-2 bg-black/5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Logo</label>
              <input
                value={current?.logo ?? ""}
                readOnly
                className="w-full rounded border border-black/10 px-3 py-2 bg-black/5"
              />
              {current?.logo && (
                <div className="mt-2 h-12 w-12 overflow-hidden rounded border border-black/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={current.logo}
                    alt="logo"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* editable */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Short description
            </label>
            <input
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              className="w-full rounded border border-black/10 px-3 py-2"
              placeholder="Brief summary…"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded border border-black/10 px-3 py-2"
              placeholder="Full description…"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium mb-1">Website</label>
              <input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full rounded border border-black/10 px-3 py-2"
                placeholder="https://…"
              />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-medium mb-1">
                Google Play
              </label>
              <input
                value={googlePlay}
                onChange={(e) => setGooglePlay(e.target.value)}
                className="w-full rounded border border-black/10 px-3 py-2"
                placeholder="https://play.google.com/…"
              />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-medium mb-1">
                AppGallery
              </label>
              <input
                value={appGallery}
                onChange={(e) => setAppGallery(e.target.value)}
                className="w-full rounded border border-black/10 px-3 py-2"
                placeholder="https://appgallery.huawei.com/…"
              />
            </div>
          </div>

          {formError && <p className="text-sm text-red-600">{formError}</p>}
        </form>
      </Modal>
    </section>
  );
}
