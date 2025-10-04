// theme-context.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkColors, lightColors } from './colors';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme(); 
  const [theme, setTheme] = useState(systemColorScheme);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');
        if (storedTheme) {
          setTheme(storedTheme);
        } else {
          setTheme(systemColorScheme);
        }
      } catch (error) {
        console.error('Failed to load theme', error);
      } finally {
        setLoading(false);
      }
    };

    loadTheme();
  }, [systemColorScheme]);

  const toggleTheme = async () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme); 
    } catch (error) {
      console.error('Failed to save theme', error);
    }
  };

  const currentColors = theme === 'dark' ? darkColors : lightColors;

  if (loading) {
    return null; 
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, currentColors }}>
      {children}
    </ThemeContext.Provider>
  );
};
