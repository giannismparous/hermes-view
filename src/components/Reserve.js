import React, { useEffect, useState } from 'react';
import {fetchDatesAvailability, fetchSchedulesTimes, fetchTablesAvailability, getCurrentDate, getDateRange } from './firebase.utils';
import '../styles/Reserve.css'; // Import CSS file for styling
import { HashLoader } from 'react-spinners';
import { Helmet } from 'react-helmet-async';

const maxIndexForward = 6;

const Reserve = () => {
  const [dates,setDates] = useState([]);
  const [times, setTimes] = useState([]);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [maxIndex, setMaxIndex] = useState(null);
  const [choosingReservationDate, setChoosingReservationDate] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedDate, setSelectedDate] = useState(false);
  const [dateSelected, setDateSelected] = useState("");
  const [datesFetched, setDatesFetched] = useState(false);
  const [timesFetched, setTimesFetched] = useState(false); 

  useEffect(() => {
    const handleFetchDatesAvailability = async (date, num) => {
      try {
        const tempDates = getDateRange(num).map(date => ({ date }));
        const datesAvailability = await fetchDatesAvailability(date, num);
        const updatedDates = tempDates.map((tempDate, index) => ({
          ...tempDate,
          unavailable: !datesAvailability[index]
        }));
        console.log(updatedDates);
        setDates(updatedDates);
        setDatesFetched(true);
      } catch (error) {
        console.error('Error fetching dates availability:', error);
      }
    };

    const tempDates = getDateRange(10).map(date => ({ date }));
    handleFetchDatesAvailability(tempDates[0].date,tempDates.length);
  }, []);

  useEffect(() => {
    if (dateSelected) {
      const handleFetchTimes = async () => {
        const fetchedTimes = await fetchSchedulesTimes(dateSelected);
        setTimes(fetchedTimes);
        setTimesFetched(true);
      };
  
      handleFetchTimes();
    }
  }, [dateSelected]);

  const handleButtonClickDate = (index) => {
    setDateSelected(dates[index].date);
    setSelectedDate(true);
  };
  

  const handleButtonClickTime = (index) => {
    if (choosingReservationDate) {
      if (index < clickedIndex || index > maxIndex) {
        setChoosingReservationDate(!choosingReservationDate);
      } else {
        setMaxIndex(index);
        setShowConfirmation(true); // Show confirmation popup
      }
    } else {
      if (times[index].unavailable === true) {
        alert("Can't book this date");
        return;
      }
      let num = 0;
      for (let i = index + 1; i < index + maxIndexForward; i++) {
        const time = times[i];
        if (time.unavailable === undefined) {
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
    fetchTablesAvailability(clickedIndex, maxIndex, getCurrentDate())
      .then(unavailableTables => {
        const data = {
          eventName: 'ReservationTimeSelected',
          redTables: unavailableTables,
          startIndex: clickedIndex,
          endIndex: maxIndex
        };
        console.log(unavailableTables);
        window.parent.postMessage(data, '*');
      })
      .catch(error => {
        console.error('Error fetching tables availability:', error);
        // Handle error if needed
      });
  };

  return (
    <div>
      <Helmet>
        <title>Home - HermesView</title>  
        <meta name="description" content="Make a reservation."/>
        <link rel="canonical" href="/reserve"/>
        <meta name='robots' content='noindex'/>
      </Helmet>
      {(!timesFetched && selectedDate) || (!datesFetched) && (
        <div className="loading-overlay">
          <div className="loader-container">
            <HashLoader type="Grid" color="#8a5a00" size={80}/>
          </div>
        </div>
      )}
      <div className="calendar-buttons">
        {!selectedDate && dates.map((date, index) => (
          <button
            key={index}
            className={`
              ${date.unavailable ? 'calendar-button-green' : 'calendar-button-red'}
              ${choosingReservationDate && clickedIndex !== null && (index < clickedIndex || index > maxIndex) && 'grayed-out'}
            `}
            onClick={() => handleButtonClickDate(index)}
          >
            {date.date}
          </button>
        ))}
        {selectedDate && times.map((time, index) => (
          <button
            key={time.id}
            className={`
              ${time.unavailable === undefined ? 'calendar-button-green' : 'calendar-button-red'}
              ${choosingReservationDate && clickedIndex !== null && (index < clickedIndex || index > maxIndex) && 'grayed-out'}
            `}
            onClick={() => handleButtonClickTime(index)}
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
