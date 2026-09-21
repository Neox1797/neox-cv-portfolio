import { useState, useEffect, useCallback } from 'react';

export function useTheme() {
  // mode: 'auto' | 'light' | 'dark'
  const [mode, setModeState] = useState(() => {
    try {
      const savedMode = localStorage.getItem('neox_theme_mode');
      if (savedMode === 'light' || savedMode === 'dark' || savedMode === 'auto') {
        return savedMode;
      }
    } catch {
      // Ignore localStorage errors
    }
    return 'auto';
  });

  const [currentTimeText, setCurrentTimeText] = useState('');
  const [userTimeZone, setUserTimeZone] = useState('');
  const [effectiveTheme, setEffectiveTheme] = useState('dark');

  // Calculates theme according to mode and current local time
  const computeEffectiveTheme = useCallback((currentMode) => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    setCurrentTimeText(`${hours.toString().padStart(2, '0')}:${minutes}`);

    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setUserTimeZone(tz || '');
    } catch {
      setUserTimeZone('');
    }

    if (currentMode === 'light') return 'light';
    if (currentMode === 'dark') return 'dark';

    // 'auto' mode logic: 06:00 to 17:59 is Day (light), 18:00 to 05:59 is Night (dark)
    const isDayTime = hours >= 6 && hours < 18;
    return isDayTime ? 'light' : 'dark';
  }, []);

  // Update theme & attribute on HTML root with Native View Transitions API support
  useEffect(() => {
    const calculatedTheme = computeEffectiveTheme(mode);
    setEffectiveTheme(calculatedTheme);

    const updateDOM = () => {
      document.documentElement.setAttribute('data-theme', calculatedTheme);
      document.documentElement.setAttribute('data-theme-mode', mode);
    };

    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      document.startViewTransition(updateDOM);
    } else {
      updateDOM();
    }

    // Periodically update time & theme every 30 seconds
    const interval = setInterval(() => {
      const updatedTheme = computeEffectiveTheme(mode);
      setEffectiveTheme(updatedTheme);
      if (typeof document !== 'undefined' && 'startViewTransition' in document) {
        document.startViewTransition(() => {
          document.documentElement.setAttribute('data-theme', updatedTheme);
        });
      } else {
        document.documentElement.setAttribute('data-theme', updatedTheme);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [mode, computeEffectiveTheme]);

  const setMode = (newMode) => {
    setModeState(newMode);
    try {
      localStorage.setItem('neox_theme_mode', newMode);
    } catch {
      // Ignore localStorage errors
    }
  };

  const cycleThemeMode = () => {
    if (mode === 'auto') {
      setMode('light');
    } else if (mode === 'light') {
      setMode('dark');
    } else {
      setMode('auto');
    }
  };

  return {
    mode,
    effectiveTheme,
    currentTimeText,
    userTimeZone,
    setMode,
    cycleThemeMode,
  };
}
