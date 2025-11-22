import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ViewState } from '../types';
import AdPlaceholder from '../components/AdPlaceholder';

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
  ltr?: boolean; 
}

const ToolWrapper: React.FC<ToolWrapperProps> = ({ title, children, goBack, onDownload }) => (
  <div className="max-w-3xl mx-auto animate-fade-in">
    <button 
      onClick={goBack}
      className="mb-6 flex items-center text-gray-500 hover:text-primary transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
      </svg>
      Back to Tools
    </button>
    
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
      <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200 dark:border-gray-700 flex-wrap gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          {title}
        </h2>
      </div>

      {/* Top Ad Unit inside Tool Wrapper */}
      <AdPlaceholder />
      <div className="mb-6">
        {children}
      </div>

      {onDownload && (
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <button 
            onClick={onDownload}
            className="flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors text-base font-medium shadow-sm w-full md:w-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download Result
          </button>
        </div>
      )}
    </div>
    {/* Bottom Ad Unit outside Tool Wrapper */}
    <AdPlaceholder />
  </div>
);

// Helper component for the "Blog Post" section
const ToolInfo: React.FC<{ title: string, desc: string, steps: string[] }> = ({ title, desc, steps }) => (
  <div className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-8">
    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">About {title}</h3>
    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
      {desc}
    </p>
    <h4 className="font-medium text-gray-900 dark:text-white mb-2">How to use:</h4>
    <ol className="list-decimal list-inside space-y-1 text-gray-600 dark:text-gray-400 ml-1">
      {steps.map((s, i) => <li key={i}>{s}</li>)}
    </ol>
  </div>
);

// --- 1. Password Generator ---
export const PasswordGenerator: React.FC<{goBack: () => void}> = ({ goBack }) => {
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');

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
      title="Password Generator" 
      goBack={goBack}
      onDownload={() => password && downloadContent('password.txt', password)}
    >
      <ToolInfo 
        title="Password Generator"
        desc="A strong, random password is the best defense against cyber threats. This tool creates secure passwords locally on your device using a combination of letters, numbers, and symbols, ensuring no data ever leaves your browser."
        steps={[
          "Select your desired password length using the slider (12+ recommended).",
          "Toggle 'Numbers' and 'Symbols' based on your requirements.",
          "Click 'Generate Password' to create a new secure string.",
          "Copy the result for use in your accounts."
        ]}
      />
      <div className="space-y-6">
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
          <input 
            type="text" 
            readOnly 
            value={password} 
            placeholder="Click generate..."
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
              <span className="text-gray-700 dark:text-gray-300">Numbers</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={includeSymbols} 
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
              />
              <span className="text-gray-700 dark:text-gray-300">Symbols</span>
            </label>
          </div>
        </div>

        <button 
          onClick={generate}
          className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          Generate Password
        </button>
      </div>
    </ToolWrapper>
  );
};

// --- 2. Word & Char Counter ---
export const WordCounter: React.FC<{goBack: () => void}> = ({ goBack }) => {
  const [text, setText] = useState('');
  
  const stats = useMemo(() => {
    const chars = text.length;
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    return { chars, words };
  }, [text]);

  return (
    <ToolWrapper 
      title="Word & Character Counter" 
      goBack={goBack}
      onDownload={() => downloadContent('word-count-report.txt', `Text Analysis Report\n-------------------\nWords: ${stats.words}\nCharacters: ${stats.chars}\n\nContent:\n${text}`)}
    >
      <ToolInfo 
        title="Word & Character Counter"
        desc="Writers, students, and professionals often need to adhere to specific character limits for essays, tweets, or meta descriptions. This tool counts words and characters instantly as you type, helping you manage content length."
        steps={[
          "Type or paste your text into the large text area.",
          "View the 'Words' count updating in real-time below the box.",
          "View the 'Characters' count (including spaces) next to it."
        ]}
      />
      <div className="space-y-4">
        <textarea
          className="w-full h-48 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          placeholder="Type or paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.words}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Words</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.chars}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Characters</div>
          </div>
        </div>
      </div>
    </ToolWrapper>
  );
};

