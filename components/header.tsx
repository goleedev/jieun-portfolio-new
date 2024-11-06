'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo } from 'react';

import { useMenu } from '@/utils/menu-context';
import { cn } from '@/utils/merge-classes';

interface INavItem {
  title: string;
  href: string;
  description?: string;
}

const navItems: INavItem[] = [
  { title: 'Work', href: '/work', description: 'Discover My' },
  { title: 'Resume', href: '/resume', description: 'View My' },
  { title: 'Blog', href: '/blog', description: 'Read My' },
  { title: 'Guestbook', href: '/guestbook', description: 'Sign My' },
];

const NavLink = ({
  title,
  href,
  description,
  onClick,
  isActive,
}: {
  title: string;
  href: string;
  description?: string;
  onClick?: () => void;
  isActive: boolean;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className={cn(
      'group flex flex-col gap-2 md:gap-0 py-4 relative border-b border-[#404040] md:border-none font-pretendard text-[28px] font-normal transition-all duration-200 md:text-base md:h-10 md:leading-6 md:py-[9px] md:px-3.5 md:hover:text-white md:hover:bg-black md:hover:rounded-full',
      isActive && 'md:text-white md:bg-black md:rounded-full'
    )}
  >
    <p className="text-xs uppercase visible md:hidden">{description}</p>
    <p className={cn('text-left md:text-center', isActive && 'text-white')}>
      {title}
    </p>
  </Link>
);

const currentYear = new Date().getFullYear();

export default function Header() {
  const { isMenuOpen, toggleMenu } = useMenu();
  const pathname = usePathname();

  const navLinks = useMemo(
    () =>
      navItems.map(({ title, href, description }) => (
        <NavLink
          key={href}
          title={title}
          description={description}
          href={href}
          isActive={
            href === pathname || (href !== '/' && pathname.startsWith(href))
          }
          onClick={isMenuOpen ? toggleMenu : undefined}
        />
      )),
    [pathname, isMenuOpen]
  );

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMenuOpen]);

  return (
    <header className="w-full py-4 h-20 z-[100]">
      <div className="flex justify-between md:justify-normal items-center h-10 md:h-auto">
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

        <nav className="hidden md:flex w-full justify-center h-12 fixed top-4">
          <ul className="flex px-1 space-x-1 items-center transition-all duration-200 rounded-full">
            {navLinks}
          </ul>
        </nav>

        <button
          className={cn(
            'md:hidden flex items-center fixed top-5 right-5 z-[100] w-fit h-10 px-3.5 py-[9px] justify-center',
            isMenuOpen ? 'text-white' : 'menu-button'
          )}
          onClick={toggleMenu}
        >
          {isMenuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0.4 }}
            exit={{ opacity: 0, y: -80 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden fixed min-h-dvh inset-x-0 -top-px pb-px left-0 bg-[#222] z-30"
          >
            <div className="flex flex-col items-start md:items-center justify-center relative pt-[84px] px-4 md:pt-0 md:px-0">
              <ul className="text-[#949494] w-full">{navLinks}</ul>
            </div>
            <p className="w-full absolute bottom-5 text-center font-pretendard text-xs leading-[18px] text-[#949494] z-[100]">
              © {currentYear} JieunJang . All rights reserved.
            </p>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
