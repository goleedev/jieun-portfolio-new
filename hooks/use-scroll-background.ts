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

      if (isScrolled && scrolledHtmlColor === '#EFEFEF') {
        document.documentElement.classList.add('grey-background');
      } else {
        document.documentElement.classList.remove('grey-background');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.style.backgroundColor = '';
      if (navList) navList.style.backgroundColor = '';
      document.documentElement.classList.remove('grey-background');
    };
  }, [initialHtmlColor, scrolledHtmlColor, ulInitialColor, ulScrolledColor]);
};

export default useScrollBackground;
