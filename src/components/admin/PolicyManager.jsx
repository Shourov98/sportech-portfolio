"use client";
import { useEffect, useMemo, useState } from "react";
import { authFetch } from "@/utils/api";

/** Small modal */
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

/**
 * PolicyManager
 * Props:
 *  - policyTitle: the exact policy title to manage (e.g., "Terms & Conditions", "Privacy Policy")
 */
export default function PolicyManager({ policyTitle }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  // editor state
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await authFetch("/policies", { method: "GET" });
        if (mounted) setList(Array.isArray(data) ? data : []);
      } catch (e) {
        setMsg(e.message || "Failed to load policies.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  const item = useMemo(
    () =>
      list.find(
        (p) => (p.title || "").toLowerCase() === policyTitle.toLowerCase()
      ),
    [list, policyTitle]
  );

  function openEdit() {
    setContent(item?.content || "");
    setFormError("");
    setOpen(true);
  }

  async function save(e) {
    e.preventDefault();
    setFormError("");
    try {
      setSaving(true);
      if (item) {
        // Update existing
        const id = item.id || item._id;
        const updated = await authFetch(`/policies/${id}`, {
          method: "PUT",
          body: JSON.stringify({ title: policyTitle, content }),
        });
        setList((arr) =>
          arr.map((p) => ((p.id || p._id) === id ? updated : p))
        );
      } else {
        // Create if missing
        const created = await authFetch("/policies", {
          method: "POST",
          body: JSON.stringify({ title: policyTitle, content }),
        });
        setList((arr) => [...arr, created]);
      }
      setOpen(false);
    } catch (err) {
      setFormError(err?.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="rounded-2xl bg-white/5 border border-white/10 p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm uppercase tracking-wide text-white/60">Title</p>
          <h3 className="text-xl font-semibold text-white">{policyTitle}</h3>

          <p className="mt-3 text-sm uppercase tracking-wide text-white/60">
            Content
          </p>
          {loading ? (
            <p className="text-white/80">Loading…</p>
          ) : (
            <p className="text-white/90 whitespace-pre-line">
              {item?.content || "— (not created yet) —"}
            </p>
          )}
        </div>

        <div className="shrink-0">
          {!loading &&
            (item ? (
              <button
                onClick={openEdit}
                className="h-9 rounded-lg bg-white/10 px-3 text-sm text-white hover:bg-white/20"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={openEdit}
                className="h-9 rounded-lg bg-[#EDF900] px-3 text-sm text-black font-semibold hover:brightness-95"
              >
                Create
              </button>
            ))}
        </div>
      </div>

      {msg && <p className="mt-3 text-sm text-white/80">{msg}</p>}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={item ? "Edit policy content" : "Create policy"}
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
              form={`policy-form-${policyTitle}`}
              disabled={saving}
              className="rounded-lg px-4 py-2 bg-[#EDF900] text-black font-semibold hover:brightness-95 disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save"}
            </button>
          </>
        }
      >
        <form
          id={`policy-form-${policyTitle}`}
          onSubmit={save}
          className="space-y-4"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              {/* Read-only per your requirement */}
              <input
                value={policyTitle}
                readOnly
                className="w-full rounded border border-black/10 px-3 py-2 bg-black/5"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full rounded border border-black/10 px-3 py-2"
              placeholder="Type the full policy content…"
            />
          </div>

          {formError && <p className="text-sm text-red-600">{formError}</p>}
        </form>
      </Modal>
    </section>
  );
}
