"use client";

import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

export class ThemeManager {
  private static STORAGE_KEY = 'portfolio-theme-preference';

  static getTheme(): Theme {
    // Early return for server-side rendering
    if (typeof window === 'undefined') return 'dark';

    const savedTheme = localStorage.getItem(this.STORAGE_KEY) as Theme | null;

    if (savedTheme) {
      return savedTheme;
    }

    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDarkMode ? 'dark' : 'light';
  }

  static setTheme(theme: Theme): void {
    // Early return for server-side rendering
    if (typeof window === 'undefined') return;
    
    localStorage.setItem(this.STORAGE_KEY, theme);
    
    const root = document.documentElement;
    
    root.classList.toggle('dark', theme === 'dark');
    root.classList.toggle('light', theme === 'light');
    root.setAttribute('data-theme', theme);
    root.style.colorScheme = theme;

    // Dispatch custom event for theme change
    window.dispatchEvent(new CustomEvent('theme-change', { detail: { theme } }));
  }

  static toggleTheme(): Theme {
    const currentTheme = this.getTheme();
    const newTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
    return newTheme;
  }

  static initTheme(): (() => void) | void {
    // Early return for server-side rendering
    if (typeof window === 'undefined') return;
    
    const theme = this.getTheme();
    this.setTheme(theme);
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleThemeChange = (e: MediaQueryListEvent) => {
      // Only change theme automatically if no user preference is saved
      if (!localStorage.getItem(this.STORAGE_KEY)) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleThemeChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
    };
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Initialize theme from localStorage or system preference
    return typeof window !== 'undefined' ? ThemeManager.getTheme() : 'dark';
  });

  useEffect(() => {
    // Initialize theme and set up media query listener
    const cleanup = ThemeManager.initTheme();

    // Listen for theme changes from other parts of the application
    const handleThemeChange = (e: CustomEvent<{ theme: Theme }>) => {
      setTheme(e.detail.theme);
    };
    
    window.addEventListener('theme-change', handleThemeChange as EventListener);
    
    // Cleanup both media query listener and theme change listener
    return () => {
      if (cleanup instanceof Function) {
        cleanup();
      }
      window.removeEventListener('theme-change', handleThemeChange as EventListener);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = ThemeManager.toggleTheme();
    setTheme(newTheme);
  }, []);

  return { theme, toggleTheme };
}