import React from 'react';
import '../styles/CalendarYearly.css'; // Import CSS file for styling
import Calendar from './Calendar';

const CalendarYearly = ({ onClose }) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate() - 1;

    return (
        <div className="calendar-yearly-container">
            <h2>{currentYear}</h2>
            <div className="calendar-yearly">
                {[...Array(12).keys()].map(monthIndex => (
                    <Calendar
                        key={monthIndex}
                        onClose={onClose}
                        month={monthIndex} // Pass month index as prop
                        year={currentYear} // Pass current year as prop
                        day={monthIndex === currentMonth ? currentDay : -1}
                    />
                ))}
            </div>
        </div>
    );
};

export default CalendarYearly;