// --- 3. Unit Converter ---
export const UnitConverter: React.FC<{goBack: () => void}> = ({ goBack }) => {
  const [val, setVal] = useState<string>('');
  const [from, setFrom] = useState('MB');
  const [to, setTo] = useState('KB');
  const [result, setResult] = useState<string>('---');

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
      title="Data Unit Converter" 
      goBack={goBack}
      onDownload={() => downloadContent('conversion.txt', `${val} ${from} = ${result} ${to}`)}
    >
      <ToolInfo 
        title="Data Unit Converter"
        desc="Computing storage units can be confusing. This tool allows you to easily convert between Bytes, Kilobytes, Megabytes, Gigabytes, and Terabytes, making it essential for understanding file sizes and disk space management."
        steps={[
          "Enter the numeric value you want to convert in the 'Value' field.",
          "Select the current unit from the 'From' dropdown menu.",
          "Select the target unit from the 'To' dropdown menu.",
          "Read the calculated result displayed prominently below."
        ]}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Value</label>
          <input 
            type="number" 
            value={val} 
            onChange={(e) => setVal(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">From</label>
          <select 
            value={from} 
            onChange={(e) => setFrom(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {Object.keys(units).map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">To</label>
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
        <span className="text-gray-500 dark:text-gray-400">Result:</span>
        <div className="text-3xl font-bold text-primary mt-2 break-all">
          {result} {to}
        </div>
      </div>
    </ToolWrapper>
  );
};

// --- 4. Base Converter ---
export const BaseConverter: React.FC<{goBack: () => void}> = ({ goBack }) => {
  const [number, setNumber] = useState('');
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(2);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!number) {
      setResult('');
      setError('');
      return;
    }
    try {
      const val = parseInt(number, fromBase);
      if (isNaN(val)) {
        setError('Invalid number for this base');
        setResult('');
      } else {
        setResult(val.toString(toBase).toUpperCase());
        setError('');
      }
    } catch (e) {
      setError('Conversion error');
    }
  }, [number, fromBase, toBase]);

  return (
    <ToolWrapper 
      title="Number Base Converter" 
      goBack={goBack}
      onDownload={() => downloadContent('base-conversion.txt', `${number} (Base ${fromBase}) = ${result} (Base ${toBase})`)}
    >
      <ToolInfo 
        title="Number Base Converter"
        desc="Computer science relies on different number systems. This utility helps developers and students convert numbers accurately between Binary (Base 2), Octal (Base 8), Decimal (Base 10), and Hexadecimal (Base 16)."
        steps={[
          "Enter the number you wish to convert in the input field.",
          "Select the base of your input number (e.g., Decimal) from 'From Base'.",
          "Select the base you want to convert to (e.g., Binary) from 'To Base'.",
          "The converted result appears instantly in the box below."
        ]}
      />
      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Number</label>
          <input 
            type="text" 
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Enter number..."
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
             <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">From Base</label>
             <select 
               value={fromBase} 
               onChange={(e) => setFromBase(Number(e.target.value))}
               className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
             >
               <option value={2}>Binary (2)</option>
               <option value={8}>Octal (8)</option>
               <option value={10}>Decimal (10)</option>
               <option value={16}>Hex (16)</option>
             </select>
          </div>
          <div>
             <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">To Base</label>
             <select 
               value={toBase} 
               onChange={(e) => setToBase(Number(e.target.value))}
               className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
             >
               <option value={2}>Binary (2)</option>
               <option value={8}>Octal (8)</option>
               <option value={10}>Decimal (10)</option>
               <option value={16}>Hex (16)</option>
             </select>
          </div>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
          <span className="text-gray-500">Result:</span>
          <div className="text-2xl font-mono font-bold mt-1 break-all">{result || '---'}</div>
        </div>
      </div>
    </ToolWrapper>
  );
};

// --- 5. Discount Calculator ---
export const DiscountCalculator: React.FC<{goBack: () => void}> = ({ goBack }) => {
  const [price, setPrice] = useState<string>('');
  const [discount, setDiscount] = useState<string>('');

  const p = parseFloat(price) || 0;
  const d = parseFloat(discount) || 0;
  const saving = p * (d / 100);
  const final = p - saving;

  return (
    <ToolWrapper 
      title="Discount Calculator" 
      goBack={goBack}
      onDownload={() => downloadContent('discount-calc.txt', `Original Price: ${p}\nDiscount: ${d}%\n\nYou Save: ${saving.toFixed(2)}\nFinal Price: ${final.toFixed(2)}`)}
    >
      <ToolInfo 
        title="Discount Calculator"
        desc="Shopping sales? Quickly calculate the final price of an item after applying a percentage discount and see exactly how much cash you are saving. Useful for Black Friday or seasonal sales."
        steps={[
          "Enter the original price of the product.",
          "Enter the discount percentage offered.",
          "View the 'Price After Discount' to see what you will pay.",
          "Check the 'You Save' amount to see the total reduction."
        ]}
      />
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Original Price</label>
          <input 
            type="number" 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Discount (%)</label>
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
          <div className="text-sm text-green-700 dark:text-green-400">Price After Discount</div>
          <div className="text-2xl font-bold text-green-700 dark:text-green-400">{final.toFixed(2)}</div>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-center">
          <div className="text-sm text-red-700 dark:text-red-400">You Save</div>
          <div className="text-2xl font-bold text-red-700 dark:text-red-400">{saving.toFixed(2)}</div>
        </div>
      </div>
    </ToolWrapper>
  );
};

// --- 6. Email Validator ---
export const EmailValidator: React.FC<{goBack: () => void}> = ({ goBack }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');

  useEffect(() => {
    if (!email) {
      setStatus('idle');
      return;
    }
    // Regex for client-side validation
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setStatus(re.test(email) ? 'valid' : 'invalid');
  }, [email]);

  return (
    <ToolWrapper 
      title="Email Validator" 
      goBack={goBack}
      onDownload={() => downloadContent('email-validation.txt', `Email: ${email}\nStatus: ${status.toUpperCase()}`)}
    >
      <ToolInfo 
        title="Email Validator"
        desc="Validating email syntax is crucial for data quality. This tool checks if an email address conforms to standard formatting rules using regular expressions (Regex) right in your browser. Note: This checks format only, not existence."
        steps={[
          "Type an email address into the input field.",
          "Watch the border color change: Green for valid, Red for invalid.",
          "Read the status message below for confirmation."
        ]}
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
        {status === 'valid' && (
          <div className="flex items-center text-green-600 gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            <span>Valid email format.</span>
          </div>
        )}
        {status === 'invalid' && (
          <div className="flex items-center text-red-600 gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            <span>Invalid email format.</span>
          </div>
        )}
      </div>
    </ToolWrapper>
  );
};

// --- 7. Random Color ---
export const RandomColor: React.FC<{goBack: () => void}> = ({ goBack }) => {
  const [color, setColor] = useState('#3B82F6');

  const generateColor = () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setColor(randomColor.toUpperCase());
  };

  return (
    <ToolWrapper 
      title="Random Color Generator" 
      goBack={goBack}
      onDownload={() => downloadContent('random-color.txt', `Generated Color: ${color}`)}
    >
      <ToolInfo 
        title="Random Color Generator"
        desc="Colors trigger emotions and are vital for design. This tool randomly generates Hexadecimal color codes to provide inspiration for your next UI/UX project or artwork."
        steps={[
          "View the current random color displayed in the large box.",
          "Click 'Generate New Color' to create a fresh random color.",
          "Copy the HEX code displayed in the center (e.g., #FF5733) for your designs."
        ]}
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
          Generate New Color
        </button>
      </div>
    </ToolWrapper>
  );
};

