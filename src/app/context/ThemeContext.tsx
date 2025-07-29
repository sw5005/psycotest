'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

// 테마 타입 정의
type Theme = 'light' | 'dark';

// 테마 컨텍스트 타입 정의
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// 테마 컨텍스트 생성
const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

// 테마 프로바이더 컴포넌트
export function ThemeProvider({ children }: { children: ReactNode }) {
  // 로컬 스토리지에서 테마 가져오기 (기본값: light)
  const [theme, setTheme] = useState<Theme>('light');

  // 컴포넌트 마운트 시 로컬 스토리지에서 테마 불러오기
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // 테마 변경 함수
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 테마 컨텍스트 사용 훅
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
