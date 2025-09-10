"use client";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";

// ----- config -----
const API_BASE =
  (typeof window !== "undefined" &&
    (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "")) ||
  "http://localhost:4000";

const ENDPOINT = (slug) => `${API_BASE}/policies/${encodeURIComponent(slug)}`;

// optional: read token from localStorage for admin-protected PUT
function authHeaders() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// normalize API section into editor-friendly shape
function normalizeSection(sec) {
  const title = sec?.title ?? sec?.heading ?? "";
  // description can be string or string[]
  let text = "";
  if (typeof sec?.description === "string") {
    text = sec.description;
  } else if (Array.isArray(sec?.description)) {
    text = sec.description.join("\n\n");
  } else if (Array.isArray(sec?.paragraphs)) {
    text = sec.paragraphs.join("\n\n");
  }
  return { title, text };
}

function PolicyEditor({ slug }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [sections, setSections] = useState([]); // [{title, text}]

  // GET
  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      setError("");
      setOk("");
      try {
        const res = await fetch(ENDPOINT(slug), { cache: "no-store" });
        if (!res.ok) {
          const t = await res.text();
          throw new Error(`HTTP ${res.status} — ${t || "Failed to load"}`);
        }
        const data = await res.json();
        if (!isMounted) return;
        setTitle(data?.title || "");
        setSubtitle(data?.subtitle || "");
        const arr = Array.isArray(data?.sections) ? data.sections : [];
        setSections(arr.map(normalizeSection));
      } catch (e) {
        if (!isMounted) return;
        setError(e?.message || "Failed to load policy.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  // PUT (save entire doc)
  async function onSave() {
    setSaving(true);
    setError("");
    setOk("");
    try {
      // always send description as a single string (paragraphs separated by blank line)
      const body = {
        title,
        subtitle,
        sections: sections.map((s) => ({
          title: s.title,
          description: (s.text || "").trim(), // string
        })),
      };

      const res = await fetch(ENDPOINT(slug), {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(`HTTP ${res.status} — ${t || "Save failed"}`);
      }
      setOk("Saved successfully.");
    } catch (e) {
      setError(e?.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  function addSection() {
    setSections((prev) => [...prev, { title: "", text: "" }]);
  }

  function removeSection(idx) {
    setSections((prev) => prev.filter((_, i) => i !== idx));
  }

  function updateSection(idx, patch) {
    setSections((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, ...patch } : s))
    );
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-white/10 bg-[#111] p-6 text-white">
        Loading…
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/10 bg-[#111] p-5 md:p-6 text-white">
      <div className="flex items-center gap-3 mb-4">
        <span className="rounded-full bg-[#EDF900] px-3 py-1 text-xs font-bold text-black uppercase">
          {slug === "privacy-policy" ? "Privacy Policy" : "Terms & Conditions"}
        </span>
      </div>

      {/* Title / Subtitle */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm opacity-80">Title</label>
          <input
            className="w-full rounded-lg border border-white/10 bg-[#1a1a1a] px-3 py-2 outline-none focus:ring-2 focus:ring-[#EDF900]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Privacy Policy"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm opacity-80">Subtitle</label>
          <input
            className="w-full rounded-lg border border-white/10 bg-[#1a1a1a] px-3 py-2 outline-none focus:ring-2 focus:ring-[#EDF900]"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Short summary shown under the title"
          />
        </div>
      </div>

      {/* Sections */}
      <div className="mt-6 flex items-center justify-between">
        <h3 className="text-lg font-bold">Sections</h3>
        <button
          onClick={addSection}
          className="rounded-lg bg-[#EDF900] px-3 py-1.5 text-sm font-semibold text-black hover:brightness-95"
        >
          + Add section
        </button>
      </div>

      {sections.length === 0 && (
        <p className="mt-3 text-sm text-white/60">No sections yet.</p>
      )}

      <div className="mt-4 grid grid-cols-1 gap-4">
        {sections.map((sec, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-white/10 bg-[#151515] p-4"
          >
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <label className="mb-1 block text-sm opacity-80">
                  Section title
                </label>
                <input
                  className="w-full rounded-lg border border-white/10 bg-[#1a1a1a] px-3 py-2 outline-none focus:ring-2 focus:ring-[#EDF900]"
                  value={sec.title}
                  onChange={(e) =>
                    updateSection(idx, { title: e.target.value })
                  }
                  placeholder="e.g., 1. Introduction"
                />
              </div>
              <button
                onClick={() => removeSection(idx)}
                className="rounded-md border border-white/10 bg-[#1a1a1a] px-3 py-2 text-sm text-white/80 hover:bg-[#222]"
                title="Remove section"
              >
                Delete
              </button>
            </div>

            <div className="mt-3">
              <label className="mb-1 block text-sm opacity-80">
                Content (use blank line to separate paragraphs)
              </label>
              <textarea
                className="h-36 w-full resize-y rounded-lg border border-white/10 bg-[#1a1a1a] px-3 py-2 outline-none focus:ring-2 focus:ring-[#EDF900]"
                value={sec.text}
                onChange={(e) => updateSection(idx, { text: e.target.value })}
                placeholder={`Paragraph 1...\n\nParagraph 2...`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Save / status */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={onSave}
          disabled={saving}
          className={clsx(
            "rounded-xl bg-[#EDF900] px-4 py-2 font-semibold text-black shadow hover:brightness-95",
            saving && "opacity-60"
          )}
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
      </div>

      {error && (
        <p className="mt-3 text-sm font-medium text-red-400">Error: {error}</p>
      )}
      {ok && <p className="mt-3 text-sm font-medium text-emerald-400">{ok}</p>}
    </div>
  );
}

export default function PolicyManager() {
  const [tab, setTab] = useState("privacy-policy"); // or "terms-and-conditions"

  return (
    <section>
      {/* Tabs */}
      <div className="mb-4 flex gap-3">
        {[
          { label: "Privacy Policy", slug: "privacy-policy" },
          { label: "Terms & Conditions", slug: "terms-and-conditions" },
        ].map((t) => (
          <button
            key={t.slug}
            onClick={() => setTab(t.slug)}
            className={clsx(
              "rounded-full border px-3 py-1.5 text-sm",
              tab === t.slug
                ? "border-[#EDF900] bg-[#EDF900] font-semibold text-black"
                : "border-white/10 bg-[#1a1a1a] text-white hover:bg-[#222]"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Editor */}
      <PolicyEditor slug={tab} />
    </section>
  );
}