// --- 8. String Comparator ---
export const StringComparator: React.FC<{goBack: () => void}> = ({ goBack }) => {
  const [strA, setStrA] = useState('');
  const [strB, setStrB] = useState('');
  
  const isMatch = strA === strB;
  const lengthDiff = Math.abs(strA.length - strB.length);

  return (
    <ToolWrapper 
      title="String Comparator" 
      goBack={goBack}
      onDownload={() => downloadContent('string-comparison.txt', `String 1:\n${strA}\n\nString 2:\n${strB}\n\nMatch: ${isMatch ? 'YES' : 'NO'}\nLength Diff: ${lengthDiff}`)}
    >
      <ToolInfo 
        title="String Comparator"
        desc="Comparing two large blocks of text or code to find differences can be tedious and error-prone. This tool compares two strings and tells you if they match exactly or how much they differ in length."
        steps={[
          "Paste the first block of text into the left box (Text 1).",
          "Paste the second block of text into the right box (Text 2).",
          "Check the status bar below to see if they match exactly (Green) or if there are differences (Red)."
        ]}
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
          <div className="font-bold">Texts match exactly ✅</div>
        ) : (
          <div>
            <div className="font-bold mb-1">Texts are different ❌</div>
            <div className="text-sm">Length difference: {lengthDiff} chars</div>
          </div>
        )}
      </div>
    </ToolWrapper>
  );
};

