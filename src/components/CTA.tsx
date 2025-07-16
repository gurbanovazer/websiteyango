import React from 'react';
import { useTranslation } from 'react-i18next';

interface CTAProps {
  onSignUpClick: () => void;
}

const CTA: React.FC<CTAProps> = ({ onSignUpClick }) => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          {t('cta.title')}
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          {t('cta.subtitle')}
        </p>
        <button
          onClick={onSignUpClick}
          className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          {t('cta.signUp')}
        </button>
      </div>
    </section>
  );
};

export default CTA;