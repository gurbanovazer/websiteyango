import React from 'react';
import { UserPlus, Shield, Car } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HowItWorks: React.FC = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: <UserPlus className="w-8 h-8 text-white" />,
      title: t('howItWorks.signUp.title'),
      description: t('howItWorks.signUp.description'),
      color: "bg-blue-600"
    },
    {
      icon: <Shield className="w-8 h-8 text-white" />,
      title: t('howItWorks.getApproved.title'),
      description: t('howItWorks.getApproved.description'),
      color: "bg-green-600"
    },
    {
      icon: <Car className="w-8 h-8 text-white" />,
      title: t('howItWorks.startDriving.title'),
      description: t('howItWorks.startDriving.description'),
      color: "bg-red-600"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('howItWorks.title')}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 ${step.color} rounded-full mb-6`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
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