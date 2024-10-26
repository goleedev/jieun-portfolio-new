'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const paths = ['/work', '/blog', '/guestbook', '/resume'];
const currentYear = new Date().getFullYear();

export default function Footer() {
  const pathname = usePathname();
  const existingPaths = paths.some(
    (path) =>
      pathname.startsWith(path) &&
      (pathname === path || pathname.startsWith(`${path}/`))
  );

  if (pathname === '/') {
    return (
      <footer className="font-medium text-center font-pretendard text-lg leading-6 pb-6">
        Creating diverse works through UI/UX design and visual identity.
      </footer>
    );
  }

  if (existingPaths) {
    return (
      <footer className="border-t border-[#CCC] pt-6">
        <section className="text-lg leading-6 font-medium pb-40 grid grid-cols-2">
          <p>Delight In Design</p>

          <div className="grid grid-cols-3">
            <div className="flex flex-col gap-1">
              <Link href="/work">Work</Link>
              <Link href="/blog">Blog</Link>
            </div>
            <div className="flex flex-col gap-1">
              <Link href="/resume">Resume</Link>
              <Link href="/guestbook">Guestbook</Link>
            </div>
            <div className="flex flex-col gap-1">
              <Link href="">Instagram</Link>
              <Link href="">Behance</Link>
              <Link href="">Linkedin</Link>
            </div>
          </div>
        </section>

        <p className="w-full pb-4 text-center font-pretendard leading-6 text-[#949494]">
          © {currentYear} JieunJang . All rights reserved.
        </p>
      </footer>
    );
  }

  return (
    <footer className="w-full text-center font-pretendard text-lg leading-6 text-[#949494]">
      © {currentYear} JieunJang . All rights reserved.
    </footer>
  );
}
