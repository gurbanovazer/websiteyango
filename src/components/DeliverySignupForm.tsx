import React, { useState } from 'react';
import { X, Car, Bike } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supabase, type DeliveryApplication } from '../lib/supabase';

interface DeliverySignupFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeliverySignupForm: React.FC<DeliverySignupFormProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [vehicleType, setVehicleType] = useState<'car' | 'bike' | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    dateOfBirth: '',
    
    // Driver Information
    licenseNumber: '',
    licenseState: '',
    licenseExpiry: '',
    
    // Vehicle Information (for car)
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    vehicleColor: '',
    licensePlate: '',
    
    // Bike Information
    bikeMake: '',
    bikeModel: '',
    bikeYear: '',
    bikeColor: '',
    bikeLicensePlate: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmitToSupabase();
    }
  };

  const handleSubmitToSupabase = async () => {
    if (!vehicleType) {
      alert('Пожалуйста, выберите тип транспорта');
      return;
    }

    try {
      const applicationData: DeliveryApplication = {
        vehicle_type: vehicleType,
        full_name: formData.fullName,
        email: '', // Empty email as it's no longer collected
        phone: formData.phone,
        date_of_birth: formData.dateOfBirth
      };

      const { error } = await supabase
        .from('delivery_applications')
        .insert([applicationData]);

      if (error) {
        console.error('Error submitting delivery application:', error);
        alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.');
        return;
      }

      setIsSubmitted(true);
      
      // Auto close after 3 seconds
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setCurrentStep(1);
        setVehicleType(null);
        setFormData({
          fullName: '',
          phone: '',
          dateOfBirth: '',
          licenseNumber: '',
          licenseState: '',
          licenseExpiry: '',
          vehicleMake: '',
          vehicleModel: '',
          vehicleYear: '',
          vehicleColor: '',
          licensePlate: '',
          bikeMake: '',
          bikeModel: '',
          bikeYear: '',
          bikeColor: '',
          bikeLicensePlate: ''
        });
      }, 3000);
    } catch (error) {
      console.error('Error submitting delivery application:', error);
      alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.');
    }
  };

  const steps = [
    t('deliveryForm.vehicleType'),
    t('deliveryForm.personalInfo')
  ];

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
            <h2 className="text-2xl font-bold text-gray-900">{t('deliveryForm.title')}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`text-sm font-medium ${
                    index + 1 <= currentStep ? 'text-red-600' : 'text-gray-400'
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">{t('deliveryForm.vehicleType')}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  type="button"
                  onClick={() => setVehicleType('car')}
                  className={`p-6 border-2 rounded-lg transition-all duration-200 ${
                    vehicleType === 'car'
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300 hover:border-red-300'
                  }`}
                >
                  <Car className={`w-12 h-12 mx-auto mb-4 ${
                    vehicleType === 'car' ? 'text-red-600' : 'text-gray-400'
                  }`} />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Car Delivery</h4>
                  <p className="text-sm text-gray-600">
                    {t('deliveryForm.carDeliveryDesc')}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setVehicleType('bike')}
                  className={`p-6 border-2 rounded-lg transition-all duration-200 ${
                    vehicleType === 'bike'
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300 hover:border-red-300'
                  }`}
                >
                  <Bike className={`w-12 h-12 mx-auto mb-4 ${
                    vehicleType === 'bike' ? 'text-red-600' : 'text-gray-400'
                  }`} />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Bike Delivery</h4>
                  <p className="text-sm text-gray-600">
                    {t('deliveryForm.bikeDeliveryDesc')}
                  </p>
                </button>
              </div>

              {vehicleType && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">
                    {t(`deliveryForm.${vehicleType}Benefits`)}:
                  </h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    {vehicleType === 'car' ? (
                      <>
                        <li>• {t('deliveryForm.carBenefit1')}</li>
                        <li>• {t('deliveryForm.carBenefit2')}</li>
                        <li>• {t('deliveryForm.carBenefit3')}</li>
                        <li>• {t('deliveryForm.carBenefit4')}</li>
                      </>
                    ) : (
                      <>
                        <li>• {t('deliveryForm.bikeBenefit1')}</li>
                        <li>• {t('deliveryForm.bikeBenefit2')}</li>
                        <li>• {t('deliveryForm.bikeBenefit3')}</li>
                        <li>• {t('deliveryForm.bikeBenefit4')}</li>
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">{t('deliveryForm.personalInfo')}</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('deliveryForm.fullName')} *
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('deliveryForm.phone')} *
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
                    {t('deliveryForm.dateOfBirth')} *
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {t('deliveryForm.previous')}
            </button>
            
            <button
              type="submit"
              disabled={currentStep === 1 && !vehicleType}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                currentStep === 1 && !vehicleType
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {currentStep === 2 ? t('deliveryForm.submitApplication') : t('deliveryForm.next')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeliverySignupForm;