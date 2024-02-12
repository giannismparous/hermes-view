import React, { useEffect, useState } from 'react';
import { fetchTablesAvailability, fetchTablesData } from './firebase.utils';
import '../styles/Reserve.css'; // Import CSS file for styling
import { HashLoader } from 'react-spinners';

const maxIndexForward = 6;

const Reserve = () => {
  const [tables, setTables] = useState([]);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [maxIndex, setMaxIndex] = useState(null);
  const [choosingReservationDate, setChoosingReservationDate] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [tablesFetched, setTablesFetched] = useState(false); // State to track whether tables are fetched

  useEffect(() => {
    const fetchTables = async () => {
      const tablesData = await fetchTablesData();
      setTables(tablesData);
      setTablesFetched(true);
    };

    fetchTables();
  }, []);

  const handleButtonClick = (index) => {
    if (choosingReservationDate) {
      if (index < clickedIndex || index > maxIndex) {
        setChoosingReservationDate(!choosingReservationDate);
      } else {
        setMaxIndex(index);
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
      handleTablesFetch();
    }
    else {
      setChoosingReservationDate(false);
    }
    setShowConfirmation(false);
  };

  const handleTablesFetch = async () => {
    fetchTablesAvailability(clickedIndex, maxIndex)
      .then(inavailableTables => {
        const data = {
          eventName: 'ReservationTimeSelected',
          redTables: inavailableTables,
          startIndex: clickedIndex,
          endIndex: maxIndex
        };
        console.log(inavailableTables);
        window.parent.postMessage(data, '*');
      })
      .catch(error => {
        console.error('Error fetching tables availability:', error);
        // Handle error if needed
      });
  };

  return (
    <div>
      {!tablesFetched && (
        <div className="loading-overlay">
          <div className="loader-container">
            <HashLoader type="Grid" color="#8a5a00" size={80}/>
          </div>
        </div>
      )}
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
          <p>Are you sure you want to look for tables for these dates?</p>
          <div>
            <button onClick={() => handleConfirmation(true)} disabled>Yes</button>
            <button onClick={() => handleConfirmation(false)} disabled>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reserve;
