import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Reservations.css'; // Import your CSS file
import { fetchSchedulesTimes, fetchTables, fetchTimeByIndex } from './firebase.utils'; // Assuming fetchReservationsData function is correctly implemented
import { HashLoader } from 'react-spinners';

const Reservations = () => {
    const [tables, setTables] = useState([]);
    const [times, setTimes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { tableNumber } = useParams();

    

    useEffect(() => {
        const fetchSchedules = async () => {
            const schedules = await fetchSchedulesTimes(); // Fetch schedules times
            setTimes(schedules); // Save schedules times in state
        };
    
        fetchSchedules(); // Call the fetchSchedules function
    }, []); // Empty dependency array ensures the effect runs only once after the initial render

    useEffect(() => {

        const getTimeByIndex = (index) => {
            const foundTime = times.find(time => parseInt(time.id) === index);
            if (foundTime) {
                return foundTime.time;
            }
        };

        const fetchTablesData = async () => {
            const reservationsData = [];
            for (let i = 1; i <= 10; i++) {
                const data = await fetchTables(i);
                reservationsData.push(data);
            }
            for (let i = 0; i < reservationsData.length; i++) {
                for (let j = 0; j < reservationsData[i].reservations.length; j++) {
                    if (reservationsData[i].reservations[j].endIndex !== undefined) {
                        const tempStartTime = getTimeByIndex(reservationsData[i].reservations[j].startIndex);
                        const tempEndTime = getTimeByIndex(reservationsData[i].reservations[j].endIndex);
                        reservationsData[i].reservations[j].startTime = tempStartTime;
                        reservationsData[i].reservations[j].endTime = tempEndTime;
                    }
                }
            }
            setTables(reservationsData);
            setLoading(false);
        };
    
        if (times.length > 0) {
            fetchTablesData();
        }
    }, [times]);

    return (
        <div className="reservations-container">
            {loading ? (
                <div className="loading-spinner">
                    <HashLoader color={'#8a5a00;'} loading={loading} size={50} />
                </div>
            ) : (
                <div className="reservations">
                    {tables.map((table, index) => (
                        <div key={index} className="reservation">
                            <h2>Table {table.id}</h2>
                            {table.reservations.map((reservation, idx) => (
                                <p key={idx}>{reservation.startTime}-{reservation.endTime}, {reservation.name}</p>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Reservations;
