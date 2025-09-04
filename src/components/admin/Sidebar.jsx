"use client";

const items = [
  { key: "home", label: "Home", icon: "🏠" },
  { key: "about", label: "About Us", icon: "👥" },
  { key: "services", label: "Our Services", icon: "🛠️" },
  { key: "contact", label: "Contact", icon: "💬" },
  { key: "partners", label: "Our Partner", icon: "🤝" },
  { key: "policies", label: "Policies", icon: "🛡️" },
];

export default function Sidebar({ active, onSelect, onLogout }) {
  return (
    /* FIXED to the very left; full height */
    <aside
      className="fixed left-0 top-0 z-40 h-screen w-[260px] bg-gradient-to-b from-[#1b1d1e] to-[#121314] text-white p-4 border-r border-white/10"
      aria-label="Admin sidebar"
    >
      <div className="flex flex-col items-center gap-2 mb-6 p-4">
        <img src="/Logo.svg" alt="SporTech" className="h-6 w-auto" />
        <span className="text-sm opacity-80">Manage your website content</span>
      </div>

      <nav className="space-y-3">
        {items.map((it) => (
          <button
            key={it.key}
            onClick={() => onSelect(it.key)}
            className={`w-full flex items-center gap-3 rounded-xl px-3 py-2 text-left transition
              ${
                active === it.key
                  ? "bg-[#EDF900] text-black font-semibold"
                  : "hover:bg-white/10"
              }`}
          >
            <span>{it.icon}</span>
            <span>{it.label}</span>
          </button>
        ))}
      </nav>

      <div className="absolute left-0 right-0 bottom-0 p-4 space-y-2">
        <a
          href="/change-password"
          className="block w-full text-center rounded-xl bg-white/10 hover:bg-white/20 py-2"
        >
          Change password
        </a>
        <button
          onClick={onLogout}
          className="w-full rounded-xl bg-white/10 hover:bg-white/20 py-2 text-left px-3"
        >
          ⏻ Log out
        </button>
      </div>
    </aside>
  );
}
