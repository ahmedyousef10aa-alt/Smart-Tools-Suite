
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ViewState } from '../types';
import AdPlaceholder from '../components/AdPlaceholder';
import { getTranslation } from '../i18n';
import { Language } from '../types';
import { timeZones } from '../data/timezones';

// --- Helpers ---
const downloadContent = (filename: string, content: string) => {
  const element = document.createElement('a');
  const file = new Blob([content], {type: 'text/plain'});
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

const downloadImage = (filename: string, dataUrl: string) => {
  const element = document.createElement('a');
  element.href = dataUrl;
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

interface ToolWrapperProps {
  title: string;
  children: React.ReactNode;
  goBack: () => void;
  onDownload?: () => void;
  lang: Language;
}

const ToolWrapper: React.FC<ToolWrapperProps> = ({ title, children, goBack, onDownload, lang }) => {
  const t = (key: string) => getTranslation(lang, key);
  const isRtl = lang === 'ar';

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <button 
        onClick={goBack}
        className="mb-6 flex items-center text-gray-500 hover:text-primary transition-colors"
      >
        {isRtl ? (
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform rotate-180" viewBox="0 0 20 20" fill="currentColor">
             <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
           </svg>
        ) : (
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
             <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
           </svg>
        )}
        {t('back_to_tools')}
      </button>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
        <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200 dark:border-gray-700 flex-wrap gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            {title}
          </h2>
        </div>

        {/* Top Ad Unit inside Tool Wrapper */}
        <div className="mb-6">
            <AdPlaceholder />
        </div>

        <div className="mb-6">
          {children}
        </div>

        {/* Bottom Download Button Section */}
        {onDownload && (
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
            <button 
              onClick={onDownload}
              className="flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors text-base font-medium shadow-sm w-full md:w-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              {t('download_result')}
            </button>
          </div>
        )}
      </div>
      
      {/* Bottom Ad Unit outside Tool Wrapper */}
      <div className="mt-6">
        <AdPlaceholder />
      </div>
    </div>
  );
};

// Helper component for the "Blog Post" section
const ToolInfo: React.FC<{ title: string, desc: string, steps: string[], lang: Language }> = ({ title, desc, steps, lang }) => (
  <div className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-8">
    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
      {desc}
    </p>
    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
       {lang === 'ar' ? 'كيفية الاستخدام:' : 'How to use:'}
    </h4>
    <ol className="list-decimal list-inside space-y-1 text-gray-600 dark:text-gray-400 ml-1 rtl:ml-0 rtl:mr-1">
      {steps.map((s, i) => <li key={i}>{s}</li>)}
    </ol>
  </div>
);

interface ToolProps {
  goBack: () => void;
  lang: Language;
}

// --- 1. Password Generator ---
export const PasswordGenerator: React.FC<ToolProps> = ({ goBack, lang }) => {
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const t = (key: string) => getTranslation(lang, key);

  const generate = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const syms = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let validChars = chars;
    if (includeNumbers) validChars += nums;
    if (includeSymbols) validChars += syms;

    let generated = '';
    for (let i = 0; i < length; i++) {
      generated += validChars.charAt(Math.floor(Math.random() * validChars.length));
    }
    setPassword(generated);
  };

  return (
    <ToolWrapper 
      title={t('tool_password')} 
      goBack={goBack}
      lang={lang}
      onDownload={() => password && downloadContent('password.txt', password)}
    >
      <ToolInfo 
        title={t('tool_password')}
        desc={t('info_desc_password')}
        steps={t('info_steps_password').split('|')}
        lang={lang}
      />
      <div className="space-y-6">
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
          <input 
            type="text" 
            readOnly 
            value={password} 
            placeholder={lang === 'ar' ? 'انقر للتوليد...' : 'Click generate...'}
            className="bg-transparent text-2xl font-mono text-center w-full outline-none text-gray-800 dark:text-white"
          />
        </div>
        
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Length: {length}</label>
            <input 
              type="range" 
              min="4" 
              max="32" 
              value={length} 
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>
          
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={includeNumbers} 
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
              />
              <span className="text-gray-700 dark:text-gray-300">0-9</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={includeSymbols} 
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
              />
              <span className="text-gray-700 dark:text-gray-300">!@#</span>
            </label>
          </div>
        </div>

        <button 
          onClick={generate}
          className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          {t('generate')}
        </button>
      </div>
    </ToolWrapper>
  );
};