// --- 9. Dark Mode Demo ---
export const ThemeDemo: React.FC<{goBack: () => void}> = ({ goBack }) => (
  <ToolWrapper 
    title="Light/Dark Mode Toggle" 
    goBack={goBack}
    onDownload={() => downloadContent('theme-info.txt', 'SmartTools Theme Demo\n\nThis tool demonstrates persisting user preferences (Dark/Light mode) using LocalStorage.')}
  >
    <ToolInfo 
      title="Light/Dark Mode Toggle"
      desc="User Interface preferences vary. This tool demonstrates a persistent Dark Mode feature that saves your preference in the browser's local storage, ensuring the site looks the way you want it on every visit."
      steps={[
        "Locate the moon/sun icon in the top navigation bar (top right).",
        "Click the icon to toggle between Light and Dark themes.",
        "Refresh the page to confirm that your preference is remembered automatically."
      ]}
    />
    <div className="text-center py-8 space-y-4">
      <p className="text-lg">
        This tool is integrated into the top navigation bar for easy access at all times.
      </p>
      <p className="text-gray-600 dark:text-gray-400">
        This website automatically saves your preference in your browser.
      </p>
      <div className="inline-block p-4 border border-gray-300 dark:border-gray-600 rounded-lg">
        Look at the top right corner of the screen ↗️
      </div>
    </div>
  </ToolWrapper>
);

// --- 10. Reading Progress Demo ---
export const ReadingProgressDemo: React.FC<{goBack: () => void}> = ({ goBack }) => (
  <ToolWrapper 
    title="Reading Progress Bar" 
    goBack={goBack}
    onDownload={() => downloadContent('progress-info.txt', 'SmartTools Reading Progress Bar Demo\n\nThis tool demonstrates a scroll-linked progress indicator usually found on blogs.')}
  >
    <ToolInfo 
      title="Reading Progress Bar"
      desc="Long articles can be daunting. A reading progress bar improves user experience by showing readers visually how far they have progressed through the content, encouraging them to finish reading."
      steps={[
        "Look at the very top edge of the browser window (the sticky bar).",
        "Scroll down this page slowly.",
        "Observe the colored bar expanding from left to right as you scroll, indicating your position on the page."
      ]}
    />
    <div className="space-y-6">
       <p className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded text-blue-800 dark:text-blue-200">
         Notice the colored bar at the very top of this page. Scroll down to see it move!
       </p>
       <div className="space-y-4 text-gray-600 dark:text-gray-400">
         {[...Array(15)].map((_, i) => (
           <p key={i}>
             This is sample text to fill the page and increase its length so you can experience the progress bar at the top.
             Progress bars are very useful for long articles so the reader knows how much content is left.
             Line number {i + 1}.
           </p>
         ))}
       </div>
    </div>
  </ToolWrapper>
);

