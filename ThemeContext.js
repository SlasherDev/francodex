// theme-context.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkColors, lightColors } from './colors';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState('light'); // 'light', 'dark', 'auto'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedThemeMode = await AsyncStorage.getItem('themeMode');
        if (storedThemeMode) {
          setThemeModeState(storedThemeMode);
        } else {
          // Compatibility with previous 'theme' key if present, otherwise default to 'light'
          const legacyTheme = await AsyncStorage.getItem('theme');
          if (legacyTheme === 'dark' || legacyTheme === 'light') {
            setThemeModeState(legacyTheme);
          } else {
            setThemeModeState('light');
          }
        }
      } catch (error) {
        console.error('Failed to load theme', error);
      } finally {
        setLoading(false);
      }
    };

    loadTheme();
  }, []);

  const setThemeMode = async (mode) => {
    setThemeModeState(mode);
    try {
      await AsyncStorage.setItem('themeMode', mode);
    } catch (error) {
      console.error('Failed to save theme mode', error);
    }
  };

  const toggleTheme = async () => {
    const nextMode = themeMode === 'dark' ? 'light' : 'dark';
    await setThemeMode(nextMode);
  };

  // Resolve active theme: 'light' or 'dark'
  const resolvedTheme = themeMode === 'auto'
    ? (systemColorScheme === 'dark' ? 'dark' : 'light')
    : themeMode;

  const currentColors = resolvedTheme === 'dark' ? darkColors : lightColors;

  if (loading) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{
      theme: resolvedTheme,
      themeMode,
      setThemeMode,
      toggleTheme,
      currentColors
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
