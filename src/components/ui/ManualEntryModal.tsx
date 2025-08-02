import React, { useState } from 'react';
import { X, Save, AlertCircle, User, Clock } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { DateTimePicker } from './DateTimePickerForm';

interface ManualEntryField {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'textarea' | 'datetime-local';
  required: boolean;
  options?: string[];
  placeholder?: string;
  validation?: (value: string) => string | null;
}

interface ManualEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields: ManualEntryField[];
  onSubmit: (data: Record<string, any>) => void;
  moduleType: string;
}

const ManualEntryModal: React.FC<ManualEntryModalProps> = ({
  isOpen,
  onClose,
  title,
  fields,
  onSubmit,
  moduleType
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showSuccess, showError } = useToast();

  if (!isOpen) return null;

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    fields.forEach(field => {
      const value = formData[field.key];
      
      // Required field validation
      if (field.required && (!value || value.toString().trim() === '')) {
        newErrors[field.key] = `${field.label} is required`;
        return;
      }

      // Custom validation
      if (field.validation && value) {
        const validationError = field.validation(value.toString());
        if (validationError) {
          newErrors[field.key] = validationError;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showError('Validation Error', 'Please correct the errors before submitting');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Add metadata for manual entries
      const entryData = {
        ...formData,
        entryType: 'manual',
        operatorId: 'PORT_CONTROLLER_001', // In real app, get from auth context
        operatorName: 'Port Controller',
        timestamp: new Date().toISOString(),
        moduleType,
        manualEntryReason: formData.manualEntryReason || 'Automation failure - manual intervention required'
      };

      await onSubmit(entryData);
      showSuccess('Manual Entry Created', `${title} has been successfully added to the audit log`);
      onClose();
      setFormData({});
      setErrors({});
    } catch (error) {
      showError('Submission Error', 'Failed to create manual audit entry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: ManualEntryField) => {
    const value = formData[field.key] || '';
    const hasError = !!errors[field.key];

    switch (field.type) {
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              hasError ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            rows={3}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
              hasError ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        );

      case 'datetime-local':
        return (
          <DateTimePicker
            value={value}
            onChange={(date) => handleInputChange(field.key, date)}
            label={field.label}
            placeholder={field.placeholder || 'Select date and time'}
            required={field.required}
          />
        );

      default:
        return (
          <input
            type={field.type}
            value={value}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              hasError ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-8">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
        
        <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl border border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-500">Manual audit log entry</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Alert Banner */}
          <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-orange-800">Manual Entry Required</p>
                <p className="text-xs text-orange-700 mt-1">
                  This entry will be marked as manually created and will include operator identification and timestamp.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map((field) => (
                <div key={field.key} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {renderField(field)}
                  {errors[field.key] && (
                    <p className="text-red-500 text-xs mt-1">{errors[field.key]}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Reason for Manual Entry */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason for Manual Entry
              </label>
              <textarea
                value={formData.manualEntryReason || ''}
                onChange={(e) => handleInputChange('manualEntryReason', e.target.value)}
                placeholder="Explain why this entry is being created manually (e.g., system failure, missed automation, data correction)"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Operator Info Display */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Entry Metadata</h4>
              <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Operator: Port Controller</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Time: {new Date().toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSubmitting ? 'Creating...' : 'Create Entry'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManualEntryModal;