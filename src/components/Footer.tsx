import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-white border-t border-gray-200" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex space-x-8">
            <a href="https://wa.me/994552646469" className="text-gray-600 hover:text-gray-900 transition-colors" aria-label="WhatsApp ilə əlaqə">
              {t('footer.contactUs')}
            </a>
          </div>
          <div className="text-gray-500 text-sm">
            {t('footer.copyright')}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;