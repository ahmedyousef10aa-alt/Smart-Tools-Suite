import React, { useState, useEffect } from 'react';
import { ViewState, Language } from '../types';
import { getTranslation } from '../i18n';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  setView: (view: ViewState) => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, setView, lang, setLang }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const t = (key: string) => getTranslation(lang, key);

  // Reading Progress Bar Logic
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Number.isNaN(progress) ? 0 : progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dark Mode Logic
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Language & Direction Logic
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    if (lang === 'ar') {
      document.body.classList.add('font-arabic');
      document.body.classList.remove('font-sans');
    } else {
      document.body.classList.add('font-sans');
      document.body.classList.remove('font-arabic');
    }
    localStorage.setItem('lang', lang);
  }, [lang]);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const navItems = [
    { view: ViewState.HOME, label: t('nav_home') },
    { view: ViewState.ABOUT, label: t('nav_about') },
    { view: ViewState.PRIVACY, label: t('nav_privacy') },
    { view: ViewState.CONTACT, label: t('nav_contact') },
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'el', label: 'Ελληνικά', flag: '🇬🇷' },
    { code: 'pt', label: 'Português', flag: '🇵🇹' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', label: '中文 (简)', flag: '🇨🇳' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
    { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Reading Progress Bar (Fixed Top) */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-transparent">
        <div 
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo & Brand Name */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setView(ViewState.HOME)}
          >
            <div className="w-10 h-10 transition-transform duration-300 group-hover:scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-full h-full drop-shadow-sm">
                <rect width="512" height="512" rx="100" className="fill-primary"/>
                <path fill="white" d="M256 128c70.7 0 128 57.3 128 128s-57.3 128-128 128-128-57.3-128-128 57.3-128 128-128m0-40C163.2 88 88 163.2 88 256s75.2 168 168 168 168-75.2 168-168S348.8 88 256 88zM236 46h40v420h-40zM466 236v40H46v-40z"/>
              </svg>
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              SmartTools
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => setView(item.view)}
                className={`text-sm font-medium transition-colors ${
                  currentView === item.view 
                    ? 'text-primary dark:text-primary' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-3 rtl:space-x-reverse">
             {/* Language Dropdown */}
            <div className="relative">
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as Language)}
                className="appearance-none bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-1 pl-3 pr-8 rounded leading-tight focus:outline-none focus:border-primary text-sm font-medium cursor-pointer"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code}>
                     {l.flag} {l.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300 rtl:right-auto rtl:left-0">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? (
                // Sun Icon
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-yellow-400">
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                </svg>
              ) : (
                // Moon Icon
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-slate-700 dark:text-slate-200">
                  <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                </svg>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-600 dark:text-gray-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col p-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.view}
                  onClick={() => {
                    setView(item.view);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left px-4 py-2 rounded-md ${
                    currentView === item.view 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} {t('footer_rights')} - SmartTools
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;