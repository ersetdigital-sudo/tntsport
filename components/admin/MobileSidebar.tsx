"use client";

import { useEffect, useRef, useCallback } from "react";
import { X } from "lucide-react";
import { AdminSidebar } from "./AdminSidebar";

/**
 * MobileSidebar — slide-in drawer for admin navigation on mobile.
 * Triggered by AdminHeader's hamburger button via open/onClose props.
 */
export function MobileSidebar({
  open,
  onClose,
  email,
}: {
  open: boolean;
  onClose: () => void;
  email?: string | null;
}) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      // Only close if clicking the backdrop itself, not the drawer
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  return (
    <div
      className={`fixed inset-0 z-50 md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleBackdropClick}
      />
      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`absolute inset-y-0 left-0 w-[80%] max-w-[300px] bg-surface-card shadow-premium-xl flex flex-col transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header with close button */}
        <div className="flex items-center justify-between p-lg border-b border-hairline">
          <div className="flex items-center gap-sm">
            <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center">
              <span className="text-on-primary font-bold text-body-md">T</span>
            </div>
            <h1 className="text-body-sm text-ink font-bold">TNT SPORT</h1>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup menu"
            className="inline-flex items-center justify-center w-9 h-9 rounded-md text-stone hover:text-ink hover:bg-surface transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        {/* Nav — reuse AdminSidebar with mobile prop */}
        <div className="flex-1 overflow-y-auto">
          <AdminSidebar email={email} mobile onNavigate={onClose} />
        </div>
      </div>
    </div>
  );
}
