import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowLeft, Menu, MoonStar, SunMedium, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "../../data/portfolio";
import { useActiveSection } from "../../hooks/useActiveSection";
import BrandLogo from "../shared/BrandLogo";

const sectionIdsByPath = {
  "/": ["home", "about", "projects", "contact"],
  "/about": ["about", "journey", "milestones"],
  "/projects": ["projects"],
};

function getNavigationHref(item, pathname) {
  if (item.section === "journey" || item.section === "milestones") {
    return pathname === "/about" ? `#${item.section}` : item.href;
  }
  if (pathname === "/about" && item.section === "about") return "/about";
  if (pathname === "/projects" && item.section === "projects") return "/projects";
  if (item.href.startsWith("#")) {
    return pathname === "/" ? item.href : `/${item.href}`;
  }
  return item.href;
}

function getCurrentNavigationState(item, pathname, activeSection) {
  if (item.section === activeSection) return "location";
  if (pathname === "/about" && item.section === "about") return "page";
  if (pathname === "/projects" && item.section === "projects") return "page";
  return undefined;
}

function SiteHeader({ showSidebar = true }) {
  const { pathname } = useLocation();
  const sectionIds = sectionIdsByPath[pathname] ?? sectionIdsByPath["/"];
  const visibleNavItems =
    pathname === "/about"
      ? navItems
      : navItems.filter(
          (item) =>
            item.section !== "journey" && item.section !== "milestones",
        );
  const activeSection = useActiveSection(sectionIds);
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const savedTheme = window.localStorage.getItem("gilang-portfolio-theme");
      if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme === "dark";
      }
    } catch {
      // Use the system preference when local storage is unavailable.
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const mobileMenuTriggerRef = useRef(null);
  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    document.documentElement.style.colorScheme = darkMode ? "dark" : "light";
    const favicon = document.querySelector("#site-favicon");
    if (favicon) {
      favicon.href = darkMode
        ? "/images/logo/favicon-black-32.png"
        : "/images/logo/favicon-white-32.png";
    }
  }, [darkMode]);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusableElements = () =>
      mobileMenuRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ) ?? [];

    mobileMenuRef.current?.querySelector(".mobile-menu-close")?.focus();

    const handleMenuKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsMobileMenuOpen(false);
        mobileMenuTriggerRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = Array.from(focusableElements());
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!mobileMenuRef.current?.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleMenuKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleMenuKeyDown);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const desktopBreakpoint = window.matchMedia("(min-width: 768px)");
    const closeMenuOnDesktop = (event) => {
      if (event.matches) {
        setIsMobileMenuOpen(false);
      }
    };

    desktopBreakpoint.addEventListener("change", closeMenuOnDesktop);
    return () =>
      desktopBreakpoint.removeEventListener("change", closeMenuOnDesktop);
  }, []);

  const openMobileMenu = () => {
    const trigger = mobileMenuTriggerRef.current;
    if (!trigger) return;

    const bounds = trigger.getBoundingClientRect();
    const x = bounds.left + bounds.width / 2;
    const y = bounds.top + bounds.height / 2;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const radius = Math.max(
      Math.hypot(x, y),
      Math.hypot(width - x, y),
      Math.hypot(x, height - y),
      Math.hypot(width - x, height - y),
    );

    mobileMenuRef.current?.style.setProperty("--menu-origin-x", `${x}px`);
    mobileMenuRef.current?.style.setProperty("--menu-origin-y", `${y}px`);
    mobileMenuRef.current?.style.setProperty("--menu-radius", `${radius}px`);
    setIsMobileMenuOpen(true);
  };

  const closeMobileMenu = (restoreFocus = true) => {
    setIsMobileMenuOpen(false);
    if (restoreFocus) mobileMenuTriggerRef.current?.focus();
  };

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(
          "gilang-portfolio-theme",
          next ? "dark" : "light",
        );
      } catch {
        // The current page still updates if local storage is unavailable.
      }
      return next;
    });
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-[var(--line)] bg-[var(--panel)]/80 backdrop-blur-xl">
        <nav className="site-header-inner" aria-label="Site header">
          <div className="header-brand-group">
            {pathname !== "/" && (
              <Link
                to="/#home"
                className="icon-button header-back-link"
                aria-label="Back to home"
                title="Back to home"
              >
                <ArrowLeft size={18} aria-hidden="true" />
              </Link>
            )}
            <Link
              to={pathname === "/" ? "#home" : "/#home"}
              className="brand-mark"
              aria-label="Gilang Faid logo — home"
            >
              <BrandLogo />
            </Link>
            <Link
              to={pathname === "/" ? "#home" : "/#home"}
              className="brand-copy-link"
              aria-label="Gilang Faid — home"
            >
              <span className="brand-copy">
                <strong>Gilang Faid</strong>
                <small>Portfolio / 2026</small>
              </span>
            </Link>
          </div>

          <div className="header-controls">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${darkMode ? "light" : "dark"} theme`}
              aria-pressed={darkMode}
              className="icon-button"
            >
              {darkMode ? <SunMedium size={16} /> : <MoonStar size={16} />}
            </button>

            {pathname !== "/" && (
              <Link to="/#contact" className="header-contact-link">
                Let’s talk
              </Link>
            )}

            <button
              ref={mobileMenuTriggerRef}
              type="button"
              onClick={() =>
                isMobileMenuOpen ? closeMobileMenu(false) : openMobileMenu()
              }
              aria-label={
                isMobileMenuOpen ? "Close navigation" : "Open navigation"
              }
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              className="mobile-menu-trigger icon-button"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {showSidebar && (
        <nav className="desktop-section-rail" aria-label="Portfolio navigation">
          <span className="section-rail-caption">Explore</span>
          {visibleNavItems.map((item, index) => (
            <Link
              key={item.label}
              to={getNavigationHref(item, pathname)}
              className="section-rail-link"
              aria-current={getCurrentNavigationState(
                item,
                pathname,
                activeSection,
              )}
              aria-label={item.label}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.label}</strong>
            </Link>
          ))}
        </nav>
      )}

      <button
        type="button"
        className={`mobile-menu-backdrop${isMobileMenuOpen ? " is-open" : ""}`}
        onClick={() => closeMobileMenu()}
        aria-label="Close navigation"
        tabIndex={isMobileMenuOpen ? 0 : -1}
        inert={!isMobileMenuOpen}
      />

      <div
        ref={mobileMenuRef}
        id="mobile-navigation"
        className={`mobile-menu-panel${isMobileMenuOpen ? " is-open" : ""}`}
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal="true"
        aria-hidden={!isMobileMenuOpen}
        inert={!isMobileMenuOpen}
      >
        <button
          type="button"
          className="mobile-menu-close icon-button"
          onClick={() => closeMobileMenu()}
          aria-label="Close navigation"
          tabIndex={isMobileMenuOpen ? 0 : -1}
        >
          <X size={20} />
        </button>

        <nav className="mobile-menu-content" aria-label="Main navigation">
          <p className="mobile-menu-eyebrow">Take a look around</p>
          {visibleNavItems.map((item, index) => (
            <Link
              key={item.href}
              to={getNavigationHref(item, pathname)}
              className="mobile-menu-link"
              aria-current={getCurrentNavigationState(
                item,
                pathname,
                activeSection,
              )}
              onClick={closeMobileMenu}
            >
              <span className="mobile-menu-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{item.label}</span>
              <span className="mobile-menu-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}

          <div className="mobile-menu-preferences">
            <p className="mobile-menu-eyebrow">Your preferences</p>
            <div className="mobile-menu-controls">
              <div className="mobile-menu-control-row">
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label={`Switch to ${darkMode ? "light" : "dark"} theme`}
                  aria-pressed={darkMode}
                  className="icon-button mobile-theme-toggle"
                >
                  {darkMode ? <SunMedium size={16} /> : <MoonStar size={16} />}
                  <span>Theme</span>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default SiteHeader;
