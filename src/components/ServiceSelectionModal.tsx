import React from 'react';
import { X, Car, Package, Building } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ServiceSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDriverClick: () => void;
  onDeliveryClick: () => void;
  onEntrepreneurClick: () => void;
}

const ServiceSelectionModal: React.FC<ServiceSelectionModalProps> = ({
  isOpen,
  onClose,
  onDriverClick,
  onDeliveryClick,
  onEntrepreneurClick
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const handleServiceClick = (callback: () => void) => {
    onClose();
    callback();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">{t('serviceSelection.title')}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <p className="text-gray-600 mt-2">{t('serviceSelection.subtitle')}</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => handleServiceClick(onDriverClick)}
              className="p-6 border-2 border-gray-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition-all duration-200 text-center group"
            >
              <Car className="w-12 h-12 mx-auto mb-4 text-gray-400 group-hover:text-red-600 transition-colors" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('serviceSelection.taxiDriver')}
              </h3>
              <p className="text-sm text-gray-600">
                {t('serviceSelection.taxiDriverDesc')}
              </p>
            </button>

            <button
              onClick={() => handleServiceClick(onDeliveryClick)}
              className="p-6 border-2 border-gray-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition-all duration-200 text-center group"
            >
              <Package className="w-12 h-12 mx-auto mb-4 text-gray-400 group-hover:text-red-600 transition-colors" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('serviceSelection.delivery')}
              </h3>
              <p className="text-sm text-gray-600">
                {t('serviceSelection.deliveryDesc')}
              </p>
            </button>

            <button
              onClick={() => handleServiceClick(onEntrepreneurClick)}
              className="p-6 border-2 border-gray-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition-all duration-200 text-center group"
            >
              <Building className="w-12 h-12 mx-auto mb-4 text-gray-400 group-hover:text-red-600 transition-colors" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('serviceSelection.entrepreneur')}
              </h3>
              <p className="text-sm text-gray-600">
                {t('serviceSelection.entrepreneurDesc')}
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSelectionModal;