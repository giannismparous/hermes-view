import React, { useEffect, useState } from 'react';
import '../styles/Reservations.css';
import { cancelReservationByTableNumber, fetchSchedulesTimes, fetchTables, fetchTimeByIndex } from './firebase.utils';
import { HashLoader } from 'react-spinners';
const sortByImg = '../icons/sort_by.png';

const Reservations = () => {

    const [tables, setTables] = useState([]);
    const [filteredTables, setFilteredTables] = useState([]);
    const [expandedTables, setExpandedTables] = useState([]);
    const [timesReservations, setTimesReservations] = useState([]);
    const [filteredTimesReservations, setFilteredTimesReservations] = useState([]);
    const [expandedTimesReservations, setExpandedTimesReservations] = useState([]);
    const [times, setTimes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortByMenuOpen, setSortByMenuOpen] = useState(false);
    const [selectedSortOption, setSelectedSortOption] = useState(1);

    useEffect(() => {
        const fetchSchedules = async () => {
            const schedules = await fetchSchedulesTimes();
            setTimes(schedules);
        };
    
        fetchSchedules();
    }, []);

    useEffect(() => {
        const getTimeByIndex = (index) => {
            const foundTime = times.find(time => parseInt(time.id) === index);
            if (foundTime) {
                return foundTime.time;
            }
        };

        const fetchTablesData = async () => {

            const tablesReservationsData = [];
            for (let i = 1; i <= 10; i++) {
                const data = await fetchTables(i);
                tablesReservationsData.push(data);
            }
            for (let i = 0; i < tablesReservationsData.length; i++) {
                for (let j = 0; j < tablesReservationsData[i].reservations.length; j++) {
                    if (tablesReservationsData[i].reservations[j].endIndex !== undefined) {
                        const tempStartTime = getTimeByIndex(tablesReservationsData[i].reservations[j].startIndex);
                        const tempEndTime = getTimeByIndex(tablesReservationsData[i].reservations[j].endIndex);
                        tablesReservationsData[i].reservations[j].startTime = tempStartTime;
                        tablesReservationsData[i].reservations[j].endTime = tempEndTime;
                    }
                }
            }
            setTables(tablesReservationsData);
            setFilteredTables(tablesReservationsData);
            
           const timesReservationsData=[];
            for (let i=0;i<times.length;i++){
                let reservations=[];
                for (let j=0;j<tablesReservationsData.length;j++){
                    for (let k=0;k<tablesReservationsData[j].reservations.length;k++){
                        if (times[i].id===tablesReservationsData[j].reservations[k].startIndex){
                            let reservation={};
                            reservation.tableId=tablesReservationsData[j].id;
                            reservation.endTime=tablesReservationsData[j].reservations[k].endTime;
                            reservation.name=tablesReservationsData[j].reservations[k].name;
                            reservation.phone=tablesReservationsData[j].reservations[k].phone;
                            reservation.reservationId=tablesReservationsData[j].reservations[k].reservation_id;
                            reservation.canceled=tablesReservationsData[j].reservations[k].canceled;
                            reservations.push(reservation);
                        }
                    }
                }
                timesReservationsData.push({time:times[i].time,timeId:times[i].id,reservations});
            }

            console.log(timesReservationsData);
            setTimesReservations(timesReservationsData);
            setFilteredTimesReservations(timesReservationsData);

            setLoading(false);
        };
    
        if (times.length > 0) {
            fetchTablesData();
        }
    }, [times]);

    useEffect(() => {
        setExpandedTables(Array(tables.length + 1).fill(false));
    }, [tables]);

    useEffect(() => {
        setExpandedTimesReservations(Array(timesReservations.length + 1).fill(false));
    }, [timesReservations]);

    const handleCancelReservation = async (reservationId, tableNumber) => {
        await cancelReservationByTableNumber(reservationId, tableNumber);
        window.location.reload();
    };

    const toggleReservationDetailsByTable = (tableId) => {
        setExpandedTables(prevExpandedTables => {
            return prevExpandedTables.map((value, index) => {
                return index === tableId ? !value : value;
            });
        });
    };

    const toggleReservationDetailsByTime = (timeId) => {
        setExpandedTimesReservations(prevExpandedTimesReservations => {
            return prevExpandedTimesReservations.map((value, index) => {
                return index === timeId ? !value : value;
            });
        });
    };

    const handleClearSearch = () => {
        setSearchQuery('');
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
        if (selectedSortOption==1)filterTables(event.target.value);
        else if (selectedSortOption==2)filterTimesReservations(event.target.value);
    };

    const filterTables = (query) => {
        const filtered = tables.filter(table => (`Table ${table.id}`).toLowerCase().includes(query.toLowerCase()));
        setFilteredTables(filtered);
    };

    const filterTimesReservations = (query) => {
        const filtered = timesReservations.filter(time => (`Time ${time.time}`).toLowerCase().includes(query.toLowerCase()));
        setFilteredTimesReservations(filtered);
    };

    const handleSortByClick = () => {
        setSortByMenuOpen(!sortByMenuOpen);
    };

    const handleSortOptionSelect = (option) => {
        setSelectedSortOption(option);
        setSortByMenuOpen(false);
    };

    return (
        <div className="reservations-container">
            <div className="search-bar-container">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        className="search-input"
                    />
                    {searchQuery && (
                        <button className="clear-button" onClick={handleClearSearch}>
                            &#10006;
                        </button>
                    )}
                    <button className="sort-button" onClick={handleSortByClick}>
                        <img src={sortByImg} alt="Sort Icon" width="25px"/>
                    </button>
                    {sortByMenuOpen && (
                        <div className="sort-menu">
                            <div className="sort-option" onClick={() => handleSortOptionSelect(1)}>Sort by Table</div>
                            <div className="sort-option" onClick={() => handleSortOptionSelect(2)}>Sort by Time</div>
                            <div className="sort-option" onClick={() => handleSortOptionSelect(3)}>Sort by Name</div>
                            <div className="sort-option" onClick={() => handleSortOptionSelect(4)}>Sort by ID</div>
                        </div>
                    )}
                </div>
            </div>
            {loading ? (
                <div className="loading-spinner">
                    <HashLoader type="Grid" color="#8a5a00" size={80}/>
                </div>
            ) : (
                <div className="reservations">
                    {selectedSortOption === 1 && filteredTables.map((table, index) => (
                        table.reservations.length !== 0 && (
                            <div key={index} className="reservation">
                                <div className="table-header">
                                    <h2>Table {table.id}</h2>
                                    <button className="toggle-button" onClick={() => toggleReservationDetailsByTable(table.id)}>
                                        {expandedTables[table.id] ? '-' : '+'}
                                    </button>
                                </div>
                                {expandedTables[table.id] && (
                                    <div className="reservation-details-container">
                                        {table.reservations.map((reservation, idx) => (
                                            <div key={idx} className="reservation-details">
                                                <p><span>Start Time:</span> {reservation.startTime}</p>
                                                <p><span>End Time:</span> {reservation.endTime}</p>
                                                <p><span>Name:</span> {reservation.name}</p>
                                                <p><span>Phone:</span> {reservation.phone}</p>
                                                <p><span>ID:</span> {reservation.reservation_id}</p>
                                                {reservation.canceled !== undefined ? (
                                                    <p key={idx}>
                                                        <span>Canceled:</span> {reservation.canceled.toString()}
                                                    </p>
                                                ) : (
                                                    <button className="cancel-button" style={{ color: 'red' }} onClick={() => handleCancelReservation(reservation.reservation_id, table.id)}>Cancel</button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    ))}
                    {selectedSortOption === 2 && filteredTimesReservations.map((time, index) => (
                        time.reservations.length !== 0 && (
                            <div key={index} className="reservation">
                                <div className="table-header">
                                    <h2>Time {time.time}</h2>
                                    <button className="toggle-button" onClick={() => toggleReservationDetailsByTime(time.timeId)}>
                                        {expandedTimesReservations[time.timeId] ? '-' : '+'}
                                    </button>
                                </div>
                                {expandedTimesReservations[time.timeId] && (
                                    <div className="reservation-details-container">
                                        {time.reservations.map((reservation, idx) => (
                                            <div key={idx} className="reservation-details">
                                                <p><span>End Time:</span> {reservation.endTime}</p>
                                                <p><span>Name:</span> {reservation.name}</p>
                                                <p><span>Phone:</span> {reservation.phone}</p>
                                                <p><span>ID:</span> {reservation.reservation_id}</p>
                                                <p><span>ID:</span> {reservation.timeId}</p>
                                                {reservation.canceled !== undefined ? (
                                                    <p key={idx}>
                                                        <span>Canceled:</span> {reservation.canceled.toString()}
                                                    </p>
                                                ) : (
                                                    <button className="cancel-button" style={{ color: 'red' }} onClick={() => handleCancelReservation(reservation.reservation_id, time.tableId)}>Cancel</button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    ))}
                </div>
            )}
        </div>
    );
};

export default Reservations;
