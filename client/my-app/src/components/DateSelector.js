import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateSelector() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="date-selector-container">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={30}
        dateFormat="yyyy-MM-dd hh:mmaa"
        placeholderText="Select date and time"
        className="custom-datepicker" // Apply custom class for styling
      />
    </div>
  );
}

export default DateSelector;
