"use client";

import { trackLead } from "@/components/MetaPixel";

interface Props {
  waNumber: string;
  message?: string;
  label?: string;
}

export function FloatingWhatsApp({
  waNumber,
  message = "Halo TNT SPORT APPAREL, saya tertarik dengan jersey custom. Bisa info lebih lanjut?",
  label = "Floating WhatsApp Button",
}: Props) {
  const handleClick = () => {
    trackLead(label, 95000, "IDR", "WhatsApp Lead");
  };

  const href = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label="Chat WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] shadow-lg shadow-[#25d366]/30 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-[#25d366]/40 sm:bottom-8 sm:right-8"
      style={{ cursor: "pointer" }}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="white"
        aria-hidden="true"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91A9.85 9.85 0 0 0 12.04 2Zm5.8 14.11c-.25.7-1.45 1.34-2 1.38-.51.05-.99.23-3.35-.7-2.85-1.12-4.64-4.05-4.78-4.24-.14-.19-1.13-1.51-1.13-2.88 0-1.37.72-2.05.97-2.33.25-.28.55-.35.73-.35h.53c.17 0 .4-.06.62.48.23.55.79 1.92.86 2.06.07.14.11.3.02.49-.09.19-.46.74-.64.93-.13.14-.28.3-.12.58.16.28.71 1.17 1.52 1.89 1.04.93 1.74 1.22 2.02 1.36.28.14.44.12.61-.07.16-.19.7-.81.89-1.09.19-.28.37-.23.63-.14.25.09 1.62.76 1.9.9.28.14.46.21.53.32.07.12.07.68-.18 1.38Z" />
      </svg>
    </a>
  );
}
