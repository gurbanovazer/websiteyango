import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaWhatsapp } from 'react-icons/fa';

interface HeroProps {
  onGetStartedClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStartedClick }) => {
  const { t } = useTranslation();

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/994552646469', '_blank');
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div 
        className="relative min-h-[500px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2)'
        }}
        role="banner"
        aria-label="Yango sürücü qəbulu hero bölməsi"
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" itemProp="headline">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed" itemProp="description">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onGetStartedClick}
                aria-label="Yango sürücü qeydiyyatına başla"
                className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {t('hero.getStarted')}
              </button>
              <button
                onClick={handleWhatsAppClick}
                aria-label="WhatsApp vasitəsilə əlaqə saxla"
                className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              >
                <FaWhatsapp className="text-2xl" />
                əlaqə saxla
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;