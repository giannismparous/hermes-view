import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ReserveTable.css'; // Import your CSS file
import { fetchReservationTimes, getCurrentDate, updateTableSchedules } from './firebase.utils';
import { ClockLoader } from 'react-spinners';

const ReserveTable = () => {

    const {restaurantName, startScheduleIndex, endScheduleIndex, tableNumber } = useParams();
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [reservationTimesFetched, setReservationTimesFetched] = useState();
    const [bookedReservation, setBookedReservation] = useState();
    const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {

                const times = await fetchReservationTimes(startScheduleIndex, endScheduleIndex, tableNumber);
                setStartTime(times[0]);
                setEndTime(times[1]);
                setReservationTimesFetched(true);

            } catch (error) {

                console.error('Error fetching reservation times:', error);
                
            }
        };

        fetchData(); // Fetch reservation times when component mounts
    }, [startScheduleIndex, endScheduleIndex, tableNumber]); // Run effect when these parameters change

    const handleYesClick = async () => {
        try {
            // Call updateTableSchedule with the appropriate parameters
            await updateTableSchedules(parseInt(startScheduleIndex), parseInt(endScheduleIndex), userName,userPhone, tableNumber,getCurrentDate());
            // Optionally, you can redirect the user to a confirmation page or do other actions upon successful reservation
            console.log('Table reserved successfully!');
            setBookedReservation(true);
        } catch (error) {
            console.error('Error reserving table:', error);
            // Handle error here
        }
    };

    const handleNoClick = () => {
        const data = {
            eventName: 'BookingReservationDeclined',
          };
          window.parent.postMessage(data, '*');
    };

    const handleNameChange = (event) => {
        setUserName(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setUserPhone(event.target.value);
    };
    
    return (
        <div className="reservation-container">
            <meta name="description" content="Reserve a table now."/>
            <meta name='robots' content='noindex'/>
            <div className=".reservation-details-reserve-table">
                {!reservationTimesFetched && !bookedReservation && <ClockLoader type="Grid" color="#007bff" size={80}/>}
                {reservationTimesFetched && !bookedReservation && (
                    <>
                        <h2>Reservation Details</h2>
                        <p>Restaurant Name: {restaurantName}</p>
                        <p>Reservation Time: {`${startTime} - ${endTime}`}</p>
                        <p>Table Number: {tableNumber}</p>
                        <p>
                            <label htmlFor="userName">Full Name:</label>
                            <input type="text" id="userName" value={userName} onChange={handleNameChange} />
                        </p>
                        <p>
                            <label htmlFor="userPhone">Phone Number:</label>
                            <input type="text" id="userPhone" value={userPhone} onChange={handlePhoneChange} />
                        </p>
                        <p className="confirmation-text">Are you sure you want to reserve?</p>
                        <div className="button-container">
                            <button className="yes-button" onClick={handleYesClick} disabled={userName.trim() === "" || userPhone.trim() === ""}>Yes</button>
                            <button className="no-button" onClick={handleNoClick}>No</button>
                        </div>
                    </>
                )}
                {bookedReservation && <p>Thank you for booking!</p>}
            </div>
        </div>
    );
    };

export default ReserveTable;