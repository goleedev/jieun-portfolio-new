import { useEffect } from 'react';

const useScrollBackground = (
  initialHtmlColor: string,
  scrolledHtmlColor: string,
  ulInitialColor: string,
  ulScrolledColor: string
) => {
  useEffect(() => {
    document.documentElement.style.backgroundColor = initialHtmlColor;

    const navList = document.querySelector('header ul') as HTMLElement | null;
    if (navList) {
      navList.style.backgroundColor =
        initialHtmlColor === scrolledHtmlColor
          ? ulScrolledColor
          : ulInitialColor;
    }

    const handleScroll = () => {
      const isScrolled = window.scrollY > window.innerHeight;

      document.documentElement.style.backgroundColor = isScrolled
        ? scrolledHtmlColor
        : initialHtmlColor;

      if (navList) {
        navList.style.backgroundColor = isScrolled
          ? ulScrolledColor
          : ulInitialColor;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.style.backgroundColor = '';
      if (navList) navList.style.backgroundColor = '';
    };
  }, [initialHtmlColor, scrolledHtmlColor, ulInitialColor, ulScrolledColor]);
};

export default useScrollBackground;
