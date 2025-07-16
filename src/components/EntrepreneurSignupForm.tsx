import React, { useState } from 'react';
import { X, Building, Users, DollarSign } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface EntrepreneurSignupFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const EntrepreneurSignupForm: React.FC<EntrepreneurSignupFormProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    companyName: '',
    numberOfCars: '',
    workConditions: [] as string[]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleWorkConditionChange = (condition: string) => {
    setFormData(prev => ({
      ...prev,
      workConditions: prev.workConditions.includes(condition)
        ? prev.workConditions.filter(c => c !== condition)
        : [...prev.workConditions, condition]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Entrepreneur form submitted:', formData);
    alert(t('entrepreneurForm.successMessage'));
    onClose();
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      companyName: '',
      numberOfCars: '',
      workConditions: []
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">{t('entrepreneurForm.title')}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <p className="text-gray-600 mt-2">
            {t('entrepreneurForm.subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg border border-red-100">
              <div className="flex items-center mb-4">
                <Building className="w-8 h-8 text-red-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">{t('entrepreneurForm.businessPartnership')}</h3>
              </div>
              <p className="text-gray-700">
                {t('entrepreneurForm.partnershipDesc')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('entrepreneurForm.firstName')} *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('entrepreneurForm.lastName')} *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('entrepreneurForm.phone')} *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('entrepreneurForm.companyName')}
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder={t('entrepreneurForm.companyPlaceholder')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 inline mr-1" />
                {t('entrepreneurForm.numberOfCars')} *
              </label>
              <input
                type="number"
                name="numberOfCars"
                value={formData.numberOfCars}
                onChange={handleInputChange}
                required
                min="1"
                placeholder={t('entrepreneurForm.numberOfCarsPlaceholder')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <DollarSign className="w-4 h-4 inline mr-1" />
                {t('entrepreneurForm.workConditions')} *
              </label>
              <div className="space-y-3">
                {['salary-based', 'rent-based', 'percent-based', 'mixed'].map((condition) => (
                  <label key={condition} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.workConditions.includes(condition)}
                      onChange={() => handleWorkConditionChange(condition)}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700 capitalize">
                      {t(`entrepreneurForm.${condition.replace('-', '')}`)}
                    </span>
                  </label>
                ))}
              </div>
              {formData.workConditions.length === 0 && (
                <p className="text-sm text-red-600 mt-1">{t('entrepreneurForm.selectAtLeastOne')}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold text-blue-900 mb-1">{t('entrepreneurForm.salaryBased')}</h4>
                <p className="text-sm text-blue-800">{t('entrepreneurForm.salaryBasedDesc')}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <Building className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-green-900 mb-1">{t('entrepreneurForm.rentBased')}</h4>
                <p className="text-sm text-green-800">{t('entrepreneurForm.rentBasedDesc')}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold text-purple-900 mb-1">{t('entrepreneurForm.percentBased')}</h4>
                <p className="text-sm text-purple-800">{t('entrepreneurForm.percentBasedDesc')}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <Building className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <h4 className="font-semibold text-orange-900 mb-1">{t('entrepreneurForm.mixed')}</h4>
                <p className="text-sm text-orange-800">{t('entrepreneurForm.mixedDesc')}</p>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-2">{t('entrepreneurForm.whatHappensNext')}</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• {t('entrepreneurForm.contactTime')}</li>
                <li>• {t('entrepreneurForm.discussTerms')}</li>
                <li>• {t('entrepreneurForm.vehicleInspection')}</li>
                <li>• {t('entrepreneurForm.driverOnboarding')}</li>
                <li>• {t('entrepreneurForm.launchFleet')}</li>
              </ul>
            </div>

            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-medium text-red-900 mb-2">{t('entrepreneurForm.entrepreneurBenefits')}</h4>
              <ul className="text-sm text-red-800 space-y-1">
                <li>• {t('entrepreneurForm.platformAccess')}</li>
                <li>• {t('entrepreneurForm.marketingSupport')}</li>
                <li>• {t('entrepreneurForm.technicalSupport')}</li>
                <li>• {t('entrepreneurForm.flexibleModels')}</li>
                <li>• {t('entrepreneurForm.analyticsTools')}</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={formData.workConditions.length === 0}
              className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                formData.workConditions.length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {t('entrepreneurForm.submitApplication')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EntrepreneurSignupForm;