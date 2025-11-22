import React, { useState } from 'react';
import Layout from './components/Layout';
import { ViewState, ToolMeta } from './types';
import * as Tools from './views/ToolsView';
import * as Pages from './views/PagesView';
import AdPlaceholder from './components/AdPlaceholder';

const App: React.FC = () => {
  const [currentView, setView] = useState<ViewState>(ViewState.HOME);

  const toolsList: ToolMeta[] = [
    // Existing Tools
    { id: ViewState.TOOL_PASSWORD, title: 'Password Generator', description: 'Create strong and secure passwords', icon: '🔒' },
    { id: ViewState.TOOL_COUNTER, title: 'Word Counter', description: 'Count words and characters instantly', icon: '📝' },
    { id: ViewState.TOOL_THEME_DEMO, title: 'Dark Mode', description: 'Toggle website theme', icon: '🌗' },
    { id: ViewState.TOOL_CONVERTER_UNIT, title: 'Unit Converter', description: 'Data units (KB, MB, GB)', icon: '💾' },
    { id: ViewState.TOOL_CONVERTER_BASE, title: 'Base Converter', description: 'Binary, Hex, Decimal', icon: '🔢' },
    { id: ViewState.TOOL_DISCOUNT, title: 'Discount Calculator', description: 'Calculate final price and savings', icon: '🏷️' },
    { id: ViewState.TOOL_EMAIL, title: 'Email Validator', description: 'Check email format validity', icon: '📧' },
    { id: ViewState.TOOL_PROGRESS_DEMO, title: 'Reading Progress', description: 'Scroll progress bar demo', icon: '📊' },
    { id: ViewState.TOOL_COLOR, title: 'Color Generator', description: 'Pick random colors for design', icon: '🎨' },
    { id: ViewState.TOOL_STRING, title: 'String Comparator', description: 'Compare texts and find differences', icon: '⚖️' },
    // New Tools
    { id: ViewState.TOOL_SEO, title: 'SEO Checker', description: 'Basic Title & Meta Length check', icon: '🔍' },
    { id: ViewState.TOOL_BASE64, title: 'Base64 Tool', description: 'Encode & Decode Text', icon: '🔐' },
    { id: ViewState.TOOL_RGB_HEX, title: 'RGB <> HEX', description: 'Color Format Converter', icon: '🖍️' },
    { id: ViewState.TOOL_QR_CODE, title: 'QR Generator', description: 'Create QR Codes instantly', icon: '📱' },
    { id: ViewState.TOOL_COUNTDOWN, title: 'Countdown', description: 'Track time to an event', icon: '⏳' },
    { id: ViewState.TOOL_IMG_COMPRESS, title: 'Img Compressor', description: 'Reduce image size locally', icon: '📉' },
    { id: ViewState.TOOL_BMI, title: 'BMI Calculator', description: 'Body Mass Index Check', icon: '⚖️' },
    { id: ViewState.TOOL_TEXT_CLEANER, title: 'Text Cleaner', description: 'Remove spaces and breaks', icon: '🧹' },
    { id: ViewState.TOOL_TIMEZONE, title: 'Time Zones', description: 'World Clock Converter', icon: '🌍' },
    { id: ViewState.TOOL_MARKDOWN, title: 'Markdown', description: 'Preview Markdown Syntax', icon: '👁️' },
  ];

  const renderContent = () => {
    switch (currentView) {
      case ViewState.HOME:
        return (
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Smart & <span className="text-primary">Fast</span> Web Tools
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                100% Free & Fast Web Tools that Run Directly in Your Browser (No API Needed).
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
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{tool.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{tool.description}</p>
                </div>
              ))}
            </div>
            <AdPlaceholder />
          </div>
        );

      // Pages
      case ViewState.PRIVACY: return <Pages.PrivacyPage />;
      case ViewState.ABOUT: return <Pages.AboutPage />;
      case ViewState.CONTACT: return <Pages.ContactPage />;

      // Tools
      case ViewState.TOOL_PASSWORD: return <Tools.PasswordGenerator goBack={() => setView(ViewState.HOME)} />;
      case ViewState.TOOL_COUNTER: return <Tools.WordCounter goBack={() => setView(ViewState.HOME)} />;
      case ViewState.TOOL_CONVERTER_UNIT: return <Tools.UnitConverter goBack={() => setView(ViewState.HOME)} />;
      case ViewState.TOOL_CONVERTER_BASE: return <Tools.BaseConverter goBack={() => setView(ViewState.HOME)} />;
      case ViewState.TOOL_DISCOUNT: return <Tools.DiscountCalculator goBack={() => setView(ViewState.HOME)} />;
      case ViewState.TOOL_EMAIL: return <Tools.EmailValidator goBack={() => setView(ViewState.HOME)} />;
      case ViewState.TOOL_COLOR: return <Tools.RandomColor goBack={() => setView(ViewState.HOME)} />;
      case ViewState.TOOL_STRING: return <Tools.StringComparator goBack={() => setView(ViewState.HOME)} />;
      case ViewState.TOOL_THEME_DEMO: return <Tools.ThemeDemo goBack={() => setView(ViewState.HOME)} />;
      case ViewState.TOOL_PROGRESS_DEMO: return <Tools.ReadingProgressDemo goBack={() => setView(ViewState.HOME)} />;
      
      // New Tools
      case ViewState.TOOL_SEO: return <Tools.SeoChecker goBack={() => setView(ViewState.HOME)} />;
      case ViewState.TOOL_BASE64: return <Tools.Base64Converter goBack={() => setView(ViewState.HOME)} />;
      case ViewState.TOOL_RGB_HEX: return <Tools.RgbHexConverter goBack={() => setView(ViewState.HOME)} />;
      case ViewState.TOOL_QR_CODE: return <Tools.QrCodeGenerator goBack={() => setView(ViewState.HOME)} />;
      case ViewState.TOOL_COUNTDOWN: return <Tools.CountdownTimer goBack={() => setView(ViewState.HOME)} />;
      case ViewState.TOOL_IMG_COMPRESS: return <Tools.ImageCompressor goBack={() => setView(ViewState.HOME)} />;
      case ViewState.TOOL_BMI: return <Tools.BmiCalculator goBack={() => setView(ViewState.HOME)} />;
      case ViewState.TOOL_TEXT_CLEANER: return <Tools.TextCleaner goBack={() => setView(ViewState.HOME)} />;
      case ViewState.TOOL_TIMEZONE: return <Tools.TimeZoneConverter goBack={() => setView(ViewState.HOME)} />;
      case ViewState.TOOL_MARKDOWN: return <Tools.MarkdownPreviewer goBack={() => setView(ViewState.HOME)} />;

      default: return <div>Page not found</div>;
    }
  };

  return (
    <Layout currentView={currentView} setView={setView}>
      {renderContent()}
    </Layout>
  );
};

export default App;