// --- 11. Basic SEO Checker ---
export const SeoChecker: React.FC<{goBack: () => void}> = ({ goBack }) => {
  const [title, setTitle] = useState(document.title);
  const [desc, setDesc] = useState('');

  useEffect(() => {
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) setDesc(metaDesc.getAttribute('content') || '');
  }, []);

  const titleColor = title.length >= 50 && title.length <= 60 ? 'text-green-600' : 'text-orange-500';
  const descColor = desc.length >= 150 && desc.length <= 160 ? 'text-green-600' : 'text-orange-500';

  return (
    <ToolWrapper 
      title="Basic SEO Checker" 
      goBack={goBack}
      onDownload={() => downloadContent('seo-report.txt', `SEO Analysis Report\n\nPage Title: ${title}\nLength: ${title.length} chars (Recommended: 50-60)\n\nMeta Description: ${desc}\nLength: ${desc.length} chars (Recommended: 150-160)`)}
    >
      <ToolInfo 
        title="Basic SEO Checker"
        desc="Optimize your web pages for search engines by checking the length of your Title tag and Meta Description against recommended standards. Proper lengths ensure your snippets look good in Google search results."
        steps={[
          "Enter your proposed Page Title in the first field.",
          "Enter your Meta Description in the second field.",
          "Check the character counts and color indicators (Green implies optimal length, Orange implies improvement needed)."
        ]}
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
            <span className={titleColor}>{title.length} Characters</span>
            <span className="text-gray-500">Recommended: 50-60</span>
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
            <span className={descColor}>{desc.length} Characters</span>
            <span className="text-gray-500">Recommended: 150-160</span>
          </div>
        </div>
      </div>
    </ToolWrapper>
  );
};

// --- 12. Base64 Encoder/Decoder ---
export const Base64Converter: React.FC<{goBack: () => void}> = ({ goBack }) => {
  const [text, setText] = useState('');
  const [base64, setBase64] = useState('');

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setText(val);
    try {
      setBase64(btoa(unescape(encodeURIComponent(val))));
    } catch {
      setBase64('Invalid input for Base64 encoding');
    }
  };

  const handleBase64Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setBase64(val);
    try {
      setText(decodeURIComponent(escape(window.atob(val))));
    } catch {
      setText('Invalid Base64 string');
    }
  };

  return (
    <ToolWrapper 
      title="Base64 Encoder/Decoder" 
      goBack={goBack}
      onDownload={() => downloadContent('base64-result.txt', `Plain Text:\n${text}\n\nBase64:\n${base64}`)}
    >
      <ToolInfo 
        title="Base64 Encoder/Decoder"
        desc="Base64 is a standard for encoding binary data into ASCII characters. Developers use it for data transfer, email attachments, and embedding images directly into HTML/CSS. This tool handles both directions."
        steps={[
          "To Encode: Type plain text in the 'Plain Text' box to see the Base64 result instantly.",
          "To Decode: Paste a Base64 string in the 'Base64 Output' box to see the decoded plain text."
        ]}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">Plain Text</label>
          <textarea
            className="w-full h-48 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-sm"
            value={text}
            onChange={handleTextChange}
            placeholder="Type text here..."
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">Base64 Output</label>
          <textarea
            className="w-full h-48 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-sm"
            value={base64}
            onChange={handleBase64Change}
            placeholder="Base64 result..."
          />
        </div>
      </div>
    </ToolWrapper>
  );
};

