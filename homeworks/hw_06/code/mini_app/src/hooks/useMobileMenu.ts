import { useState, useEffect, useRef } from "react";

export const useMobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Закрытие меню при клике по ссылке
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Закрытие меню при клике вне области меню
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        toggleRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !toggleRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    // Закрытие меню при изменении маршрута
    const handleRouteChange = () => {
      closeMenu();
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("popstate", handleRouteChange);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return {
    isMenuOpen,
    toggleMenu,
    closeMenu,
    menuRef,
    toggleRef,
  };
};
