import React from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  onSignUpClick: () => void;
  onDeliveryClick: () => void;
  onEntrepreneurClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSignUpClick, onDeliveryClick, onEntrepreneurClick }) => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState(i18n.language.toUpperCase());

  const languages = [
    { code: 'AZ', name: 'Azərbaycan' },
    { code: 'RU', name: 'Русский' }
  ];

  const handleLanguageSelect = (language: { code: string; name: string }) => {
    setSelectedLanguage(language.code);
    i18n.changeLanguage(language.code.toLowerCase());
    setIsLanguageOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Yango_%28entreprise%29.png" 
                alt="Yango Logo" 
                className="h-8 w-auto"
              />
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#about" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
                {t('header.about')}
              </a>
              <button onClick={onSignUpClick} className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
                {t('header.forDrivers')}
              </button>
              <button onClick={onDeliveryClick} className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
                {t('header.forDelivery')}
              </button>
              <button onClick={onEntrepreneurClick} className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
                {t('header.forEntrepreneurs')}
              </button>
              
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                >
                  <Globe className="w-4 h-4 mr-1" />
                  {selectedLanguage}
                </button>
                
                {isLanguageOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageSelect(language)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                          selectedLanguage === language.code ? 'bg-red-50 text-red-600' : 'text-gray-700'
                        }`}
                      >
                        {language.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <button
                onClick={onSignUpClick}
                className="bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
              >
                {t('header.becomeDriver')}
              </button>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900 p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <a href="#about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900">
              {t('header.about')}
            </a>
            <button onClick={onSignUpClick} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900">
              {t('header.forDrivers')}
            </button>
            <button onClick={onDeliveryClick} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900">
              {t('header.forDelivery')}
            </button>
            <button onClick={onEntrepreneurClick} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900">
              {t('header.forEntrepreneurs')}
            </button>
            
            {/* Mobile Language Selector */}
            <div className="px-3 py-2">
              <div className="flex items-center text-gray-700 mb-2">
                <Globe className="w-4 h-4 mr-2" />
                <span className="text-base font-medium">{t('header.language', 'Language')}</span>
              </div>
              <div className="space-y-1 ml-6">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageSelect(language)}
                    className={`block w-full text-left px-2 py-1 text-sm rounded transition-colors ${
                      selectedLanguage === language.code ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {language.name}
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={onSignUpClick}
              className="block w-full text-left px-3 py-2 text-base font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              {t('header.becomeDriver')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;