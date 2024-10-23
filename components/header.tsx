'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';

const NavLink = ({
  title,
  href,
  onClick,
  isActive,
}: {
  title: string;
  href: string;
  onClick?: () => void;
  isActive: boolean;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className="group relative font-pretendard font-medium text-4xl md:font-normal md:text-base md:h-10 md:py-[9px] md:px-3.5"
  >
    <p className={`flex ${isActive ? 'italic' : ''}`}>
      <span>{title}</span>
    </p>
  </Link>
);

const navItems = [
  { title: 'Work', href: '/work' },
  { title: 'Guestbook', href: '/guestbook' },
  { title: 'Resume', href: '/resume' },
  { title: 'Blog', href: '/blog' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const navLinks = useMemo(
    () =>
      navItems.map(({ title, href }) => (
        <NavLink
          key={href}
          title={title}
          href={href}
          isActive={
            href === pathname || (href !== '/' && pathname.startsWith(href))
          }
          onClick={isMenuOpen ? toggleMenu : undefined}
        />
      )),
    [pathname, isMenuOpen]
  );

  return (
    <header className="w-full py-4 h-20">
      <div className="flex items-center h-10 md:h-auto">
        {!isMenuOpen && (
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={65}
              height={40}
              className="cursor-pointer w-[65px] h-10"
              priority
            />
          </Link>
        )}

        <nav className="opacity-0 md:opacity-100 md:flex md:w-[calc(100%-130px)] justify-center h-12">
          <ul className="flex space-x-1 items-center">{navLinks}</ul>
        </nav>

        <button
          className="md:hidden flex items-center z-50 pr-6"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <span
            className={`font-mono text-xs ${
              isMenuOpen ? 'text-white md:text-black' : ''
            }`}
          >
            {isMenuOpen ? 'CLOSE' : 'MENU'}
          </span>
        </button>
      </div>

      <>
        {isMenuOpen && (
          <nav className="md:hidden fixed inset-x-0 top-0 bg-dark-gray z-30">
            <div className="flex flex-col items-center justify-center h-full relative pt-10">
              <ul className="space-y-10 text-white">{navLinks}</ul>
            </div>
          </nav>
        )}
      </>
    </header>
  );
}
