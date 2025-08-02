import React from 'react';
import DatePicker from 'react-datepicker';
import { Calendar, Clock } from 'lucide-react';
import 'react-datepicker/dist/react-datepicker.css';

interface DateTimePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  showTimeSelect?: boolean;
  timeFormat?: string;
  dateFormat?: string;
  className?: string;
  required?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  selected,
  onChange,
  placeholder = "Select date and time",
  showTimeSelect = true,
  timeFormat = "HH:mm",
  dateFormat = "dd/MM/yyyy HH:mm",
  className = "",
  required = false,
  minDate,
  maxDate,
  disabled = false
}) => {
  return (
    <div className={`relative ${className}`}>
      <DatePicker
        selected={selected}
        onChange={onChange}
        showTimeSelect={showTimeSelect}
        timeFormat={timeFormat}
        timeIntervals={15}
        dateFormat={dateFormat}
        placeholderText={placeholder}
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled}
        className={`w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
        }`}
        wrapperClassName="w-full"
        popperClassName="react-datepicker-popper"
        calendarClassName="react-datepicker-calendar"
        required={required}
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        {showTimeSelect ? (
          <Clock className="w-4 h-4 text-gray-400" />
        ) : (
          <Calendar className="w-4 h-4 text-gray-400" />
        )}
      </div>
    </div>
  );
};

export default DateTimePicker;