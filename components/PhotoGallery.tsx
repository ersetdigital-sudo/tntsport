"use client";

import { useState } from "react";
import Image from "next/image";

interface GalleryImage {
  src: string;
  alt: string;
}

export function PhotoGallery({ images }: { images: GalleryImage[] }) {
  const [zoomedImage, setZoomedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const doubledImages = [...images, ...images];

  function openZoom(index: number) {
    setCurrentIndex(index % images.length);
    setZoomedImage(images[index % images.length]);
  }

  function closeZoom() {
    setZoomedImage(null);
  }

  function goNext() {
    const next = (currentIndex + 1) % images.length;
    setCurrentIndex(next);
    setZoomedImage(images[next]);
  }

  function goPrev() {
    const prev = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prev);
    setZoomedImage(images[prev]);
  }

  return (
    <>
      {/* Auto-scrolling marquee gallery */}
      <div className="gallery-scroll group overflow-hidden">
        <div className="gallery-track flex gap-3">
          {doubledImages.map((img, i) => (
            <figure
              key={i}
              className="relative h-[200px] w-[280px] shrink-0 cursor-pointer overflow-hidden rounded-xl border border-white/10 transition hover:border-[#00aa13]/50 sm:h-[240px] sm:w-[340px]"
              onClick={() => openZoom(i)}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover transition duration-300 hover:scale-105" />
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/20">
                <span className="rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold text-[#080a07] opacity-0 shadow-lg transition group-hover:opacity-100">
                  Klik untuk zoom
                </span>
              </div>
            </figure>
          ))}
        </div>
      </div>

      {/* Zoom/Lightbox Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          onClick={closeZoom}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw] sm:max-w-[80vw]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={zoomedImage.src}
              alt={zoomedImage.alt}
              className="max-h-[80vh] w-auto rounded-xl object-contain shadow-2xl sm:rounded-2xl"
            />

            {/* Close button */}
            <button
              onClick={closeZoom}
              className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#080a07] shadow-lg transition hover:scale-110 sm:-right-3 sm:-top-3 sm:h-9 sm:w-9"
              aria-label="Tutup"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/40 sm:left-4 sm:h-12 sm:w-12"
              aria-label="Foto sebelumnya"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/40 sm:right-4 sm:h-12 sm:w-12"
              aria-label="Foto berikutnya"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
