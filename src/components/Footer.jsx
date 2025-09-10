// components/Footer.jsx
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Server component: fetches public /contact and renders the footer.
 * Uses no-store so dashboard edits show up immediately.
 */
export default async function Footer() {
  // ----- defaults -----
  let contact = {
    address: "Riyadh, Saudi Arabia",
    email: "contact@sportech.com.sa",
    phone: "+966114222225",
  };

  let socials = [
    { label: "Facebook", href: "#", icon: <FacebookIcon /> },
    { label: "YouTube", href: "#", icon: <YouTubeIcon /> },
    { label: "TikTok", href: "#", icon: <TikTokIcon /> },
    { label: "Instagram", href: "#", icon: <InstagramIcon /> },
  ];

  const nav = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    { label: "Services & Solution", href: "/service" },
    { label: "Contact Us", href: "/contact-us" },
  ];

  const legal = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & conditions", href: "/terms-conditions" },
    { label: "FAQ", href: "/about-us#faq" },
  ];

  // ----- fetch live contact -----
  try {
    const res = await fetch(`${API_BASE}/contact`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      contact = {
        address: data?.location || contact.address,
        email: data?.email || contact.email,
        phone: data?.phone || contact.phone,
      };
      socials = [
        data?.facebook && {
          label: "Facebook",
          href: data.facebook,
          icon: <FacebookIcon />,
        },
        data?.youtube && {
          label: "YouTube",
          href: data.youtube,
          icon: <YouTubeIcon />,
        },
        data?.tiktok && {
          label: "TikTok",
          href: data.tiktok,
          icon: <TikTokIcon />,
        },
        data?.instagram && {
          label: "Instagram",
          href: data.instagram,
          icon: <InstagramIcon />,
        },
      ].filter(Boolean);
    }
  } catch {
    // fall back to defaults silently
  }

  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#EDF900] text-[#262626]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14">
        {/* top grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:gap-16">
          {/* Talk to us */}
          <div>
            <h3 className="text-[clamp(20px,3.2vw,28px)] font-bold tracking-tight">
              Talk To Us
            </h3>
            <ul className="mt-4 space-y-4 text-[clamp(14px,2.4vw,18px)]">
              <ContactItem icon={<LocationIcon />}>
                {contact.address}
              </ContactItem>
              <ContactItem icon={<MailIcon />}>
                <a
                  href={`mailto:${contact.email}`}
                  className="underline underline-offset-2"
                >
                  {contact.email}
                </a>
              </ContactItem>
              <ContactItem icon={<PhoneIcon />}>
                <a href={`tel:${contact.phone}`}>{contact.phone}</a>
              </ContactItem>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-[clamp(20px,3.2vw,28px)] font-bold tracking-tight">
              Navigation
            </h3>
            <ul className="mt-4 space-y-3 text-[clamp(14px,2.4vw,18px)] font-medium">
              {nav.map((n) => (
                <li key={n.label}>
                  <Link href={n.href} className="hover:opacity-80">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow us */}
          <div>
            <h3 className="text-[clamp(20px,3.2vw,28px)] font-bold tracking-tight">
              Follow Us
            </h3>
            <p className="mt-2 max-w-xs text-[clamp(12px,2.2vw,14px)] opacity-80">
              Follow us on social media to find out the latest updates on our
              progress
            </p>
            <div className="mt-4 flex items-center gap-4">
              {socials.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#262626] text-[#262626] transition hover:bg-black/5"
                >
                  {s.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* divider */}
        <hr className="my-8 border-[#262626]/40" />

        {/* bottom row */}
        <div className="flex flex-col-reverse items-start gap-4 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-10 gap-y-2 text-[clamp(13px,2vw,16px)] font-medium">
            {legal.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="hover:opacity-80">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-[clamp(12px,1.8vw,14px)] opacity-80">
            Copyright © {year} sportech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* --- tiny presentational bits --- */
function ContactItem({ icon, children }) {
  return (
    <li className="flex items-center gap-3">
      <span className="grid size-6 place-items-center">{icon}</span>
      <span>{children}</span>
    </li>
  );
}

/* Inline icons (same shapes as your original) */
function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M12 22s8-4.5 8-11A8 8 0 1 0 4 11c0 6.5 8 11 8 11Z" />
      <circle cx="12" cy="11" r="3" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 5 8-5" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.32 1.78.6 2.63a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.45-1.16a2 2 0 0 1 2.11-.45c.85.28 1.73.48 2.63.6A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.2V12h2.2V9.8c0-2.2 1.3-3.4 3.3-3.4.95 0 1.95.17 1.95.17v2.15h-1.1c-1.08 0-1.41.67-1.41 1.36V12h2.4l-.38 2.9h-2.02v7A10 10 0 0 0 22 12Z" />
    </svg>
  );
}
function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.8 4.6 12 4.6 12 4.6s-5.8 0-7.5.5a3 3 0 0 0-2.1 2.1A31.3 31.3 0 0 0 2 12a31.3 31.3 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.7.5 7.5.5 7.5.5s5.8 0 7.5-.5a3 3 0 0 0 2.1-2.1c.3-1.6.4-3.2.4-4.8s-.1-3.2-.4-4.8ZM10 14.7V9.3L15.2 12 10 14.7Z" />
    </svg>
  );
}
function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <path d="M16 8.04c1.28.93 2.84 1.48 4.54 1.48V7.03a6.73 6.73 0 0 1-4.56-1.77V3h-3.6v12.1a2.5 2.5 0 1 1-2.1-2.45v-3.6A6.1 6.1 0 1 0 14.38 19V8.04H16Z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm8 3H9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3Zm-3 3.8A3.2 3.2 0 1 1 8.8 12 3.2 3.2 0 0 1 12 8.8Zm5.1-.9a.9.9 0 1 1-.9.9.9.9 0 0 1 .9-.9Z" />
    </svg>
  );
}
