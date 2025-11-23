import React from 'react';
import { getTranslation } from '../i18n';
import { Language } from '../types';

interface PageProps {
  lang: Language;
}

// Privacy Policy
export const PrivacyPage: React.FC<PageProps> = ({ lang }) => {
  const t = (key: string) => getTranslation(lang, key);
  
  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow text-left">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{t('nav_privacy')}</h1>
      <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
        <p>Last Updated: {new Date().toLocaleDateString(lang)}</p>
        
        <h2 className="text-xl font-bold mt-4">{t('privacy_heading')}</h2>
        <p>{t('privacy_content')}</p>
        
        <h2 className="text-xl font-bold mt-4">Google AdSense</h2>
        <p>{t('privacy_content')}</p> 
        {/* Note: In a real app, you might want separate keys for detailed policy sections. 
            For this scope, we are reusing the privacy content summary provided in the i18n file 
            or keeping English legalese where strict translation isn't provided by the simplified dictionary. 
        */}
      </div>
    </div>
  );
};

// About Us
export const AboutPage: React.FC<PageProps> = ({ lang }) => {
  const t = (key: string) => getTranslation(lang, key);

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow text-left">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{t('nav_about')}</h1>
      <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
        <h2 className="text-xl font-bold mt-4">{t('about_heading')}</h2>
        <p>{t('about_content')}</p>
      </div>
    </div>
  );
};

// Contact Us
export const ContactPage: React.FC<PageProps> = ({ lang }) => {
  const t = (key: string) => getTranslation(lang, key);

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow text-left">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{t('nav_contact')}</h1>
      
      <h2 className="text-xl font-bold mt-4">{t('contact_heading')}</h2>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        {t('contact_desc')}
      </p>

      {/* Netlify Form Attributes added */}
      <form 
        className="space-y-6" 
        name="contact" 
        method="POST" 
        data-netlify="true"
        action="/success" 
      >
        <input type="hidden" name="form-name" value="contact" />
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('form_name')}</label>
          <input 
            type="text" 
            name="name" 
            id="name" 
            required
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('form_email')}</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            required
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('form_message')}</label>
          <textarea 
            name="message" 
            id="message" 
            rows={5}
            required
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary outline-none"
          ></textarea>
        </div>

        <button 
          type="submit"
          className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors"
        >
          {t('form_send')}
        </button>
      </form>
    </div>
  );
};