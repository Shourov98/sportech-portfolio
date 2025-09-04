"use client";
import { useEffect, useState } from "react";
import { authFetch } from "@/utils/api";

export default function HomeEditor() {
  const [data, setData] = useState({
    heroTitle: "",
    heroDescription: "",
    ctaText: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await authFetch("/admin/home", { method: "GET" });
        if (mounted && res) setData((d) => ({ ...d, ...res }));
      } catch (e) {
        setMsg(e.message || "Failed to load.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  async function onSave() {
    try {
      setSaving(true);
      setMsg("");
      await authFetch("/admin/home", {
        method: "PUT",
        body: JSON.stringify(data),
      });
      setMsg("Saved.");
    } catch (e) {
      setMsg(e.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-white/80">Loading…</p>;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white/5 p-4 md:p-6 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Home Content</h2>
          <button
            onClick={onSave}
            disabled={saving}
            className="rounded-xl bg-[#EDF900] px-4 py-2 font-semibold text-black hover:brightness-95 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>

        <label className="block text-sm font-semibold text-white mb-1">
          Hero title
        </label>
        <input
          value={data.heroTitle || ""}
          onChange={(e) =>
            setData((d) => ({ ...d, heroTitle: e.target.value }))
          }
          className="w-full rounded-lg bg-white/10 text-white px-3 py-2 mb-4 outline-none focus:ring-2 focus:ring-[#EDF900]"
          placeholder="Type title…"
        />

        <label className="block text-sm font-semibold text-white mb-1">
          Hero Description
        </label>
        <textarea
          rows={4}
          value={data.heroDescription || ""}
          onChange={(e) =>
            setData((d) => ({ ...d, heroDescription: e.target.value }))
          }
          className="w-full rounded-lg bg-white/10 text-white px-3 py-2 mb-4 outline-none focus:ring-2 focus:ring-[#EDF900]"
          placeholder="Write description…"
        />

        <label className="block text-sm font-semibold text-white mb-1">
          CTA Button Text
        </label>
        <input
          value={data.ctaText || ""}
          onChange={(e) => setData((d) => ({ ...d, ctaText: e.target.value }))}
          className="w-full rounded-lg bg-white/10 text-white px-3 py-2 outline-none focus:ring-2 focus:ring-[#EDF900]"
          placeholder="e.g., Services & Solutions"
        />
      </div>
      {msg && <p className="text-sm text-white/80">{msg}</p>}
    </div>
  );
}
