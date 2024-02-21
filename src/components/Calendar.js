import React, { useState } from 'react';
import '../styles/Calendar.css';

const Calendar = ({ onClose, month, year, day }) => {
    const handleDateSelect = (date) => {
        // onClose(); // Close the calendar after selecting a date
    };

    const generateDaysArray = () => {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    };

    const isCurrentDay = (currentDay) => {
        return currentDay === day;
    };

    const monthName = new Date(year, month).toLocaleDateString(undefined, { month: 'long' }); // Get the month name

    function chunkArray(array, chunkSize) {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    }

    return (
        <div className="calendar-container">
            <div className="calendar">
                <div className="calendar-header">
                    {monthName}
                </div>
                <table className="calendar-table">
                    <tbody>
                        {chunkArray(generateDaysArray(), 7).map((week, weekIndex) => (
                            <tr key={weekIndex}>
                                {week.map(day => (
                                    <td
                                        key={day}
                                        className={`day-box ${isCurrentDay(day) ? 'selected' : ''}`}
                                        onClick={() => handleDateSelect(new Date(year, month, day))}
                                    >
                                        {day}
                                    </td>
                                ))}
                                {/* Fill in empty cells if the week doesn't have 7 days */}
                                {week.length < 7 && (
                                    new Array(7 - week.length).fill(null).map((_, emptyIndex) => (
                                        <td key={`empty-${emptyIndex}`} className="empty-cell"></td>
                                    ))
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Calendar;
    