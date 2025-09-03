import Image from "next/image";

export default function Brand() {
  return (
    <div className="absolute top-12 left-1/2 -translate-x-1/2">
      <Image
        src="/Logo.svg" // make sure your svg is inside public/logo.svg
        alt="SporTech Logo"
        width={160}
        height={40}
        priority
        className="h-auto w-[160px] sm:w-[200px]"
      />
    </div>
  );
}
