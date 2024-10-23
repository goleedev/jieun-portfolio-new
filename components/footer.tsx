'use client';

import { usePathname } from 'next/navigation';

// const currentYear = new Date().getFullYear();
// const excludedPaths = ['/work', '/blog', '/guestbook', '/resume'];

export default function Footer() {
  const pathname = usePathname();

  // const pathSegments = pathname.split('/').filter(Boolean);
  // const isExcluded = excludedPaths.some(
  //   (path) => pathSegments[0] === path || pathname.startsWith(`/${path}/`)
  // );
  // const isVisible = pathname !== '/' && !isExcluded;

  // const footerClass = `
  //   font-normal font-sans mx-auto w-auto text-black pb-6 md:text-xs
  //   transition-all duration-300 ease-out
  //   ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
  // `;

  if (pathname === '/') {
    return (
      <footer className="font-medium text-center font-pretendard text-lg leading-6">
        Creating diverse works through UI/UX design and visual identity.
      </footer>
    );
  }

  return <footer />;
}