// --- 13. RGB/HEX Color Converter ---
export const RgbHexConverter: React.FC<{goBack: () => void}> = ({ goBack }) => {
  const [r, setR] = useState(59);
  const [g, setG] = useState(130);
  const [b, setB] = useState(246);
  const [hex, setHex] = useState('#3B82F6');

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
      title="RGB / HEX Converter" 
      goBack={goBack}
      onDownload={() => downloadContent('color-code.txt', `HEX: ${hex}\nRGB: (${r}, ${g}, ${b})`)}
    >
      <ToolInfo 
        title="RGB / HEX Converter"
        desc="Web colors are defined in RGB (Red, Green, Blue) or Hexadecimal formats. This converter bridges the gap, allowing designers and developers to easily translate values between these two common formats."
        steps={[
          "Enter Red, Green, and Blue values (0-255) to automatically generate the HEX code.",
          "Or, type a HEX code (e.g., #3B82F6) in the bottom field to populate the RGB fields.",
          "View the visual color preview block to confirm the color."
        ]}
      />
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
        <div className="w-32 h-32 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600" style={{backgroundColor: hex}}></div>
        
        <div className="space-y-4 w-full max-w-md">
          <div className="grid grid-cols-3 gap-4">
             <div>
               <label className="block text-xs font-bold text-gray-500">Red (0-255)</label>
               <input type="number" min="0" max="255" value={r} onChange={e => setR(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
             </div>
             <div>
               <label className="block text-xs font-bold text-gray-500">Green (0-255)</label>
               <input type="number" min="0" max="255" value={g} onChange={e => setG(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
             </div>
             <div>
               <label className="block text-xs font-bold text-gray-500">Blue (0-255)</label>
               <input type="number" min="0" max="255" value={b} onChange={e => setB(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
             </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">HEX Color</label>
            <input 
              type="text" 
              value={hex} 
              onChange={handleHexChange} 
              className="w-full p-2 border rounded font-mono uppercase dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
      </div>
    </ToolWrapper>
  );
};

// --- 14. Basic QR Code Generator ---
export const QrCodeGenerator: React.FC<{goBack: () => void}> = ({ goBack }) => {
  const [text, setText] = useState('https://google.com');
  const qrRef = useRef<HTMLDivElement>(null);
  const [libLoaded, setLibLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
    script.onload = () => setLibLoaded(true);
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  useEffect(() => {
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
      title="QR Code Generator" 
      goBack={goBack}
      onDownload={handleDownload}
    >
      <ToolInfo 
        title="QR Code Generator"
        desc="QR Codes bridge the physical and digital worlds. Generate scannable codes for your website URLs, Wi-Fi passwords, or contact cards instantly. This tool runs locally in your browser."
        steps={[
          "Type your URL, text, or other data into the input field.",
          "Wait a brief moment for the library to generate the QR code image.",
          "Scan the generated image with your phone camera to test it.",
          "Take a screenshot or save the image to use it."
        ]}
      />
      <div className="flex flex-col items-center space-y-6">
        <input 
          type="text" 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter URL or Text..."
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex justify-center min-h-[160px] min-w-[160px] items-center">
          {libLoaded ? <div ref={qrRef}></div> : <span className="text-gray-400">Loading Library...</span>}
        </div>
      </div>
    </ToolWrapper>
  );
};

// --- 15. Countdown Timer ---
export const CountdownTimer: React.FC<{goBack: () => void}> = ({ goBack }) => {
  const [target, setTarget] = useState('');
  const [timeLeft, setTimeLeft] = useState<{d: number, h: number, m: number, s: number} | null>(null);

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
      title="Countdown Timer" 
      goBack={goBack}
      onDownload={() => downloadContent('countdown-timer.txt', `Countdown Target: ${target}\n\nTime Remaining:\n${timeLeft ? `${timeLeft.d}d ${timeLeft.h}h ${timeLeft.m}m ${timeLeft.s}s` : 'Event has passed'}`)}
    >
      <ToolInfo 
        title="Countdown Timer"
        desc="Anticipation builds excitement. Set a target date and time for an upcoming event, deadline, holiday, or launch, and watch the days, hours, minutes, and seconds tick away in real-time."
        steps={[
          "Click the date picker to select a future date and time.",
          "Watch the Days, Hours, Minutes, and Seconds update automatically.",
          "Use this to track time remaining until your special event."
        ]}
      />
      <div className="space-y-6 text-center">
        <div>
           <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">Set Date & Time</label>
           <input 
             type="datetime-local" 
             value={target}
             onChange={(e) => setTarget(e.target.value)}
             className="p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
           />
        </div>
        
        <div className="grid grid-cols-4 gap-2 md:gap-4">
           {['Days', 'Hours', 'Minutes', 'Seconds'].map((label, i) => {
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
export const ImageCompressor: React.FC<{goBack: () => void}> = ({ goBack }) => {
  const [quality, setQuality] = useState(0.7);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [preview, setPreview] = useState('');

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
        
        // Estimate size
        const head = 'data:image/jpeg;base64,';
        const size = Math.round((dataUrl.length - head.length) * 3 / 4);
        setCompressedSize(size);
      }
    }
    reader.readAsDataURL(file);
  };

  return (
    <ToolWrapper 
      title="Basic Image Compressor" 
      goBack={goBack}
      onDownload={preview ? () => downloadImage('compressed-image.jpg', preview) : undefined}
    >
      <ToolInfo 
        title="Basic Image Compressor"
        desc="Large images slow down websites and take up storage. This client-side tool uses your browser's Canvas API to reduce image quality and file size safely without uploading your private photos to a remote server."
        steps={[
          "Click 'Choose File' to select an image from your device.",
          "Adjust the 'Quality' slider (lower quality = smaller file size).",
          "Compare the 'Original' and 'New' file sizes.",
          "Click 'Download Image' to save the compressed version."
        ]}
      />
      <div className="space-y-6">
        <input type="file" accept="image/*" onChange={handleFile} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 dark:text-gray-300"/>
        
        {preview && (
          <>
            <div>
               <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">Quality: {Math.round(quality*100)}%</label>
               <input type="range" min="0.1" max="1" step="0.1" value={quality} onChange={e => setQuality(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm text-center">
              <div>Original: {(originalSize/1024).toFixed(2)} KB</div>
              <div className="text-green-600 font-bold">New: {(compressedSize/1024).toFixed(2)} KB</div>
            </div>

            <div className="border rounded p-2 overflow-hidden">
              <img src={preview} alt="Compressed Preview" className="max-h-64 mx-auto" />
            </div>
          </>
        )}
      </div>
    </ToolWrapper>
  );
};

// --- 17. BMI Calculator ---
export const BmiCalculator: React.FC<{goBack: () => void}> = ({ goBack }) => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // cm to m
    if (w && h) {
      setBmi(parseFloat((w / (h * h)).toFixed(1)));
    }
  };

  let category = '';
  let color = 'text-gray-600';
  if (bmi) {
    if (bmi < 18.5) { category = 'Underweight'; color = 'text-blue-500'; }
    else if (bmi < 25) { category = 'Normal weight'; color = 'text-green-500'; }
    else if (bmi < 30) { category = 'Overweight'; color = 'text-orange-500'; }
    else { category = 'Obese'; color = 'text-red-500'; }
  }

  return (
    <ToolWrapper 
      title="Simple BMI Calculator" 
      goBack={goBack}
      onDownload={() => downloadContent('bmi-report.txt', `BMI Report\n\nHeight: ${height} cm\nWeight: ${weight} kg\n\nYour BMI: ${bmi}\nCategory: ${category}`)}
    >
      <ToolInfo 
        title="Simple BMI Calculator"
        desc="Body Mass Index (BMI) is a simple screening tool to estimate whether you are at a healthy weight for your height. It is a useful starting point for understanding your general health category."
        steps={[
          "Enter your height in centimeters (cm).",
          "Enter your weight in kilograms (kg).",
          "Click 'Calculate BMI' to see your numeric score.",
          "Check your category (Normal, Overweight, etc.) displayed below."
        ]}
      />
      <div className="space-y-6 max-w-sm mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-1 dark:text-white">Height (cm)</label>
            <input type="number" value={height} onChange={e => setHeight(e.target.value)} className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"/>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1 dark:text-white">Weight (kg)</label>
            <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"/>
          </div>
        </div>
        
        <button onClick={calculate} className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-600">Calculate BMI</button>
        
        {bmi && (
          <div className="text-center p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
             <div className="text-sm text-gray-500 dark:text-gray-400">Your BMI</div>
             <div className="text-4xl font-bold text-gray-800 dark:text-white my-2">{bmi}</div>
             <div className={`text-lg font-bold ${color}`}>{category}</div>
          </div>
        )}
      </div>
    </ToolWrapper>
  );
};

// --- 18. Text Cleaner ---
export const TextCleaner: React.FC<{goBack: () => void}> = ({ goBack }) => {
  const [text, setText] = useState('');

  const cleanSpaces = () => setText(text.replace(/\s+/g, ' ').trim());
  const cleanLines = () => setText(text.replace(/^\s*[\r\n]/gm, ''));

  return (
    <ToolWrapper 
      title="Text Cleaner" 
      goBack={goBack}
      onDownload={() => downloadContent('cleaned-text.txt', text)}
    >
      <ToolInfo 
        title="Text Cleaner"
        desc="Formatting issues often occur when copying text from PDFs or websites. This tool cleans up messy spacing, accidental double spaces, and extra empty lines to make your text neat and ready for use."
        steps={[
          "Paste your messy text into the large text area.",
          "Click 'Remove Double Spaces' to normalize spacing between words.",
          "Click 'Remove Empty Lines' to compact the text and remove blank paragraphs."
        ]}
      />
      <div className="space-y-4">
        <textarea 
          value={text}
          onChange={e => setText(e.target.value)}
          className="w-full h-48 p-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Paste messy text here..."
        ></textarea>
        <div className="flex gap-4">
          <button onClick={cleanSpaces} className="flex-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition">Remove Double Spaces</button>
          <button onClick={cleanLines} className="flex-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition">Remove Empty Lines</button>
        </div>
      </div>
    </ToolWrapper>
  );
};

// --- 19. Time Zone Converter ---
export const TimeZoneConverter: React.FC<{goBack: () => void}> = ({ goBack }) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const zones = [
    { name: 'UTC', zone: 'UTC' },
    { name: 'New York', zone: 'America/New_York' },
    { name: 'London', zone: 'Europe/London' },
    { name: 'Dubai', zone: 'Asia/Dubai' },
    { name: 'Tokyo', zone: 'Asia/Tokyo' },
    { name: 'Sydney', zone: 'Australia/Sydney' },
  ];

  const generateReport = () => {
    return zones.map(z => `${z.name}: ${date.toLocaleTimeString('en-US', { timeZone: z.zone })}`).join('\n');
  };

  return (
    <ToolWrapper 
      title="Basic Time Zone Converter" 
      goBack={goBack}
      onDownload={() => downloadContent('world-clock.txt', generateReport())}
    >
      <ToolInfo 
        title="Basic Time Zone Converter"
        desc="Working with global teams or scheduling international calls? This tool displays the current local time in major business hubs around the world compared to your device's local time."
        steps={[
          "Simply open the tool to view the dashboard.",
          "Check the live clocks for New York, London, Dubai, Tokyo, and Sydney.",
          "The clocks update every second automatically to ensure accuracy."
        ]}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {zones.map((z) => (
          <div key={z.name} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-100 dark:border-gray-600">
            <div className="text-sm text-gray-500 dark:text-gray-400">{z.name}</div>
            <div className="text-xl font-mono font-bold text-gray-800 dark:text-white mt-1">
              {date.toLocaleTimeString('en-US', { timeZone: z.zone })}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {date.toLocaleDateString('en-US', { timeZone: z.zone })}
            </div>
          </div>
        ))}
      </div>
    </ToolWrapper>
  );
};

// --- 20. Markdown Previewer ---
export const MarkdownPreviewer: React.FC<{goBack: () => void}> = ({ goBack }) => {
  const [input, setInput] = useState('# Hello World\n\nType some markdown here.');
  const [html, setHtml] = useState('');
  const [libLoaded, setLibLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
    script.onload = () => setLibLoaded(true);
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  useEffect(() => {
    // @ts-ignore
    if (libLoaded && window.marked) {
      // @ts-ignore
      setHtml(window.marked.parse(input));
    }
  }, [input, libLoaded]);

  return (
    <ToolWrapper 
      title="Markdown Previewer" 
      goBack={goBack}
      onDownload={() => downloadContent('document.html', `<!DOCTYPE html><html><body>${html}</body></html>`, )}
    >
      <ToolInfo 
        title="Markdown Previewer"
        desc="Markdown is a lightweight markup language used by developers and writers to create formatted text using a plain-text editor. This tool allows you to write Markdown and see the rendered HTML output instantly."
        steps={[
          "Type Markdown syntax in the left pane (e.g., # Heading, **bold**, - list).",
          "View the rendered HTML result in the right pane immediately.",
          "Use this to test your README files or blog posts before publishing."
        ]}
      />
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[500px]">
         <textarea 
           value={input}
           onChange={(e) => setInput(e.target.value)}
           className="w-full h-full p-4 border rounded-lg bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:text-white font-mono text-sm resize-none focus:ring-2 focus:ring-primary"
         />
         <div 
           className="w-full h-full p-4 border rounded-lg overflow-auto prose dark:prose-invert bg-white dark:bg-gray-800"
           dangerouslySetInnerHTML={{ __html: html }}
         />
       </div>
    </ToolWrapper>
  );
};