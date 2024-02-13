import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Reservations.css'; // Import your CSS file
import { fetchReservationsData } from './firebase.utils'; // Assuming fetchReservationsData function is correctly implemented
import { HashLoader } from 'react-spinners';

const Reservations = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const { tableNumber } = useParams();

    useEffect(() => {
        const fetchReservationDataForTables = async () => {
            const reservationsData = [];
            for (let i = 1; i <= 10; i++) {
                const data = await fetchReservationsData(i);
                reservationsData.push(data);
            }
            setReservations(reservationsData);
            setLoading(false);
        };

        if (loading) {
            fetchReservationDataForTables();
        }
    }, [loading]);

    return (
        <div className="reservations-container">
            {loading ? (
                <div className="loading-spinner">
                    <HashLoader color={'#8a5a00;'} loading={loading} size={50} />
                </div>
            ) : (
                <div className="reservations">
                    {reservations.map((reservation, index) => (
                        <div key={index} className="reservation">
                            <h2>{reservation.title}</h2>
                            {reservation.schedules.map((schedule, idx) => (
                                schedule.name !== null && <p key={idx}>{schedule.time}, {schedule.name}</p>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Reservations;
