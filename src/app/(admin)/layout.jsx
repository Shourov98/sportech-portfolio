// app/(auth)/layout.tsx
import "@/app/globals.css";

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      {/* No Navbar/Footer here */}
      <body className="bg-[#262626] min-h-[100svh]">{children}</body>
    </html>
  );
}
