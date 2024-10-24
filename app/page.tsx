'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import HomeContent from '@/components/home-content';
import { useMenu } from '@/utils/MenuContext';

interface CursorImage {
  id: number;
  imageIndex: number;
  size: number;
  x: number;
  y: number;
}

export default function HomePage() {
  const { isMenuOpen } = useMenu();
  const [cursorImages, setCursorImages] = useState<CursorImage[]>([]);
  let imageId = 0;

  useEffect(() => {
    if (isMenuOpen) return;

    let lastImageTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = new Date().getTime();
      if (currentTime - lastImageTime < 80) return;
      lastImageTime = currentTime;

      const newImage: CursorImage = {
        id: imageId++,
        imageIndex: Math.floor(Math.random() * 10),
        size: 80 + Math.floor(Math.random() * (250 - 80)),
        x: e.clientX,
        y: e.clientY,
      };

      setCursorImages((prev) => [...prev, newImage].slice(-15));

      setTimeout(() => {
        setCursorImages((prev) => prev.filter((img) => img.id !== newImage.id));
      }, 2000);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMenuOpen]);

  return (
    <>
      {!isMenuOpen &&
        cursorImages.map((cursorImage) => (
          <div
            key={cursorImage.id}
            className="absolute pointer-events-none z-50"
            style={{
              left: `${cursorImage.x}px`,
              top: `${cursorImage.y}px`,
              width: `${cursorImage.size}px`,
              height: `${cursorImage.size}px`,
              transform: `translate(-50%, -50%)`,
              animation: 'fadeOut 2s linear forwards',
            }}
          >
            <Image
              src={`/images/image${cursorImage.imageIndex + 1}.png`}
              alt={`Cursor Image ${cursorImage.imageIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>
        ))}
      <HomeContent />
    </>
  );
}
