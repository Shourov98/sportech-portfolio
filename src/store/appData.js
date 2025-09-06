"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const API = process.env.NEXT_PUBLIC_API_URL; // e.g. https://sportech-backend-152j.onrender.com/api
if (!API) console.warn("NEXT_PUBLIC_API_URL is not set.");

const TTL_MS = 12 * 60 * 60 * 1000; // 12 hours cache; set to Infinity if you never want to refetch

async function getJSON(path) {
  const url = `${API}${path}`;
  const res = await fetch(url, { cache: "no-store", next: { revalidate: 0 } });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText} for ${url}\n${text}`);
  }
  return res.json();
}

export const useAppData = create()(
  persist(
    (set, get) => ({
      // data
      partners: [],
      services: [],
      faqs: [],
      contact: null,
      team: [],
      feedback: [],

      // status
      loaded: false,
      fetchedAt: undefined,
      error: null,

      // actions
      clear: () =>
        set({
          partners: [],
          services: [],
          faqs: [],
          contact: null,
          team: [],
          feedback: [],
          loaded: false,
          fetchedAt: undefined,
          error: null,
        }),

      fetchAll: async ({ force } = {}) => {
        const { fetchedAt, loaded } = get();
        const fresh =
          loaded &&
          fetchedAt &&
          Number.isFinite(fetchedAt) &&
          Date.now() - fetchedAt < TTL_MS;

        if (fresh && !force) return;

        try {
          const [partners, services, faqs, contact, team, feedback] =
            await Promise.all([
              getJSON("/partners"),
              getJSON("/services"),
              getJSON("/faqs"),
              getJSON("/contact"),
              getJSON("/team"),
              getJSON("/feedback"),
            ]);

          set({
            partners,
            services,
            faqs,
            contact,
            team,
            feedback,
            loaded: true,
            fetchedAt: Date.now(),
            error: null,
          });

          console.log("team", team);
        } catch (err) {
          console.error("fetchAll failed:", err);
          set({ error: err?.message || "Failed to load data" });
        }
      },
    }),
    {
      name: "sportech-app-data",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        partners: s.partners,
        services: s.services,
        faqs: s.faqs,
        contact: s.contact,
        team: s.team,
        feedback: s.feedback,
        fetchedAt: s.fetchedAt,
        loaded: s.loaded,
      }),
      version: 1,
    }
  )
);
