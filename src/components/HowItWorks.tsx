import React from 'react';
import { UserPlus, Shield, Car } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HowItWorks: React.FC = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: <UserPlus className="w-8 h-8 text-white" />,
      title: t('howItWorks.submitApplication.title'),
      description: t('howItWorks.submitApplication.description'),
      color: "bg-blue-600"
    },
    {
      icon: <Shield className="w-8 h-8 text-white" />,
      title: t('howItWorks.provideDocuments.title'),
      description: t('howItWorks.provideDocuments.description'),
      color: "bg-green-600"
    },
    {
      icon: <Car className="w-8 h-8 text-white" />,
      title: t('howItWorks.startEarning.title'),
      description: t('howItWorks.startEarning.description'),
      color: "bg-red-600"
    }
  ];

  return (
    <section className="py-20 bg-white" aria-labelledby="how-it-works-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="how-it-works-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('howItWorks.title')}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center" itemScope itemType="https://schema.org/HowToStep">
              <div className={`inline-flex items-center justify-center w-16 h-16 ${step.color} rounded-full mb-6`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4" itemProp="name">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed" itemProp="text">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;