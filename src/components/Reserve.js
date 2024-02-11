import React, { useEffect, useState } from 'react';
import { fetchTablesAvailability, fetchTablesData } from './firebase.utils';
import '../styles/Reserve.css'; // Import CSS file for styling

const maxIndexForward = 6;

const Reserve = () => {
  const [tables, setTables] = useState([]);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [maxIndex, setMaxIndex] = useState(null);
  const [choosingReservationDate, setChoosingReservationDate] = useState(false);
  const [choseReservationDate, setChoseReservationDate] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchTables = async () => {
      const tablesData = await fetchTablesData();
      setTables(tablesData);
    };

    fetchTables();
  }, []);

  const handleButtonClick = (index) => {
    if (choosingReservationDate) {
      if (index < clickedIndex || index > maxIndex) {
        setChoosingReservationDate(!choosingReservationDate);
      } else {
        setMaxIndex(index);
        setChoseReservationDate(true);
        setShowConfirmation(true); // Show confirmation popup
      }
    } else {
      if (tables[index].name !== null) {
        alert("Can't book this date");
        return;
      }
      let num = 0;
      for (let i = index + 1; i < index + maxIndexForward; i++) {
        const table = tables[i];
        if (table.name === null) {
          num = num + 1;
        } else {
          break; // Exit the loop if table.name is not null
        }
      }
      setClickedIndex(index);
      setMaxIndex(index + num);
      setChoosingReservationDate(!choosingReservationDate);
    }
  };

  const handleConfirmation = (confirmed) => {
    if (confirmed) {
      // Perform booking action
      // For now, let's just display a confirmation message
      alert('Booking confirmed!');
    }
    // Reset states
    setChoseReservationDate(false);
    setShowConfirmation(false);
  };

  const handleClick = async () => {
    try {
        // Fetch tables availability
        const availableTables = await fetchTablesAvailability(0, 2);

        // Check if availableTables is received
        if (availableTables !== undefined && availableTables !== null) {
            // If availableTables is received, construct the message and send it
            const data = {
                eventName: 'ReservationTimeSelected',
                greenTables: availableTables
            };
            window.parent.postMessage(data, '*');
        } else {
            // If availableTables is not received, handle the error or simply return
            console.error('Failed to fetch tables availability.');
            // You can also throw an error here if you want to handle it in the caller function
            // throw new Error('Failed to fetch tables availability.');
        }
    } catch (error) {
        console.error('Error fetching tables availability:', error);
        // You can handle the error further if needed
    }
};

  return (
    <div>
      <h1>Reserve Page</h1>
      <div className="calendar-buttons">
        {tables.map((table, index) => (
          <button
            key={table.id}
            className={`
              ${table.name === null ? 'calendar-button-green' : 'calendar-button-red'}
              ${choosingReservationDate && clickedIndex !== null && (index < clickedIndex || index > maxIndex) && 'grayed-out'}
            `}
            onClick={() => handleButtonClick(index)}
          >
            {table.time}
          </button>
        ))}
      </div>
      {showConfirmation && (
        <div className="confirmation-popup">
          <p>Are you sure you want to book?</p>
          <div>
            <button onClick={() => handleConfirmation(true)}>Yes</button>
            <button onClick={() => handleConfirmation(false)}>No</button>
          </div>
        </div>
      )}
      <button onClick={handleClick}>Check Tables</button>
    </div>
  );
};

export default Reserve;
