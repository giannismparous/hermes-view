import React, { useEffect, useState } from 'react';
import {fetchSchedulesTimes, fetchTablesAvailability } from './firebase.utils';
import '../styles/Reserve.css'; // Import CSS file for styling
import { HashLoader } from 'react-spinners';

const maxIndexForward = 6;

const Reserve = () => {
  const [times, setTimes] = useState([]);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [maxIndex, setMaxIndex] = useState(null);
  const [choosingReservationDate, setChoosingReservationDate] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [timesFetched, setTimesFetched] = useState(false); // State to track whether tables are fetched

  useEffect(() => {
    const handleFetchTimes = async () => {
      const fetchedTimes = await fetchSchedulesTimes();
      setTimes(fetchedTimes);
      setTimesFetched(true);
    };

    handleFetchTimes();
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
      if (times[index].inavailable === true) {
        alert("Can't book this date");
        return;
      }
      let num = 0;
      for (let i = index + 1; i < index + maxIndexForward; i++) {
        const time = times[i];
        if (time.inavailable === undefined) {
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
      {!timesFetched && (
        <div className="loading-overlay">
          <div className="loader-container">
            <HashLoader type="Grid" color="#8a5a00" size={80}/>
          </div>
        </div>
      )}
      <div className="calendar-buttons">
        {times.map((time, index) => (
          <button
            key={time.id}
            className={`
              ${time.inavailable === undefined ? 'calendar-button-green' : 'calendar-button-red'}
              ${choosingReservationDate && clickedIndex !== null && (index < clickedIndex || index > maxIndex) && 'grayed-out'}
            `}
            onClick={() => handleButtonClick(index)}
          >
            {time.time}
          </button>
        ))}
      </div>
      {showConfirmation && (
        <div className="confirmation-popup">
          <p>Are you sure you want to look for tables for these dates?</p>
          <div>
            <button onClick={() => handleConfirmation(true)}>Yes</button>
            <button onClick={() => handleConfirmation(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reserve;
