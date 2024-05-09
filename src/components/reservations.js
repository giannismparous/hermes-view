import React, { useEffect, useRef, useState } from 'react';
import '../styles/Reservations.css';
import { addNewMenuItem, addNewReservation, addNewTable, cancelReservationByTableNumber, completeReservationByTableNumber, dateExists, fetchDateInfo, fetchInfo, updateReservation, updateRestaurantInfo, updateUnavailableDays, updateUnavailableTables} from './firebase.utils';
import { ClockLoader } from 'react-spinners';
import CalendarYearly from './CalendarYearly';
import { Link } from 'react-router-dom';
import DropdownMenu from './DropdownMenu'


const Reservations = () => {
    // Add your component logic here

    return (
        <div className='reservations-page'>
            {/* Add your JSX content here */}
        </div>
    );
}

export default Reservations;