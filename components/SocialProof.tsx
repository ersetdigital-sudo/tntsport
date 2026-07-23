"use client";

import { useState, useEffect, useCallback } from "react";

const NOTIFICATIONS = [
  { name: "Nurul H.", city: "Bekasi", product: "Jersey Futsal Custom" },
  { name: "Andi P.", city: "Surabaya", product: "Jersey Voli Tim" },
  { name: "Rizky M.", city: "Bandung", product: "Jersey Badminton" },
  { name: "Dewi S.", city: "Jakarta", product: "Jersey Cycling" },
  { name: "Fajar K.", city: "Yogyakarta", product: "Jersey Running Event" },
  { name: "Siti A.", city: "Malang", product: "Jersey Sekolah" },
  { name: "Budi W.", city: "Semarang", product: "Jersey Basket" },
  { name: "Rina L.", city: "Medan", product: "Jersey Futsal Setelan" },
  { name: "Hendra T.", city: "Makassar", product: "Jersey Army Custom" },
  { name: "Putri D.", city: "Palembang", product: "Jersey Fantasy Club" },
  { name: "Agus R.", city: "Tangerang", product: "Jersey Corporate" },
  { name: "Maya N.", city: "Solo", product: "Jersey Racing" },
  { name: "Dian P.", city: "Denpasar", product: "Jersey Mancing" },
  { name: "Tono S.", city: "Bogor", product: "Jersey Futsal Full Print" },
  { name: "Lia K.", city: "Cirebon", product: "Jersey Voli Custom" },
];

const AVATAR_COLORS = [
  "#00aa13", "#f36458", "#3b82f6", "#f59e0b", "#8b5cf6",
  "#ec4899", "#14b8a6", "#f97316", "#6366f1", "#10b981",
];

const MINUTES_RANGE = [2, 5, 8, 12, 15, 18, 22, 25, 30];

function getInitials(name: string) {
  return name.split(" ").map(n => n[0]).join("");
}

function getAvatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function getRandomMinutes() {
  return MINUTES_RANGE[Math.floor(Math.random() * MINUTES_RANGE.length)];
}

interface Notification {
  id: number;
  name: string;
  city: string;
  product: string;
  minutes: number;
  color: string;
}

export function SocialProof() {
  const [current, setCurrent] = useState<Notification | null>(null);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [index, setIndex] = useState(0);

  const showNext = useCallback(() => {
    if (dismissed) return;

    const item = NOTIFICATIONS[index % NOTIFICATIONS.length];
    const notification: Notification = {
      id: Date.now(),
      name: item.name,
      city: item.city,
      product: item.product,
      minutes: getRandomMinutes(),
      color: getAvatarColor(item.name),
    };

    setCurrent(notification);
    setVisible(true);
    setIndex(prev => prev + 1);

    // Hide after 5 seconds
    setTimeout(() => {
      setVisible(false);
    }, 5000);
  }, [index, dismissed]);

  useEffect(() => {
    // First notification after 3 seconds
    const firstTimer = setTimeout(() => {
      showNext();
    }, 3000);

    // Then every 8 seconds
    const interval = setInterval(() => {
      showNext();
    }, 8000);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(interval);
    };
  }, [showNext]);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
  };

  if (!current) return null;

  return (
    <div
      className={`fixed bottom-5 left-5 z-50 transition-all duration-500 ${
        visible && !dismissed
          ? "translate-x-0 opacity-100"
          : "-translate-x-full opacity-0"
      }`}
    >
      <div className="relative w-[300px] rounded-2xl border border-white/10 bg-[#11140f] p-4 shadow-[0_8px_32px_rgba(0,0,0,.4)] backdrop-blur-sm">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full text-white/30 transition hover:bg-white/10 hover:text-white/60"
          aria-label="Tutup"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-black text-white"
            style={{ backgroundColor: current.color }}
          >
            {getInitials(current.name)}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white">
              {current.name} - {current.city}
            </p>
            <p className="mt-0.5 text-[11px] text-white/60">
              Baru memesan <span className="font-bold text-[#00aa13]">{current.product}</span>
            </p>
            <div className="mt-1.5 flex items-center gap-2">
              <span className="text-[9px] text-white/35">{current.minutes} menit yang lalu</span>
              <span className="flex items-center gap-0.5 text-[9px] text-[#00aa13]">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Verified
              </span>
            </div>
          </div>

          {/* Cart icon */}
          <div className="shrink-0 text-white/20">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
