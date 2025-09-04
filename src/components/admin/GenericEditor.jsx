"use client";
import { useEffect, useState } from "react";
import { authFetch } from "@/utils/api";

export default function GenericEditor({ title, endpoint }) {
  const [data, setData] = useState({ sectionTitle: "", body: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await authFetch(endpoint, { method: "GET" });
        if (mounted && res) setData((d) => ({ ...d, ...res }));
      } catch (e) {
        setMsg(e.message || "Failed to load.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, [endpoint]);

  async function onSave() {
    try {
      setSaving(true);
      setMsg("");
      await authFetch(endpoint, {
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
    <div className="rounded-2xl bg-white/5 p-4 md:p-6 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <button
          onClick={onSave}
          disabled={saving}
          className="rounded-xl bg-[#EDF900] px-4 py-2 font-semibold text-black hover:brightness-95 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>

      <label className="block text-sm font-semibold text-white mb-1">
        Section Title
      </label>
      <input
        value={data.sectionTitle || ""}
        onChange={(e) =>
          setData((d) => ({ ...d, sectionTitle: e.target.value }))
        }
        className="w-full rounded-lg bg-white/10 text-white px-3 py-2 mb-4 outline-none focus:ring-2 focus:ring-[#EDF900]"
        placeholder="Title…"
      />

      <label className="block text-sm font-semibold text-white mb-1">
        Body
      </label>
      <textarea
        rows={8}
        value={data.body || ""}
        onChange={(e) => setData((d) => ({ ...d, body: e.target.value }))}
        className="w-full rounded-lg bg-white/10 text-white px-3 py-2 outline-none focus:ring-2 focus:ring-[#EDF900]"
        placeholder="Write content…"
      />

      {msg && <p className="mt-4 text-sm text-white/80">{msg}</p>}
    </div>
  );
}
