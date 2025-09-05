"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import GenericEditor from "@/components/admin/GenericEditor";
import HomeEditor from "@/components/admin/HomeEditor";
import TeamManager from "@/components/admin/TeamManager";
import FeedbackManager from "@/components/admin/FeedbackManager";
import FaqManager from "@/components/admin/FaqManager";
import ServiceManager from "@/components/admin/ServiceManager";
import PartnerManager from "@/components/admin/PartnerManager";
import PolicyManager from "@/components/admin/PolicyManager";
import ContactManager from "@/components/admin/ContactManager";

const SIDEBAR_W = 260; // keep in sync with Sidebar w-[260px]

export default function DashboardPage() {
  const router = useRouter();
  const [tab, setTab] = useState("home");

  // minimal auth check
  useEffect(() => {
    if (!localStorage.getItem("token")) router.replace("/login");
  }, [router]);

  function logout() {
    localStorage.removeItem("token");
    sessionStorage.clear();
    router.replace("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1b1d1e] to-[#0d0e0f] text-white">
      {/* fixed sidebar on the far left */}
      <Sidebar active={tab} onSelect={setTab} onLogout={logout} />

      {/* content pushed right by the sidebar width */}
      <main
        className="min-h-screen p-4 md:p-8"
        style={{ marginLeft: `${SIDEBAR_W}px` }}
      >
        {tab === "home" && <TeamManager />}

        {tab === "about" && (
          <div className="space-y-10">
            <FeedbackManager />
            <FaqManager />
          </div>
        )}
        {tab === "services" && <ServiceManager />}

        {tab === "contact" && <ContactManager />}

        {tab === "partners" && <PartnerManager />}

        {tab === "policies" && (
          <div className="space-y-6">
            <PolicyManager policyTitle="Privacy Policy" />
          </div>
        )}
      </main>
    </div>
  );
}
