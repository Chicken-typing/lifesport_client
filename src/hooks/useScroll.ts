import { useState, useEffect } from 'react';

export function useScroll() {
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setLastScroll(scrollPosition.y);
      setScrollPosition({
        x: window.scrollX,
        y: window.scrollY,
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollPosition.y]);

  return { ...scrollPosition, lastScroll };
}
