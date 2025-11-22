import React from 'react';

// Privacy Policy
export const PrivacyPage: React.FC = () => (
  <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow text-left">
    <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Privacy Policy</h1>
    <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
      <p>Last Updated: {new Date().toLocaleDateString('en-US')}</p>
      
      <h2 className="text-xl font-bold mt-4">Introduction</h2>
      <p>At "SmartTools", we prioritize the privacy of our visitors. This document outlines the types of information we might collect and how we use it.</p>

      <h2 className="text-xl font-bold mt-4">Cookies and Web Settings</h2>
      <p>We use cookies to store user preferences (like Light/Dark mode). We do not collect sensitive personal data through these tools.</p>
      
      <h2 className="text-xl font-bold mt-4">Google AdSense</h2>
      <p>We may use Google AdSense to serve ads. Google, as a third-party vendor, uses cookies to serve ads based on your prior visits to our website or other websites.</p>
      <ul className="list-disc list-inside ml-4">
         <li>Google uses the DoubleClick cookie to enable it and its partners to serve ads to users.</li>
         <li>You may opt out of the use of the DoubleClick cookie for interest-based advertising by visiting Google's Ad Settings.</li>
      </ul>

      <h2 className="text-xl font-bold mt-4">Analytics</h2>
      <p>We may use simple analytics tools to track which pages are most visited, but all this data is completely anonymous.</p>
      
      <h2 className="text-xl font-bold mt-4">Client-Side Operations</h2>
      <p>All tools available on this website (such as password generators, converters, etc.) run entirely within your browser. We do not send any input you type to any external server. Your data is completely safe and remains on your device.</p>
    </div>
  </div>
);

// About Us
export const AboutPage: React.FC = () => (
  <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow text-left">
    <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">About Us</h1>
    <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
      <p>Welcome to "SmartTools".</p>
      <p>
        We are a web platform dedicated to providing a comprehensive suite of digital tools that developers, designers, and everyday users need on a daily basis.
      </p>
      <p>
        What sets our site apart is speed and privacy. All our tools are designed to run <strong>Client-Side</strong>, meaning all calculations and text processing happen instantly in your browser without sending your data to servers, ensuring lightning speed and protecting your privacy.
      </p>
      <p>
        Our goal is to simplify daily digital tasks and make the web a more productive place.
      </p>
    </div>
  </div>
);

// Contact Us
export const ContactPage: React.FC = () => (
  <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow text-left">
    <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Contact Us</h1>
    <p className="mb-8 text-gray-600 dark:text-gray-400">
      Have a question? Or a suggestion for a new tool? We'd love to hear from you.
    </p>

    {/* Netlify Form Attributes added */}
    <form 
      className="space-y-6" 
      name="contact" 
      method="POST" 
      data-netlify="true"
      action="/success" // Assuming user handles routing or just shows a message
    >
      <input type="hidden" name="form-name" value="contact" />
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
        <input 
          type="text" 
          name="name" 
          id="name" 
          required
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary outline-none"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
        <input 
          type="email" 
          name="email" 
          id="email" 
          required
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary outline-none"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
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
        Send Message
      </button>
    </form>
  </div>
);