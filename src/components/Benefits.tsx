import React from 'react';
import { Clock, DollarSign, Percent, CreditCard } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Benefits: React.FC = () => {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: <Clock className="w-8 h-8 text-red-600" />,
      title: t('benefits.flexibleHours.title'),
      description: t('benefits.flexibleHours.description')
    },
    {
      icon: <DollarSign className="w-8 h-8 text-red-600" />,
      title: t('benefits.competitiveEarnings.title'),
      description: t('benefits.competitiveEarnings.description')
    },
    {
      icon: <Percent className="w-8 h-8 text-red-600" />,
      title: t('benefits.lowCommissions.title'),
      description: t('benefits.lowCommissions.description')
    },
    {
      icon: <CreditCard className="w-8 h-8 text-red-600" />,
      title: t('benefits.dailyCashout.title'),
      description: t('benefits.dailyCashout.description')
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('benefits.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('benefits.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-red-50 rounded-lg mb-6 mx-auto">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;