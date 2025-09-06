import SetPasswordForm from "./SetPasswordForm";

export default function Page({ searchParams }) {
  // Next.js provides `searchParams` here on the server.
  return <SetPasswordForm searchParams={searchParams} />;
}
