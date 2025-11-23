import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { ViewState, ToolMeta, Language } from './types';
import * as Tools from './views/ToolsView';
import * as Pages from './views/PagesView';
import AdPlaceholder from './components/AdPlaceholder';
import { getTranslation, supportedLanguages } from './i18n';

const App: React.FC = () => {
  const [currentView, setView] = useState<ViewState>(ViewState.HOME);
  const [lang, setLang] = useState<Language>('en');

  // Load language preference from URL or LocalStorage
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang') as Language;

    if (urlLang && supportedLanguages.includes(urlLang)) {
      setLang(urlLang);
    } else {
      const savedLang = localStorage.getItem('lang') as Language;
      if (savedLang && supportedLanguages.includes(savedLang)) {
        setLang(savedLang);
      }
    }
  }, []);

  // Update URL and Storage when language changes
  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
    
    // Update URL without reloading (Routing feel)
    const url = new URL(window.location.href);
    url.searchParams.set('lang', newLang);
    window.history.pushState({}, '', url);
  };

  const t = (key: string) => getTranslation(lang, key);

  const toolsList: ToolMeta[] = [
    // Existing Tools
    { id: ViewState.TOOL_PASSWORD, titleKey: 'tool_password', descriptionKey: 'desc_password', icon: '🔒' },
    { id: ViewState.TOOL_COUNTER, titleKey: 'tool_counter', descriptionKey: 'desc_counter', icon: '📝' },
    { id: ViewState.TOOL_BROWSER_INFO, titleKey: 'tool_browser', descriptionKey: 'desc_browser', icon: '🌐' },
    { id: ViewState.TOOL_CONVERTER_UNIT, titleKey: 'tool_unit', descriptionKey: 'desc_unit', icon: '💾' },
    { id: ViewState.TOOL_CONVERTER_BASE, titleKey: 'tool_base', descriptionKey: 'desc_base', icon: '🔢' },
    { id: ViewState.TOOL_DISCOUNT, titleKey: 'tool_discount', descriptionKey: 'desc_discount', icon: '🏷️' },
    { id: ViewState.TOOL_EMAIL, titleKey: 'tool_email', descriptionKey: 'desc_email', icon: '📧' },
    { id: ViewState.TOOL_PROGRESS_DEMO, titleKey: 'tool_progress', descriptionKey: 'desc_progress', icon: '📊' },
    { id: ViewState.TOOL_COLOR, titleKey: 'tool_color', descriptionKey: 'desc_color', icon: '🎨' },
    { id: ViewState.TOOL_STRING, titleKey: 'tool_string', descriptionKey: 'desc_string', icon: '⚖️' },
    // New Tools
    { id: ViewState.TOOL_SEO, titleKey: 'tool_seo', descriptionKey: 'desc_seo', icon: '🔍' },
    { id: ViewState.TOOL_BASE64, titleKey: 'tool_base64', descriptionKey: 'desc_base64', icon: '🔐' },
    { id: ViewState.TOOL_RGB_HEX, titleKey: 'tool_rgb', descriptionKey: 'desc_rgb', icon: '🖍️' },
    { id: ViewState.TOOL_QR_CODE, titleKey: 'tool_qr', descriptionKey: 'desc_qr', icon: '📱' },
    { id: ViewState.TOOL_COUNTDOWN, titleKey: 'tool_countdown', descriptionKey: 'desc_countdown', icon: '⏳' },
    { id: ViewState.TOOL_IMG_COMPRESS, titleKey: 'tool_compress', descriptionKey: 'desc_compress', icon: '📉' },
    { id: ViewState.TOOL_BMI, titleKey: 'tool_bmi', descriptionKey: 'desc_bmi', icon: '⚖️' },
    { id: ViewState.TOOL_TEXT_CLEANER, titleKey: 'tool_cleaner', descriptionKey: 'desc_cleaner', icon: '🧹' },
    { id: ViewState.TOOL_TIMEZONE, titleKey: 'tool_timezone', descriptionKey: 'desc_timezone', icon: '🌍' },
    { id: ViewState.TOOL_MARKDOWN, titleKey: 'tool_markdown', descriptionKey: 'desc_markdown', icon: '👁️' },
  ];

  // --- SEO & Title Management ---
  useEffect(() => {
    // 1. Update Document Title
    if (currentView === ViewState.HOME) {
      document.title = t('seo_title_global');
    } else {
      // Find current tool or page title
      const tool = toolsList.find(t => t.id === currentView);
      if (tool) {
        document.title = `${t(tool.titleKey)} - SmartTools`;
      } else {
        // Fallback for pages like About, Privacy
        const pageTitleMap: Record<string, string> = {
          [ViewState.ABOUT]: 'nav_about',
          [ViewState.PRIVACY]: 'nav_privacy',
          [ViewState.CONTACT]: 'nav_contact'
        };
        if (pageTitleMap[currentView]) {
          document.title = `${t(pageTitleMap[currentView])} - SmartTools`;
        } else {
          document.title = t('site_title');
        }
      }
    }

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    
    if (currentView === ViewState.HOME) {
      metaDesc.setAttribute('content', t('seo_desc_global'));
    } else {
      // For tools, use their description. For pages, use generic site subtitle.
      const tool = toolsList.find(t => t.id === currentView);
      if (tool) {
        metaDesc.setAttribute('content', t(tool.descriptionKey));
      } else {
        metaDesc.setAttribute('content', t('site_subtitle'));
      }
    }
  }, [lang, currentView]);

  const renderContent = () => {
    const commonProps = {
      goBack: () => setView(ViewState.HOME),
      lang: lang
    };

    switch (currentView) {
      case ViewState.HOME:
        return (
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {t('site_title')}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {t('site_subtitle')}
              </p>
              {/* Top Ad Space on Home Page */}
              <div className="max-w-3xl mx-auto mt-8">
                <AdPlaceholder />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {toolsList.map((tool) => (
                <div 
                  key={tool.id}
                  onClick={() => setView(tool.id)}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 cursor-pointer transition-transform hover:-translate-y-1 group"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200 w-12 h-12 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-full">
                    {tool.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{t(tool.titleKey)}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{t(tool.descriptionKey)}</p>
                </div>
              ))}
            </div>
            <AdPlaceholder />
          </div>
        );

      // Pages
      case ViewState.PRIVACY: return <Pages.PrivacyPage lang={lang} />;
      case ViewState.ABOUT: return <Pages.AboutPage lang={lang} />;
      case ViewState.CONTACT: return <Pages.ContactPage lang={lang} />;

      // Tools
      case ViewState.TOOL_PASSWORD: return <Tools.PasswordGenerator {...commonProps} />;
      case ViewState.TOOL_COUNTER: return <Tools.WordCounter {...commonProps} />;
      case ViewState.TOOL_CONVERTER_UNIT: return <Tools.UnitConverter {...commonProps} />;
      case ViewState.TOOL_CONVERTER_BASE: return <Tools.BaseConverter {...commonProps} />;
      case ViewState.TOOL_DISCOUNT: return <Tools.DiscountCalculator {...commonProps} />;
      case ViewState.TOOL_EMAIL: return <Tools.EmailValidator {...commonProps} />;
      case ViewState.TOOL_COLOR: return <Tools.RandomColor {...commonProps} />;
      case ViewState.TOOL_STRING: return <Tools.StringComparator {...commonProps} />;
      case ViewState.TOOL_BROWSER_INFO: return <Tools.BrowserInfo {...commonProps} />;
      case ViewState.TOOL_PROGRESS_DEMO: return <Tools.ReadingProgressDemo {...commonProps} />;
      
      // New Tools
      case ViewState.TOOL_SEO: return <Tools.SeoChecker {...commonProps} />;
      case ViewState.TOOL_BASE64: return <Tools.Base64Converter {...commonProps} />;
      case ViewState.TOOL_RGB_HEX: return <Tools.RgbHexConverter {...commonProps} />;
      case ViewState.TOOL_QR_CODE: return <Tools.QrCodeGenerator {...commonProps} />;
      case ViewState.TOOL_COUNTDOWN: return <Tools.CountdownTimer {...commonProps} />;
      case ViewState.TOOL_IMG_COMPRESS: return <Tools.ImageCompressor {...commonProps} />;
      case ViewState.TOOL_BMI: return <Tools.BmiCalculator {...commonProps} />;
      case ViewState.TOOL_TEXT_CLEANER: return <Tools.TextCleaner {...commonProps} />;
      case ViewState.TOOL_TIMEZONE: return <Tools.TimeZoneConverter {...commonProps} />;
      case ViewState.TOOL_MARKDOWN: return <Tools.MarkdownPreviewer {...commonProps} />;

      default: return <div>Page not found</div>;
    }
  };

  return (
    <Layout currentView={currentView} setView={setView} lang={lang} setLang={handleSetLang}>
      {renderContent()}
    </Layout>
  );
};

export default App;