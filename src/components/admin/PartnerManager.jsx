// src/app/(admin)/PartnerManager.jsx
"use client";
import { useEffect, useMemo, useState } from "react";
import { authFetch } from "@/utils/api";

/* --------- helpers --------- */
// keep words intact where possible; cap length and add ellipsis
const truncate = (str = "", max = 100) => {
  const s = String(str).trim();
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  // try not to cut the last word
  const soft = cut.replace(/\s+\S*$/, "");
  return (soft.length >= max * 0.6 ? soft : cut) + "…";
};

const makeKey = (p, i) =>
  p.id || p._id || p.slug || p.uuid || p.createdAt || `partner-${i}`;

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
  // NEW fields
  const [specialization, setSpecialization] = useState("");
  const [region, setRegion] = useState("");
  const [language, setLanguage] = useState("");

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
    // NEW fields
    setSpecialization(row.specialization ?? "");
    setRegion(row.region ?? "");
    setLanguage(row.language ?? "");
    setFormError("");
    setOpen(true);
  }

  // Build PUT payload (keep existing keys as you had them; add new ones)
  function buildPayload(original) {
    return JSON.stringify({
      name: original.name ?? "", // read-only, but send back unchanged
      short_description: shortDesc ?? "",
      description: description ?? "",
      website: website ?? "",
      googlePlay: googlePlay ?? "", // keeping the camelCase you already use
      appGallery: appGallery ?? "", // same
      // NEW fields (strings)
      specialization: specialization ?? "",
      region: region ?? "",
      language: language ?? "",
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
        // NEW fields pass through as-is
        specialization: p.specialization,
        region: p.region,
        language: p.language,
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
        <h2 className="text-2xl font-bold text-[#EDF900]">Our Partners</h2>
        <p className="text-white">
          View details. You can edit all fields except{" "}
          <span className="font-semibold">Name</span> and{" "}
          <span className="font-semibold">Logo</span>.
        </p>
      </div>

      {loading ? (
        <p className="text-white/80">Loading…</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => {
            const gPlay = p.googlePlay ?? p.google_play;
            const appGal = p.appGallery ?? p.app_gallery;

            return (
              <div
                key={makeKey(p, i)}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
              >
                {/* Large logo / cover area */}
                <div className="relative w-full aspect-[4/3] bg-white/80">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {p.logo ? (
                    <img
                      src={p.logo}
                      alt={p.name}
                      className="absolute inset-0 h-full w-full object-contain object-center"
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center text-3xl text-white/50">
                      🏢
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="min-w-0 truncate text-lg font-semibold text-[#EDF900]">
                      {p.name}
                    </h3>

                    {/* EDIT button — top-right */}
                    <button
                      onClick={() => openEdit(p)}
                      className="shrink-0 rounded-lg bg-white/10 px-3 py-1.5 text-sm text-[#EDF900] hover:bg-white/20"
                    >
                      Edit
                    </button>
                  </div>

                  {(p.short_description ?? p.shortDesc) && (
                    <div className="mt-4">
                      <p className="text-md font-bold uppercase tracking-wide text-[#EDF900]">
                        Short description
                      </p>
                      <p className="mt-1 text-white">
                        {truncate(p.short_description ?? p.shortDesc, 80)}
                      </p>
                    </div>
                  )}

                  {p.description && (
                    <div className="mt-4">
                      <p className="text-md font-bold uppercase tracking-wide text-[#EDF900]">
                        Description
                      </p>
                      <p className="mt-1 whitespace-pre-line text-white/90">
                        {truncate(p.description, 150)}
                      </p>
                    </div>
                  )}

                  {/* NEW: Specialization / Region / Language */}
                  {(p.specialization || p.region || p.language) && (
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {p.specialization && (
                        <div>
                          <p className="text-xs text-[#EDF900]">
                            Specialization
                          </p>
                          <p className="mt-1 break-words text-white">
                            {p.specialization}
                          </p>
                        </div>
                      )}
                      {p.region && (
                        <div>
                          <p className="text-xs text-[#EDF900]">Region</p>
                          <p className="mt-1 break-words text-white">
                            {p.region}
                          </p>
                        </div>
                      )}
                      {p.language && (
                        <div>
                          <p className="text-xs text-[#EDF900]">Language</p>
                          <p className="mt-1 break-words text-white">
                            {p.language}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {(p.website || gPlay || appGal) && (
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {p.website && (
                        <div>
                          <p className="text-xs text-[#EDF900]">Website</p>
                          <a
                            href={p.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 block break-words text-white underline decoration-white/30 underline-offset-2 hover:decoration-white"
                          >
                            {p.website}
                          </a>
                        </div>
                      )}

                      {gPlay && (
                        <div>
                          <p className="text-xs text-[#EDF900]">Google Play</p>
                          <a
                            href={gPlay}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 block break-words text-white underline decoration-white/30 underline-offset-2 hover:decoration-white"
                          >
                            {gPlay}
                          </a>
                        </div>
                      )}

                      {appGal && (
                        <div>
                          <p className="text-xs text-[#EDF900]">AppGallery</p>
                          <a
                            href={appGal}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 block break-words text-white underline decoration-white/30 underline-offset-2 hover:decoration-white"
                          >
                            {appGal}
                          </a>
                        </div>
                      )}
                    </div>
                  )}
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
        title="Edit partner"
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
              form="partner-form"
              disabled={saving}
              className="rounded-lg bg-[#EDF900] px-4 py-2 font-semibold text-black hover:brightness-95 disabled:opacity-60"
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
              <label className="mb-1 block text-sm font-medium">Name</label>
              <input
                value={current?.name ?? ""}
                readOnly
                className="w-full rounded border border-black/10 bg-black/5 px-3 py-2"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Logo</label>
              <input
                value={current?.logo ?? ""}
                readOnly
                className="w-full rounded border border-black/10 bg-black/5 px-3 py-2"
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
            <label className="mb-1 block text-sm font-medium">
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
            <label className="mb-1 block text-sm font-medium">
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

          {/* NEW: specialization / region / language */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-3">
              <label className="mb-1 block text-sm font-medium">
                Specialization
              </label>
              <textarea
                rows={3}
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="w-full rounded border border-black/10 px-3 py-2"
                placeholder="e.g., Designing and developing immersive games for multiple platforms."
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Region</label>
              <input
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full rounded border border-black/10 px-3 py-2"
                placeholder="e.g., Latin America"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Language</label>
              <input
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full rounded border border-black/10 px-3 py-2"
                placeholder="e.g., English"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-1">
              <label className="mb-1 block text-sm font-medium">Website</label>
              <input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full rounded border border-black/10 px-3 py-2"
                placeholder="https://…"
              />
            </div>
            <div className="md:col-span-1">
              <label className="mb-1 block text-sm font-medium">
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
              <label className="mb-1 block text-sm font-medium">
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
