'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import HomeContent from '@/components/home-content';

interface CursorImage {
  id: number;
  imageIndex: number;
  size: number;
  x: number;
  y: number;
}

export default function HomePage() {
  const [cursorImages, setCursorImages] = useState<CursorImage[]>([]);
  let imageId = 0;

  useEffect(() => {
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

      setCursorImages((prev) => {
        const updatedImages = [...prev, newImage].slice(-15);
        return updatedImages;
      });

      setTimeout(() => {
        setCursorImages((prev) => prev.filter((img) => img.id !== newImage.id));
      }, 2000);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {cursorImages.map((cursorImage) => (
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
