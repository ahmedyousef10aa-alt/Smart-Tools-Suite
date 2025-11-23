import React from 'react';

export type Language = 'en' | 'ar' | 'fr' | 'es' | 'el' | 'pt' | 'de' | 'zh' | 'ja' | 'nl';

export enum ViewState {
  HOME = 'HOME',
  PRIVACY = 'PRIVACY',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT',
  // Existing Tools
  TOOL_PASSWORD = 'TOOL_PASSWORD',
  TOOL_COUNTER = 'TOOL_COUNTER',
  TOOL_CONVERTER_UNIT = 'TOOL_CONVERTER_UNIT',
  TOOL_CONVERTER_BASE = 'TOOL_CONVERTER_BASE',
  TOOL_DISCOUNT = 'TOOL_DISCOUNT',
  TOOL_EMAIL = 'TOOL_EMAIL',
  TOOL_COLOR = 'TOOL_COLOR',
  TOOL_STRING = 'TOOL_STRING',
  TOOL_BROWSER_INFO = 'TOOL_BROWSER_INFO', // Replaced Theme Demo
  TOOL_PROGRESS_DEMO = 'TOOL_PROGRESS_DEMO',
  // New Tools
  TOOL_SEO = 'TOOL_SEO',
  TOOL_BASE64 = 'TOOL_BASE64',
  TOOL_RGB_HEX = 'TOOL_RGB_HEX',
  TOOL_QR_CODE = 'TOOL_QR_CODE',
  TOOL_COUNTDOWN = 'TOOL_COUNTDOWN',
  TOOL_IMG_COMPRESS = 'TOOL_IMG_COMPRESS',
  TOOL_BMI = 'TOOL_BMI',
  TOOL_TEXT_CLEANER = 'TOOL_TEXT_CLEANER',
  TOOL_TIMEZONE = 'TOOL_TIMEZONE',
  TOOL_MARKDOWN = 'TOOL_MARKDOWN',
}

export interface ToolMeta {
  id: ViewState;
  titleKey: string;
  descriptionKey: string;
  icon: React.ReactNode;
}