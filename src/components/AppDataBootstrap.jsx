"use client";
import { useEffect } from "react";
import { useAppData } from "@/store/appData";

export default function AppDataBootstrap() {
  const fetchAll = useAppData((s) => s.fetchAll);
  //console.log("fetchAll", fetchAll);

  useEffect(() => {
    fetchAll().catch(() => {});
  }, [fetchAll]);

  return null;
}
