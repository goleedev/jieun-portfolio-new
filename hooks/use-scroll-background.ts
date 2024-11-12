import { useEffect } from 'react';

const useScrollBackground = (
  initialHtmlColor: string,
  scrolledHtmlColor: string,
  ulInitialColor: string,
  ulScrolledColor: string
) => {
  useEffect(() => {
    const navList = document.querySelector('header ul') as HTMLElement | null;

    document.documentElement.style.backgroundColor = initialHtmlColor;

    if (navList) {
      navList.style.backgroundColor =
        initialHtmlColor === '#EFEFEF' ? ulScrolledColor : ulInitialColor;
    }

    const handleScroll = () => {
      const isScrolled = window.scrollY > window.innerHeight * 0.6;

      document.documentElement.style.backgroundColor = isScrolled
        ? scrolledHtmlColor
        : initialHtmlColor;

      if (navList) {
        if (initialHtmlColor === '#EFEFEF') {
          navList.style.backgroundColor = ulScrolledColor;
        } else {
          navList.style.backgroundColor = isScrolled
            ? ulScrolledColor
            : ulInitialColor;
        }
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