// --- 2. Word & Char Counter ---
export const WordCounter: React.FC<ToolProps> = ({ goBack, lang }) => {
  const [text, setText] = useState('');
  const t = (key: string) => getTranslation(lang, key);
  
  const stats = useMemo(() => {
    const chars = text.length;
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    return { chars, words };
  }, [text]);

  return (
    <ToolWrapper 
      title={t('tool_counter')}
      goBack={goBack}
      lang={lang}
      onDownload={() => downloadContent('word-count-report.txt', `Report\nWords: ${stats.words}\nCharacters: ${stats.chars}\n\n${text}`)}
    >
      <ToolInfo 
        title={t('tool_counter')}
        desc={t('info_desc_counter')}
        steps={t('info_steps_counter').split('|')}
        lang={lang}
      />
      <div className="space-y-4">
        <textarea
          className="w-full h-48 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          placeholder="..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.words}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{lang === 'ar' ? 'كلمات' : 'Words'}</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.chars}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{lang === 'ar' ? 'أحرف' : 'Chars'}</div>
          </div>
        </div>
      </div>
    </ToolWrapper>
  );
};

// --- 3. Unit Converter ---
export const UnitConverter: React.FC<ToolProps> = ({ goBack, lang }) => {
  const [val, setVal] = useState<string>('');
  const [from, setFrom] = useState('MB');
  const [to, setTo] = useState('KB');
  const [result, setResult] = useState<string>('---');
  const t = (key: string) => getTranslation(lang, key);

  const units: Record<string, number> = {
    'B': 1,
    'KB': 1024,
    'MB': 1024 * 1024,
    'GB': 1024 * 1024 * 1024,
    'TB': 1024 * 1024 * 1024 * 1024,
  };

  useEffect(() => {
    const v = parseFloat(val);
    if (isNaN(v)) {
      setResult('---');
      return;
    }
    const bytes = v * units[from];
    const converted = bytes / units[to];
    setResult(converted.toLocaleString('en-US', { maximumFractionDigits: 6 }));
  }, [val, from, to]);

  return (
    <ToolWrapper 
      title={t('tool_unit')}
      goBack={goBack}
      lang={lang}
      onDownload={() => downloadContent('conversion.txt', `${val} ${from} = ${result} ${to}`)}
    >
      <ToolInfo 
        title={t('tool_unit')}
        desc={t('info_desc_unit')}
        steps={t('info_steps_unit').split('|')}
        lang={lang}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">{lang === 'ar' ? 'القيمة' : 'Value'}</label>
          <input 
            type="number" 
            value={val} 
            onChange={(e) => setVal(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">{lang === 'ar' ? 'من' : 'From'}</label>
          <select 
            value={from} 
            onChange={(e) => setFrom(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {Object.keys(units).map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">{lang === 'ar' ? 'إلى' : 'To'}</label>
          <select 
            value={to} 
            onChange={(e) => setTo(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
             {Object.keys(units).map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
      </div>
      <div className="mt-8 text-center p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <span className="text-gray-500 dark:text-gray-400">{lang === 'ar' ? 'النتيجة' : 'Result'}:</span>
        <div className="text-3xl font-bold text-primary mt-2 break-all">
          {result} {to}
        </div>
      </div>
    </ToolWrapper>
  );
};

// --- 4. Base Converter ---
export const BaseConverter: React.FC<ToolProps> = ({ goBack, lang }) => {
  const [number, setNumber] = useState('');
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(2);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const t = (key: string) => getTranslation(lang, key);

  useEffect(() => {
    if (!number) {
      setResult('');
      setError('');
      return;
    }
    try {
      const val = parseInt(number, fromBase);
      if (isNaN(val)) {
        setError('Invalid');
        setResult('');
      } else {
        setResult(val.toString(toBase).toUpperCase());
        setError('');
      }
    } catch (e) {
      setError('Error');
    }
  }, [number, fromBase, toBase]);

  return (
    <ToolWrapper 
      title={t('tool_base')}
      goBack={goBack}
      lang={lang}
      onDownload={() => downloadContent('base-conversion.txt', `${number} (${fromBase}) = ${result} (${toBase})`)}
    >
      <ToolInfo 
        title={t('tool_base')}
        desc={t('info_desc_base')}
        steps={t('info_steps_base').split('|')}
        lang={lang}
      />
      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">{lang === 'ar' ? 'الرقم' : 'Number'}</label>
          <input 
            type="text" 
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
             <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">{lang === 'ar' ? 'من قاعدة' : 'From Base'}</label>
             <select 
               value={fromBase} 
               onChange={(e) => setFromBase(Number(e.target.value))}
               className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
             >
               <option value={2}>2 (Binary)</option>
               <option value={8}>8 (Octal)</option>
               <option value={10}>10 (Decimal)</option>
               <option value={16}>16 (Hex)</option>
             </select>
          </div>
          <div>
             <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">{lang === 'ar' ? 'إلى قاعدة' : 'To Base'}</label>
             <select 
               value={toBase} 
               onChange={(e) => setToBase(Number(e.target.value))}
               className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
             >
               <option value={2}>2 (Binary)</option>
               <option value={8}>8 (Octal)</option>
               <option value={10}>10 (Decimal)</option>
               <option value={16}>16 (Hex)</option>
             </select>
          </div>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
          <span className="text-gray-500">{lang === 'ar' ? 'النتيجة' : 'Result'}:</span>
          <div className="text-2xl font-mono font-bold mt-1 break-all">{result || '---'}</div>
        </div>
      </div>
    </ToolWrapper>
  );
};

// --- 5. Discount Calculator ---
export const DiscountCalculator: React.FC<ToolProps> = ({ goBack, lang }) => {
  const [price, setPrice] = useState<string>('');
  const [discount, setDiscount] = useState<string>('');
  const t = (key: string) => getTranslation(lang, key);

  const p = parseFloat(price) || 0;
  const d = parseFloat(discount) || 0;
  const saving = p * (d / 100);
  const final = p - saving;

  return (
    <ToolWrapper 
      title={t('tool_discount')}
      goBack={goBack}
      lang={lang}
      onDownload={() => downloadContent('discount.txt', `Price: ${p}\nDiscount: ${d}%\nFinal: ${final.toFixed(2)}`)}
    >
      <ToolInfo 
        title={t('tool_discount')}
        desc={t('info_desc_discount')}
        steps={t('info_steps_discount').split('|')}
        lang={lang}
      />
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">{lang === 'ar' ? 'السعر الأصلي' : 'Original Price'}</label>
          <input 
            type="number" 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">{lang === 'ar' ? 'الخصم (%)' : 'Discount (%)'}</label>
          <input 
            type="number" 
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
          <div className="text-sm text-green-700 dark:text-green-400">{lang === 'ar' ? 'السعر النهائي' : 'Final Price'}</div>
          <div className="text-2xl font-bold text-green-700 dark:text-green-400">{final.toFixed(2)}</div>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-center">
          <div className="text-sm text-red-700 dark:text-red-400">{lang === 'ar' ? 'أنت توفر' : 'You Save'}</div>
          <div className="text-2xl font-bold text-red-700 dark:text-red-400">{saving.toFixed(2)}</div>
        </div>
      </div>
    </ToolWrapper>
  );
};

// --- 6. Email Validator ---
export const EmailValidator: React.FC<ToolProps> = ({ goBack, lang }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const t = (key: string) => getTranslation(lang, key);

  useEffect(() => {
    if (!email) {
      setStatus('idle');
      return;
    }
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setStatus(re.test(email) ? 'valid' : 'invalid');
  }, [email]);

  return (
    <ToolWrapper 
      title={t('tool_email')}
      goBack={goBack}
      lang={lang}
      onDownload={() => downloadContent('email-check.txt', `Email: ${email}\nResult: ${status}`)}
    >
      <ToolInfo 
        title={t('tool_email')}
        desc={t('info_desc_email')}
        steps={t('info_steps_email').split('|')}
        lang={lang}
      />
      <div className="space-y-4">
        <input
          type="email"
          placeholder="example@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full p-4 border-2 rounded-lg text-lg outline-none transition-colors dark:bg-gray-700 dark:text-white
            ${status === 'valid' ? 'border-green-500 focus:border-green-600' : 
              status === 'invalid' ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-primary'}`}
        />
        {status !== 'idle' && (
          <div className={`flex items-center gap-2 ${status === 'valid' ? 'text-green-600' : 'text-red-600'}`}>
            <span className="font-bold">{status === 'valid' ? '✔ Valid' : '✘ Invalid'}</span>
          </div>
        )}
      </div>
    </ToolWrapper>
  );
};

// --- 7. Browser Info Display (REVISED) ---
export const BrowserInfo: React.FC<ToolProps> = ({ goBack, lang }) => {
  const t = (key: string) => getTranslation(lang, key);
  const [ip, setIp] = useState<string>('Loading...');
  const [info, setInfo] = useState({
    os: '---',
    browser: '---',
    screen: '---',
    lang: '---',
    timezone: '---'
  });

  useEffect(() => {
    // Basic User Agent Parsing
    const ua = navigator.userAgent;
    let os = "Unknown OS";
    if (ua.indexOf("Win") !== -1) os = "Windows";
    if (ua.indexOf("Mac") !== -1) os = "MacOS";
    if (ua.indexOf("Linux") !== -1) os = "Linux";
    if (ua.indexOf("Android") !== -1) os = "Android";
    if (ua.indexOf("like Mac") !== -1) os = "iOS";

    let browser = "Unknown Browser";
    if (ua.indexOf("Chrome") !== -1) browser = "Chrome";
    else if (ua.indexOf("Firefox") !== -1) browser = "Firefox";
    else if (ua.indexOf("Safari") !== -1) browser = "Safari";
    else if (ua.indexOf("Edge") !== -1) browser = "Edge";

    // Browser Language
    const browserLang = navigator.language || 'Unknown';

    // Time Zone Calculation
    const offsetMin = new Date().getTimezoneOffset();
    const sign = offsetMin > 0 ? '-' : '+';
    const abs = Math.abs(offsetMin);
    const h = String(Math.floor(abs / 60)).padStart(2, '0');
    const m = String(abs % 60).padStart(2, '0');
    const tzName = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const tz = `GMT${sign}${h}:${m} (${tzName})`;

    setInfo({
      os,
      browser,
      screen: `${window.screen.width} x ${window.screen.height}`,
      lang: browserLang,
      timezone: tz
    });

    // Fetch IP from a lightweight JSON API
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setIp(data.ip))
      .catch(() => setIp('Error fetching IP'));
  }, []);

  const infoString = `OS: ${info.os}\nBrowser: ${info.browser}\nScreen: ${info.screen}\nLanguage: ${info.lang}\nTimeZone: ${info.timezone}\nIP: ${ip}`;

  return (
    <ToolWrapper 
      title={t('tool_browser')}
      goBack={goBack}
      lang={lang}
      onDownload={() => downloadContent('system-info.txt', infoString)}
    >
      <ToolInfo 
        title={t('tool_browser')}
        desc={t('info_desc_browser')}
        steps={t('info_steps_browser').split('|')}
        lang={lang}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-600">
          <div className="text-sm text-gray-500 dark:text-gray-400">Operating System</div>
          <div className="text-lg font-bold text-gray-800 dark:text-white">{info.os}</div>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-600">
          <div className="text-sm text-gray-500 dark:text-gray-400">Browser</div>
          <div className="text-lg font-bold text-gray-800 dark:text-white">{info.browser}</div>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-600">
          <div className="text-sm text-gray-500 dark:text-gray-400">Screen Resolution</div>
          <div className="text-lg font-bold text-gray-800 dark:text-white">{info.screen}</div>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-600">
          <div className="text-sm text-gray-500 dark:text-gray-400">Public IP Address</div>
          <div className="text-lg font-bold text-primary">{ip}</div>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-600">
          <div className="text-sm text-gray-500 dark:text-gray-400">{t('label_browser_lang')}</div>
          <div className="text-lg font-bold text-gray-800 dark:text-white">{info.lang}</div>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-600">
          <div className="text-sm text-gray-500 dark:text-gray-400">{t('label_timezone')}</div>
          <div className="text-lg font-bold text-gray-800 dark:text-white">{info.timezone}</div>
        </div>
      </div>
    </ToolWrapper>
  );
};

// --- 8. Random Color ---
export const RandomColor: React.FC<ToolProps> = ({ goBack, lang }) => {
  const [color, setColor] = useState('#3B82F6');
  const t = (key: string) => getTranslation(lang, key);

  const generateColor = () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setColor(randomColor.toUpperCase());
  };

  return (
    <ToolWrapper 
      title={t('tool_color')}
      goBack={goBack}
      lang={lang}
      onDownload={() => downloadContent('color.txt', color)}
    >
      <ToolInfo 
        title={t('tool_color')}
        desc={t('info_desc_color')}
        steps={t('info_steps_color').split('|')}
        lang={lang}
      />
      <div className="flex flex-col items-center space-y-6">
        <div 
          className="w-full h-48 rounded-xl shadow-inner transition-colors duration-300 flex items-center justify-center"
          style={{ backgroundColor: color }}
        >
          <span className="bg-white/90 px-4 py-2 rounded font-mono text-xl font-bold shadow text-gray-800">
            {color}
          </span>
        </div>
        <button 
          onClick={generateColor}
          className="bg-gray-800 dark:bg-white dark:text-gray-900 text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
        >
          {t('generate')}
        </button>
      </div>
    </ToolWrapper>
  );
};

// --- 9. Reading Progress Demo ---
export const ReadingProgressDemo: React.FC<ToolProps> = ({ goBack, lang }) => {
  const t = (key: string) => getTranslation(lang, key);
  return (
    <ToolWrapper 
      title={t('tool_progress')}
      goBack={goBack}
      lang={lang}
    >
      <ToolInfo 
        title={t('tool_progress')}
        desc={t('info_desc_progress')}
        steps={t('info_steps_progress').split('|')}
        lang={lang}
      />
      <div className="space-y-6">
         <div className="space-y-4 text-gray-600 dark:text-gray-400">
           {[...Array(10)].map((_, i) => (
             <p key={i}>
               {lang === 'ar' ? 'هذا نص تجريبي لإظهار شريط التقدم.' : 'Sample text to demonstrate scroll progress.'}
             </p>
           ))}
         </div>
      </div>
    </ToolWrapper>
  );
};

// --- 10. String Comparator ---
export const StringComparator: React.FC<ToolProps> = ({ goBack, lang }) => {
  const [strA, setStrA] = useState('');
  const [strB, setStrB] = useState('');
  const t = (key: string) => getTranslation(lang, key);
  
  const isMatch = strA === strB;
  const lengthDiff = Math.abs(strA.length - strB.length);

  return (
    <ToolWrapper 
      title={t('tool_string')}
      goBack={goBack}
      lang={lang}
      onDownload={() => downloadContent('comparison.txt', `Match: ${isMatch}`)}
    >
      <ToolInfo 
        title={t('tool_string')}
        desc={t('info_desc_string')}
        steps={t('info_steps_string').split('|')}
        lang={lang}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <textarea
          placeholder="Text 1..."
          value={strA}
          onChange={(e) => setStrA(e.target.value)}
          className="h-32 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <textarea
          placeholder="Text 2..."
          value={strB}
          onChange={(e) => setStrB(e.target.value)}
          className="h-32 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div className={`p-4 rounded-lg text-center ${isMatch ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        {isMatch ? (
          <div className="font-bold">Match ✅</div>
        ) : (
          <div>
            <div className="font-bold mb-1">Different ❌</div>
            <div className="text-sm">Diff: {lengthDiff} chars</div>
          </div>
        )}
      </div>
    </ToolWrapper>
  );
};

// --- 11. Basic SEO Checker ---
export const SeoChecker: React.FC<ToolProps> = ({ goBack, lang }) => {
  const [title, setTitle] = useState(document.title);
  const [desc, setDesc] = useState('');
  const t = (key: string) => getTranslation(lang, key);

  useEffect(() => {
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) setDesc(metaDesc.getAttribute('content') || '');
  }, []);

  const titleColor = title.length >= 50 && title.length <= 60 ? 'text-green-600' : 'text-orange-500';
  const descColor = desc.length >= 150 && desc.length <= 160 ? 'text-green-600' : 'text-orange-500';

  return (
    <ToolWrapper 
      title={t('tool_seo')}
      goBack={goBack}
      lang={lang}
      onDownload={() => downloadContent('seo.txt', `Title: ${title.length}\nDesc: ${desc.length}`)}
    >
      <ToolInfo 
        title={t('tool_seo')}
        desc={t('info_desc_seo')}
        steps={t('info_steps_seo').split('|')}
        lang={lang}
      />
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">Page Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <div className="flex justify-between mt-1 text-sm">
            <span className={titleColor}>{title.length} Chars</span>
            <span className="text-gray-500">Target: 50-60</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">Meta Description</label>
          <textarea
            rows={4}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <div className="flex justify-between mt-1 text-sm">
            <span className={descColor}>{desc.length} Chars</span>
            <span className="text-gray-500">Target: 150-160</span>
          </div>
        </div>
      </div>
    </ToolWrapper>
  );
};

// --- 12. Base64 Encoder/Decoder ---
export const Base64Converter: React.FC<ToolProps> = ({ goBack, lang }) => {
  const [text, setText] = useState('');
  const [base64, setBase64] = useState('');
  const t = (key: string) => getTranslation(lang, key);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setText(val);
    try {
      setBase64(btoa(unescape(encodeURIComponent(val))));
    } catch {
      setBase64('Error');
    }
  };

  const handleBase64Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setBase64(val);
    try {
      setText(decodeURIComponent(escape(window.atob(val))));
    } catch {
      setText('Error');
    }
  };

  return (
    <ToolWrapper 
      title={t('tool_base64')}
      goBack={goBack}
      lang={lang}
      onDownload={() => downloadContent('base64.txt', base64)}
    >
      <ToolInfo 
        title={t('tool_base64')}
        desc={t('info_desc_base64')}
        steps={t('info_steps_base64').split('|')}
        lang={lang}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">Text</label>
          <textarea
            className="w-full h-48 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-sm"
            value={text}
            onChange={handleTextChange}
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">Base64</label>
          <textarea
            className="w-full h-48 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-sm"
            value={base64}
            onChange={handleBase64Change}
          />
        </div>
      </div>
    </ToolWrapper>
  );
};

// --- 13. RGB/HEX Color Converter ---
export const RgbHexConverter: React.FC<ToolProps> = ({ goBack, lang }) => {
  const [r, setR] = useState(59);
  const [g, setG] = useState(130);
  const [b, setB] = useState(246);
  const [hex, setHex] = useState('#3B82F6');
  const t = (key: string) => getTranslation(lang, key);

  const componentToHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  useEffect(() => {
    setHex(rgbToHex(r, g, b).toUpperCase());
  }, [r, g, b]);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setHex(val);
    const rgb = hexToRgb(val);
    if (rgb) {
      setR(rgb.r);
      setG(rgb.g);
      setB(rgb.b);
    }
  };

  return (
    <ToolWrapper 
      title={t('tool_rgb')}
      goBack={goBack}
      lang={lang}
      onDownload={() => downloadContent('color.txt', hex)}
    >
      <ToolInfo 
        title={t('tool_rgb')}
        desc={t('info_desc_rgb')}
        steps={t('info_steps_rgb').split('|')}
        lang={lang}
      />
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
        <div className="w-32 h-32 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600" style={{backgroundColor: hex}}></div>
        <div className="space-y-4 w-full max-w-md">
          <div className="grid grid-cols-3 gap-4">
             <input type="number" min="0" max="255" value={r} onChange={e => setR(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
             <input type="number" min="0" max="255" value={g} onChange={e => setG(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
             <input type="number" min="0" max="255" value={b} onChange={e => setB(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
          </div>
          <input 
            type="text" 
            value={hex} 
            onChange={handleHexChange} 
            className="w-full p-2 border rounded font-mono uppercase dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>
    </ToolWrapper>
  );
};

// --- 14. Basic QR Code Generator ---
export const QrCodeGenerator: React.FC<ToolProps> = ({ goBack, lang }) => {
  const [text, setText] = useState('https://google.com');
  const qrRef = useRef<HTMLDivElement>(null);
  const [libLoaded, setLibLoaded] = useState(false);
  const t = (key: string) => getTranslation(lang, key);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
    script.onload = () => setLibLoaded(true);
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  useEffect(() => {
    // @ts-ignore
    if (libLoaded && qrRef.current && text) {
      qrRef.current.innerHTML = '';
      try {
        // @ts-ignore
        new QRCode(qrRef.current, {
          text: text,
          width: 128,
          height: 128,
        });
      } catch (e) { console.error(e); }
    }
  }, [libLoaded, text]);

  const handleDownload = () => {
    const img = qrRef.current?.querySelector('img');
    if (img && img.src) {
      downloadImage('qrcode.png', img.src);
    }
  };

  return (
    <ToolWrapper 
      title={t('tool_qr')}
      goBack={goBack}
      lang={lang}
      onDownload={handleDownload}
    >
      <ToolInfo 
        title={t('tool_qr')}
        desc={t('info_desc_qr')}
        steps={t('info_steps_qr').split('|')}
        lang={lang}
      />
      <div className="flex flex-col items-center space-y-6">
        <input 
          type="text" 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="URL..."
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex justify-center min-h-[160px] min-w-[160px] items-center">
          {libLoaded ? <div ref={qrRef}></div> : <span className="text-gray-400">Loading...</span>}
        </div>
      </div>
    </ToolWrapper>
  );
};

// --- 15. Countdown Timer ---
export const CountdownTimer: React.FC<ToolProps> = ({ goBack, lang }) => {
  const [target, setTarget] = useState('');
  const [timeLeft, setTimeLeft] = useState<{d: number, h: number, m: number, s: number} | null>(null);
  const t = (key: string) => getTranslation(lang, key);

  useEffect(() => {
    if (!target) return;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const dest = new Date(target).getTime();
      const diff = dest - now;

      if (diff < 0) {
        setTimeLeft(null);
      } else {
        setTimeLeft({
          d: Math.floor(diff / (1000 * 60 * 60 * 24)),
          h: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          m: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          s: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [target]);

  return (
    <ToolWrapper 
      title={t('tool_countdown')}
      goBack={goBack}
      lang={lang}
      onDownload={() => downloadContent('timer.txt', target)}
    >
      <ToolInfo 
        title={t('tool_countdown')}
        desc={t('info_desc_countdown')}
        steps={t('info_steps_countdown').split('|')}
        lang={lang}
      />
      <div className="space-y-6 text-center">
        <div>
           <input 
             type="datetime-local" 
             value={target}
             onChange={(e) => setTarget(e.target.value)}
             className="p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
           />
        </div>
        
        <div className="grid grid-cols-4 gap-2 md:gap-4">
           {['D', 'H', 'M', 'S'].map((label, i) => {
             const keys = ['d','h','m','s'] as const;
             const val = timeLeft ? timeLeft[keys[i]] : 0;
             return (
               <div key={label} className="bg-primary/10 p-4 rounded-lg">
                 <div className="text-3xl font-bold text-primary">{val}</div>
                 <div className="text-xs text-gray-600 dark:text-gray-400 uppercase">{label}</div>
               </div>
             )
           })}
        </div>
      </div>
    </ToolWrapper>
  );
};

// --- 16. Basic Image Compressor ---
export const ImageCompressor: React.FC<ToolProps> = ({ goBack, lang }) => {
  const [quality, setQuality] = useState(0.7);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [preview, setPreview] = useState('');
  const t = (key: string) => getTranslation(lang, key);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setOriginalSize(file.size);
    
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.src = ev.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        setPreview(dataUrl);
        
        const head = 'data:image/jpeg;base64,';
        const size = Math.round((dataUrl.length - head.length) * 3 / 4);
        setCompressedSize(size);
      }
    }
    reader.readAsDataURL(file);
  };

  return (
    <ToolWrapper 
      title={t('tool_compress')}
      goBack={goBack}
      lang={lang}
      onDownload={preview ? () => downloadImage('compressed.jpg', preview) : undefined}
    >
      <ToolInfo 
        title={t('tool_compress')}
        desc={t('info_desc_compress')}
        steps={t('info_steps_compress').split('|')}
        lang={lang}
      />
      <div className="space-y-6">
        <input type="file" accept="image/*" onChange={handleFile} className="block w-full text-sm text-gray-500 dark:text-gray-300"/>
        
        {preview && (
          <>
            <div>
               <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">Quality: {Math.round(quality*100)}%</label>
               <input type="range" min="0.1" max="1" step="0.1" value={quality} onChange={e => setQuality(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm text-center">
              <div>Orig: {(originalSize/1024).toFixed(2)} KB</div>
              <div className="text-green-600 font-bold">New: {(compressedSize/1024).toFixed(2)} KB</div>
            </div>

            <div className="border rounded p-2 overflow-hidden">
              <img src={preview} alt="Preview" className="max-h-64 mx-auto" />
            </div>
          </>
        )}
      </div>
    </ToolWrapper>
  );
};

// --- 17. BMI Calculator ---
export const BmiCalculator: React.FC<ToolProps> = ({ goBack, lang }) => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const t = (key: string) => getTranslation(lang, key);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w && h) {
      setBmi(parseFloat((w / (h * h)).toFixed(1)));
    }
  };

  return (
    <ToolWrapper 
      title={t('tool_bmi')}
      goBack={goBack}
      lang={lang}
      onDownload={() => downloadContent('bmi.txt', `BMI: ${bmi}`)}
    >
      <ToolInfo 
        title={t('tool_bmi')}
        desc={t('info_desc_bmi')}
        steps={t('info_steps_bmi').split('|')}
        lang={lang}
      />
      <div className="space-y-6 max-w-sm mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-1 dark:text-white">cm</label>
            <input type="number" value={height} onChange={e => setHeight(e.target.value)} className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"/>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1 dark:text-white">kg</label>
            <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"/>
          </div>
        </div>
        
        <button onClick={calculate} className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-600">
          {t('calculate')}
        </button>
        
        {bmi && (
          <div className="text-center p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
             <div className="text-4xl font-bold text-gray-800 dark:text-white my-2">{bmi}</div>
          </div>
        )}
      </div>
    </ToolWrapper>
  );
};

// --- 18. Text Cleaner ---
export const TextCleaner: React.FC<ToolProps> = ({ goBack, lang }) => {
  const [text, setText] = useState('');
  const t = (key: string) => getTranslation(lang, key);

  const cleanSpaces = () => setText(text.replace(/\s+/g, ' ').trim());
  const cleanLines = () => setText(text.replace(/^\s*[\r\n]/gm, ''));

  return (
    <ToolWrapper 
      title={t('tool_cleaner')}
      goBack={goBack}
      lang={lang}
      onDownload={() => downloadContent('clean.txt', text)}
    >
      <ToolInfo 
        title={t('tool_cleaner')}
        desc={t('info_desc_cleaner')}
        steps={t('info_steps_cleaner').split('|')}
        lang={lang}
      />
      <div className="space-y-4">
        <textarea 
          value={text}
          onChange={e => setText(e.target.value)}
          className="w-full h-48 p-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        ></textarea>
        <div className="flex gap-4">
          <button onClick={cleanSpaces} className="flex-1 bg-gray-200 dark:bg-gray-600 py-2 rounded">Spaces</button>
          <button onClick={cleanLines} className="flex-1 bg-gray-200 dark:bg-gray-600 py-2 rounded">Lines</button>
        </div>
      </div>
    </ToolWrapper>
  );
};

// --- 19. Time Zone Converter ---
export const TimeZoneConverter: React.FC<ToolProps> = ({ goBack, lang }) => {
  const [date, setDate] = useState(new Date());
  const [selectedZones, setSelectedZones] = useState<string[]>(['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo']);
  const [zoneToAdd, setZoneToAdd] = useState(timeZones[0].zone);
  const t = (key: string) => getTranslation(lang, key);

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const addZone = () => {
    if (!selectedZones.includes(zoneToAdd)) {
      setSelectedZones([...selectedZones, zoneToAdd]);
    }
  };

  const removeZone = (zone: string) => {
    setSelectedZones(selectedZones.filter(z => z !== zone));
  };

  const getCityName = (zone: string) => {
    const found = timeZones.find(tz => tz.zone === zone);
    if (found) return found.city;
    return zone.split('/').pop()?.replace('_', ' ') || zone;
  };

  return (
    <ToolWrapper 
      title={t('tool_timezone')}
      goBack={goBack}
      lang={lang}
      onDownload={() => downloadContent('time.txt', selectedZones.map(z => `${z}: ${date.toLocaleTimeString('en-US', { timeZone: z })}`).join('\n'))}
    >
      <ToolInfo 
        title={t('tool_timezone')}
        desc={t('info_desc_timezone')}
        steps={t('info_steps_timezone').split('|')}
        lang={lang}
      />
      
      {/* Add Zone Controls */}
      <div className="flex gap-2 mb-6">
        <select 
          value={zoneToAdd} 
          onChange={(e) => setZoneToAdd(e.target.value)}
          className="flex-grow p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          {timeZones.map((tz) => (
            <option key={tz.zone} value={tz.zone}>
              {tz.city}
            </option>
          ))}
        </select>
        <button 
          onClick={addZone}
          className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold"
        >
          +
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {selectedZones.map((zone) => (
          <div key={zone} className="relative bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-100 dark:border-gray-600 group">
            <button 
              onClick={() => removeZone(zone)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ×
            </button>
            <div className="text-sm text-gray-500 dark:text-gray-400">{getCityName(zone)}</div>
            <div className="text-xl font-mono font-bold text-gray-800 dark:text-white mt-1">
              {date.toLocaleTimeString('en-US', { timeZone: zone })}
            </div>
             <div className="text-xs text-gray-400 mt-1">{date.toLocaleDateString('en-US', { timeZone: zone })}</div>
          </div>
        ))}
      </div>
    </ToolWrapper>
  );
};

// --- 20. Markdown Previewer ---
export const MarkdownPreviewer: React.FC<ToolProps> = ({ goBack, lang }) => {
  const [input, setInput] = useState('# Hello');
  const [html, setHtml] = useState('');
  const [libLoaded, setLibLoaded] = useState(false);
  const t = (key: string) => getTranslation(lang, key);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
    script.onload = () => setLibLoaded(true);
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  useEffect(() => {
    // @ts-ignore
    if (libLoaded && window.marked) { // or marked
      // @ts-ignore
      setHtml(window.marked.parse(input));
    }
  }, [input, libLoaded]);

  return (
    <ToolWrapper 
      title={t('tool_markdown')}
      goBack={goBack}
      lang={lang}
      onDownload={() => downloadContent('doc.html', html)}
    >
      <ToolInfo 
        title={t('tool_markdown')}
        desc={t('info_desc_markdown')}
        steps={t('info_steps_markdown').split('|')}
        lang={lang}
      />
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[400px]">
         <textarea 
           value={input}
           onChange={(e) => setInput(e.target.value)}
           className="w-full h-full p-4 border rounded-lg bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:text-white font-mono text-sm resize-none"
         />
         <div 
           className="w-full h-full p-4 border rounded-lg overflow-auto prose dark:prose-invert bg-white dark:bg-gray-800"
           dangerouslySetInnerHTML={{ __html: html }}
         />
       </div>
    </ToolWrapper>
  );
};
