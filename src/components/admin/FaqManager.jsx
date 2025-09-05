"use client";
import { useEffect, useMemo, useState } from "react";
import { authFetch } from "@/utils/api";

function makeKey(x, i) {
  return x.id || x._id || x.uuid || x.createdAt || `faq-${i}`;
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

export default function FaqManager() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  // modal state
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create"); // create | edit
  const [editingId, setEditingId] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await authFetch("/faqs", { method: "GET" });
        if (mounted) setRows(Array.isArray(data) ? data : []);
      } catch (e) {
        setMsg(e.message || "Failed to load FAQs.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  function openCreate() {
    setMode("create");
    setEditingId(null);
    setQuestion("");
    setAnswer("");
    setFormError("");
    setOpen(true);
  }

  function openEdit(row) {
    setMode("edit");
    setEditingId(row.id || row._id);
    setQuestion(row.question || "");
    setAnswer(row.answer || "");
    setFormError("");
    setOpen(true);
  }

  async function submit(e) {
    e.preventDefault();
    setFormError("");
    try {
      setSaving(true);
      const payload = JSON.stringify({ question, answer });

      if (mode === "create") {
        const created = await authFetch("/faqs", {
          method: "POST",
          body: payload,
        });
        setRows((arr) => [...arr, created]);
      } else {
        const id = editingId;
        const updated = await authFetch(`/faqs/${id}`, {
          method: "PUT",
          body: payload,
        });
        setRows((arr) =>
          arr.map((r) => (r.id === id || r._id === id ? updated : r))
        );
      }
      setOpen(false);
    } catch (err) {
      setFormError(err?.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  const list = useMemo(() => rows ?? [], [rows]);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white">FAQs</h3>
          <p className="text-white/70">Create and edit questions & answers.</p>
        </div>
        <button
          onClick={openCreate}
          className="rounded-xl bg-[#EDF900] px-4 py-2 font-semibold text-black hover:brightness-95"
        >
          + Add FAQ
        </button>
      </div>

      {loading ? (
        <p className="text-white/80">Loading…</p>
      ) : (
        <div className="space-y-3">
          {list.map((f, i) => (
            <div
              key={makeKey(f, i)}
              className="rounded-2xl bg-white/5 border border-white/10 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">{f.question}</p>
                  <p className="text-white/80 mt-1">{f.answer}</p>
                </div>
                <button
                  onClick={() => openEdit(f)}
                  className="rounded-lg bg-white/10 px-3 py-1 text-sm hover:bg-white/20"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {msg && <p className="text-sm text-white/80">{msg}</p>}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={mode === "create" ? "Create FAQ" : "Edit FAQ"}
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
              form="faq-form"
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
        <form id="faq-form" onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Question</label>
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
              className="w-full rounded border border-black/10 px-3 py-2"
              placeholder="e.g., What services do you provide?"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Answer</label>
            <textarea
              rows={4}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
              className="w-full rounded border border-black/10 px-3 py-2"
              placeholder="Your detailed answer…"
            />
          </div>
          {formError && <p className="text-sm text-red-600">{formError}</p>}
        </form>
      </Modal>
    </section>
  );
}
