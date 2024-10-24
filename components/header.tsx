'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { useMenu } from '@/utils/MenuContext';
import { cn } from '@/utils/merge-classes';
import { CloseIcon, MoreIcon } from './assets';

const NavLink = ({
  title,
  href,
  onClick,
  isActive,
  isLast,
}: {
  title: string;
  href: string;
  onClick?: () => void;
  isActive: boolean;
  isLast: boolean;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className="group relative font-pretendard text-4xl font-normal md:text-base md:h-10 md:py-[9px] md:px-3.5"
  >
    <p
      className={cn(
        'text-center',
        !isLast && 'pb-12',
        isActive && 'italic pb-12'
      )}
    >
      {title}
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
  const { isMenuOpen, toggleMenu } = useMenu();
  const pathname = usePathname();

  const navLinks = useMemo(
    () =>
      navItems.map(({ title, href }, index) => (
        <NavLink
          key={href}
          title={title}
          href={href}
          isLast={
            index === navItems.length - 1 ||
            (href === '/' && pathname === '/') ||
            (href !== '/' && pathname.startsWith(href))
          }
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
      <div
        className={
          'flex justify-between md:justify-normal items-center h-10 md:h-auto'
        }
      >
        <Link href="/" className="flex-shrink-0 z-[100]">
          <Image
            src={isMenuOpen ? '/images/logo-inverted.png' : '/images/logo.png'}
            alt="Logo"
            width={65}
            height={40}
            className="cursor-pointer w-[65px] h-10 fixed left-6 top-5"
            priority
          />
        </Link>

        <nav className="hidden md:flex w-full justify-center h-12">
          <ul className="flex space-x-1 items-center">{navLinks}</ul>
        </nav>

        <button
          className="md:hidden flex items-center fixed right-6 z-[100] w-12 h-12 justify-center"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <CloseIcon width={24} /> : <MoreIcon width={24} />}
        </button>
      </div>

      <>
        {isMenuOpen && (
          <nav className="md:hidden fixed min-h-dvh inset-x-0 top-0 left-0 bg-[#222] z-30">
            <div className="flex flex-col items-center justify-center relative min-h-dvh">
              <ul className="text-[#BCBDFD]">{navLinks}</ul>
            </div>
          </nav>
        )}
      </>
    </header>
  );
}
