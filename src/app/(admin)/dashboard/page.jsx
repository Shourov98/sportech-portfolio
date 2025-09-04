"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import GenericEditor from "@/components/admin/GenericEditor";
import HomeEditor from "@/components/admin/HomeEditor";

export default function DashboardPage() {
  const router = useRouter();
  const [tab, setTab] = useState("home");

  // Minimal authentication check: must have a token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.replace("/login");
  }, [router]);

  function logout() {
    localStorage.removeItem("token");
    sessionStorage.clear();
    router.replace("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1b1d1e] to-[#0d0e0f] text-white">
      <div className="mx-auto max-w-7xl flex">
        {/* Sticky, non-scrollable sidebar */}
        <Sidebar active={tab} onSelect={setTab} onLogout={logout} />

        {/* Scrollable content area */}
        <main className="flex-1 h-screen overflow-y-auto p-4 md:p-8">
          {tab === "home" && <HomeEditor />}

          {tab === "about" && (
            <GenericEditor title="About Us Content" endpoint="/admin/about" />
          )}
          {tab === "services" && (
            <GenericEditor
              title="Our Services Content"
              endpoint="/admin/services"
            />
          )}
          {tab === "contact" && (
            <GenericEditor title="Contact Content" endpoint="/admin/contact" />
          )}
          {tab === "partners" && (
            <GenericEditor
              title="Our Partner Content"
              endpoint="/admin/partners"
            />
          )}
          {tab === "policies" && (
            <GenericEditor
              title="Policies Content"
              endpoint="/admin/policies"
            />
          )}
        </main>
      </div>
    </div>
  );
}
