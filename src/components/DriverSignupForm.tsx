import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supabase, type DriverApplication } from '../lib/supabase';

interface DriverSignupFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const DriverSignupForm: React.FC<DriverSignupFormProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    mobileNumber: '',
    hasOwnCar: '',
    carModel: '',
    carYear: '',
    workPreferences: [] as string[]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleWorkPreferenceChange = (preference: string) => {
    setFormData(prev => ({
      ...prev,
      workPreferences: prev.workPreferences.includes(preference)
        ? prev.workPreferences.filter(p => p !== preference)
        : [...prev.workPreferences, preference]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmitToSupabase();
  };

  const handleSubmitToSupabase = async () => {
    try {
      const applicationData: DriverApplication = {
        full_name: formData.fullName,
        mobile_number: formData.mobileNumber,
        has_own_car: formData.hasOwnCar === 'yes',
        car_model: formData.hasOwnCar === 'yes' ? formData.carModel : null,
        car_year: formData.hasOwnCar === 'yes' ? parseInt(formData.carYear) : null,
        work_preferences: formData.hasOwnCar === 'no' ? formData.workPreferences : null
      };

      const { error } = await supabase
        .from('driver_applications')
        .insert([applicationData]);

      if (error) {
        console.error('Error submitting driver application:', error);
        alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.');
        return;
      }

      setIsSubmitted(true);
      
      // Auto close after 3 seconds
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setFormData({
          fullName: '',
          mobileNumber: '',
          hasOwnCar: '',
          carModel: '',
          carYear: '',
          workPreferences: []
        });
      }, 3000);
    } catch (error) {
      console.error('Error submitting driver application:', error);
      alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.');
    }
  };

  if (!isOpen) return null;

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Müraciət göndərildi!</h3>
          <p className="text-gray-600">Tezliklə sizinlə əlaqə saxlayacağıq.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">{t('driverForm.title')}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('driverForm.fullName')} *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              />
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('driverForm.mobileNumber')} *
              </label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('driverForm.hasOwnCar')} *
              </label>
              <select
                name="hasOwnCar"
                value={formData.hasOwnCar}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              >
                <option value="">{t('driverForm.selectOption')}</option>
                <option value="yes">{t('driverForm.yes')}</option>
                <option value="no">{t('driverForm.no')}</option>
              </select>
            </div>

            {formData.hasOwnCar === 'yes' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('driverForm.carModel')} *
                  </label>
                  <input
                    type="text"
                    name="carModel"
                    value={formData.carModel}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Toyota Camry"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('driverForm.carYear')} *
                  </label>
                  <input
                    type="number"
                    name="carYear"
                    value={formData.carYear}
                    onChange={handleInputChange}
                    required
                    min="2000"
                    max="2024"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  />
                </div>
              </div>
            )}

            {formData.hasOwnCar === 'no' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t('driverForm.workPreferences')} *
                </label>
                <div className="space-y-3">
                  {['rent', 'salary-based', 'percent-based'].map((preference) => (
                    <label key={preference} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.workPreferences.includes(preference)}
                        onChange={() => handleWorkPreferenceChange(preference)}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700 capitalize">
                        {t(`driverForm.${preference.replace(/-(\w)/g, (match, p1) => p1.toUpperCase())}`)}
                      </span>
                    </label>
                  ))}
                </div>
                {formData.workPreferences.length === 0 && (
                  <p className="text-sm text-red-600 mt-1">{t('driverForm.selectAtLeastOne')}</p>
                )}
              </div>
            )}

          </div>

          <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={formData.hasOwnCar === 'no' && formData.workPreferences.length === 0}
              className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                formData.hasOwnCar === 'no' && formData.workPreferences.length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {t('driverForm.submitApplication')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DriverSignupForm;