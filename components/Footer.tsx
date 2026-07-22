import type { Brand } from "@/lib/types";

/**
 * Footer — modern minimal footer for the landing page bio-link card.
 */
export function Footer({ brand }: { brand: Brand }) {
  const year = new Date().getFullYear();
  const { name, accentWord, whatsappNumber } = brand;
  const leading = name.replace(` ${accentWord}`, "");
  const waLink = `https://wa.me/${whatsappNumber}`;

  return (
    <footer className="w-full border-t border-black/[.06] bg-surface-card dark:border-white/10 dark:bg-surface-deep">
      {/* Main footer */}
      <div className="mx-auto max-w-lg px-6 py-6">
        {/* Brand + description */}
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="text-lg font-extrabold italic tracking-tight text-ink">
            {leading} <span className="text-primary">{accentWord}</span>
          </span>
          <p className="max-w-xs text-xs leading-relaxed text-charcoal">
            Pabrik jersey custom full printing. Desain bebas, harga pabrik, kirim se-Indonesia.
          </p>
        </div>

        {/* Social icons */}
        <div className="mt-5 flex justify-center gap-2.5">
          {/* WhatsApp */}
          <a href={waLink} target="_blank" rel="noopener noreferrer"
             className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[.08] bg-white text-charcoal transition-all hover:border-[#25D366] hover:text-[#25D366] hover:shadow-sm dark:border-white/10 dark:bg-surface-card dark:text-on-dark-mute dark:hover:border-[#25D366] dark:hover:text-[#25D366]"
             aria-label="WhatsApp">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
          {/* Instagram */}
          <a href="https://instagram.com/tntsport" target="_blank" rel="noopener noreferrer"
             className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[.08] bg-white text-charcoal transition-all hover:border-[#E1306C] hover:text-[#E1306C] hover:shadow-sm dark:border-white/10 dark:bg-surface-card dark:text-on-dark-mute dark:hover:border-[#E1306C] dark:hover:text-[#E1306C]"
             aria-label="Instagram">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
          </a>
          {/* TikTok */}
          <a href="https://tiktok.com/@tntsport" target="_blank" rel="noopener noreferrer"
             className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[.08] bg-white text-charcoal transition-all hover:border-black hover:text-black hover:shadow-sm dark:border-white/10 dark:bg-surface-card dark:text-on-dark-mute dark:hover:border-white dark:hover:text-white"
             aria-label="TikTok">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .55.04.81.12V9a6.33 6.33 0 00-.81-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 005.58 2.18V2.56a4.84 4.84 0 01-1.59.13z"/></svg>
          </a>
          {/* Facebook */}
          <a href="https://facebook.com/tntsport" target="_blank" rel="noopener noreferrer"
             className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[.08] bg-white text-charcoal transition-all hover:border-[#1877F2] hover:text-[#1877F2] hover:shadow-sm dark:border-white/10 dark:bg-surface-card dark:text-on-dark-mute dark:hover:border-[#1877F2] dark:hover:text-[#1877F2]"
             aria-label="Facebook">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-black/[.06] dark:border-white/10">
        <div className="mx-auto flex max-w-lg items-center justify-center px-6 py-3">
          <p className="text-[10px] text-stone">
            © {year} {brand.name}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
