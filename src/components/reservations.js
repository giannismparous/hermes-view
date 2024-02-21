import React, { useEffect, useRef, useState } from 'react';
import '../styles/Reservations.css';
import { acceptReservationByTableNumber, cancelReservationByTableNumber, fetchReservations, fetchSchedulesTimes, fetchTable} from './firebase.utils';
import { HashLoader } from 'react-spinners';
import Calendar from './Calendar';
import Hamburger from 'hamburger-react';
import CalendarYearly from './CalendarYearly';
const sortByImg = '../icons/sort_by.png';
const calendarOpenImg = '../icons/calendar-open.png';
const calendarClosedImg = '../icons/calendar-closed.png';

const Reservations = () => {

    const [tablesReservations, setTablesReservations] = useState([]);
    const [filteredTablesReservations, setFilteredTablesReservations] = useState([]);
    const [expandedTablesReservations, setExpandedTablesReservations] = useState([]);
    const [timesReservations, setTimesReservations] = useState([]);
    const [filteredTimesReservations, setFilteredTimesReservations] = useState([]);
    const [expandedTimesReservations, setExpandedTimesReservations] = useState([]);
    const [namesReservations, setNamesReservations] = useState([]);
    const [filteredNamesReservations, setFilteredNamesReservations] = useState([]);
    const [expandedNamesReservations, setExpandedNamesReservations] = useState([]);
    const [idsReservations, setIdsReservations] = useState([]);
    const [filteredIdsReservations, setFilteredIdsReservations] = useState([]);
    const [expandedIdsReservations, setExpandedIdsReservations] = useState([]);
    const [times, setTimes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortByMenuOpen, setSortByMenuOpen] = useState(false);
    const [selectedSortOption, setSelectedSortOption] = useState(2);
    const [showCalendar, setShowCalendar] = useState(false);

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
                const data = await fetchTable(i);
                tablesReservationsData.push(data);
                tablesReservationsData[i-1].reservations=[];
            }

            const fetchedReservations=await fetchReservations();
            for (let i=0;i<fetchedReservations.length;i++){
                let index=fetchedReservations[i].table_id-1;
                const { table_id, ...reservationData } = fetchedReservations[i];
                reservationData.startTime=getTimeByIndex(reservationData.startIndex);
                reservationData.endTime=getTimeByIndex(reservationData.endIndex);
                tablesReservationsData[index].reservations.push(reservationData);
            }

            for (let i=0;i<tablesReservationsData.length;i++){
                tablesReservationsData[i].reservations.sort((a, b) => {
                    if (a.startIndex < b.startIndex) {
                        return -1;
                    } else if (a.startIndex > b.startIndex) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
            }
            
            setTablesReservations(tablesReservationsData);
            setFilteredTablesReservations(tablesReservationsData);
            
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
                            reservation.reservation_id=tablesReservationsData[j].reservations[k].reservation_id;
                            reservation.accepted=tablesReservationsData[j].reservations[k].accepted;
                            reservation.canceled=tablesReservationsData[j].reservations[k].canceled;
                            reservations.push(reservation);
                        }
                    }
                }
                reservations.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });
                timesReservationsData.push({time:times[i].time,timeId:times[i].id,reservations});
            }

            console.log(timesReservationsData);
            setTimesReservations(timesReservationsData);
            setFilteredTimesReservations(timesReservationsData);

            let reservations=[];
            let counter=1;
            for (let i = 0; i < tablesReservationsData.length; i++) {
                for (let j = 0; j < tablesReservationsData[i].reservations.length; j++) {
                    let reservation={}
                    reservation.startTime = getTimeByIndex(tablesReservationsData[i].reservations[j].startIndex);
                    reservation.endTime = getTimeByIndex(tablesReservationsData[i].reservations[j].endIndex);
                    reservation.tableId=tablesReservationsData[i].id;
                    reservation.name=tablesReservationsData[i].reservations[j].name;
                    reservation.phone=tablesReservationsData[i].reservations[j].phone;
                    reservation.reservation_id=tablesReservationsData[i].reservations[j].reservation_id;
                    reservation.accepted=tablesReservationsData[i].reservations[j].accepted;
                    reservation.canceled=tablesReservationsData[i].reservations[j].canceled;
                    reservation.id=counter;
                    reservations.push(reservation);
                    counter++;
                }
            }

            const namesSortedReservations = [...reservations].sort((a, b) => {
                if ((a.accepted===undefined && a.canceled===undefined) && (b.accepted!==undefined || b.canceled!==undefined)){return -1;}
                else if ((b.accepted===undefined && b.canceled===undefined) && (a.accepted!==undefined || a.canceled!==undefined)){return 1;}
                if ((a.accepted!==undefined) && (b.canceled!==undefined)){return -1;}
                else if ((b.accepted!==undefined) && (a.canceled!==undefined)){return 1;}
                if (a.canceled===undefined && b.canceled!==undefined){return -1;}
                else if (a.canceled!==undefined && b.canceled===undefined){return 1;}
                else {return a.name.localeCompare(b.name);}
                
            });

            setNamesReservations(namesSortedReservations);
            setFilteredNamesReservations(namesSortedReservations);
            
            const idsSortedReservations = [...reservations].sort((a, b) => {
                if (a.reservation_id < b.reservation_id) {
                    return -1; 
                } else if (a.reservation_id > b.reservation_id) {
                    return 1; 
                } else {
                    return 0; 
                }
            });

            setIdsReservations(idsSortedReservations);
            setFilteredIdsReservations(idsSortedReservations);

            setLoading(false);
        };
    
        if (times.length > 0) {
            fetchTablesData();
        }
    }, [times]);

    useEffect(() => {
        setExpandedTablesReservations(Array(tablesReservations.length + 1).fill(false));
    }, [tablesReservations]);

    useEffect(() => {
        setExpandedTimesReservations(Array(timesReservations.length + 1).fill(false));
    }, [timesReservations]);

    useEffect(() => {
        setExpandedNamesReservations(Array(namesReservations.length + 1).fill(false));
    }, [namesReservations]);

    useEffect(() => {
        setExpandedIdsReservations(Array(idsReservations.length + 1).fill(false));
    }, [idsReservations]);

    const handleAcceptReservation = async (reservationId) => {
        await acceptReservationByTableNumber(reservationId);
        window.location.reload();
    };

    const handleCancelReservation = async (reservationId, tableNumber) => {
        await cancelReservationByTableNumber(reservationId, tableNumber);
        window.location.reload();
    };

    const toggleReservationDetailsByTable = (tableId) => {
        setExpandedTablesReservations(prevexpandedTablesReservations => {
            return prevexpandedTablesReservations.map((value, index) => {
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

    const toggleReservationDetailsByName = (nameId) => {
        setExpandedNamesReservations(prevExpandedNamesReservations => {
            return prevExpandedNamesReservations.map((value, index) => {
                return index === nameId ? !value : value;
            });
        });
    };

    const toggleReservationDetailsByReservationId = (reservationId) => {
        setExpandedIdsReservations(prevExpandedIdsReservations => {
            return prevExpandedIdsReservations.map((value, index) => {
                return index === reservationId ? !value : value;
            });
        });
    };

    const handleClearSearch = () => {
        setSearchQuery('');
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
        if (selectedSortOption===1)filterTablesReservations(event.target.value);
        else if (selectedSortOption===2)filterTimesReservations(event.target.value);
        else if (selectedSortOption===3)filterNamesReservations(event.target.value);
        else if (selectedSortOption===4)filterIdsReservations(event.target.value);
    };

    const filterTablesReservations = (query) => {
        const filtered = tablesReservations.map(tableReservation => {
            const filteredTableReservation = { ...tableReservation };
            filteredTableReservation.reservations = tableReservation.reservations.filter(reservation => 
                reservation.name.toLowerCase().includes(query.toLowerCase())
            );
            return filteredTableReservation;
        });
        setFilteredTablesReservations(filtered);
    };

    const filterTimesReservations = (query) => {
        const filtered = timesReservations.map(timeReservation => {
            const filteredTimeReservation = { ...timeReservation };
            filteredTimeReservation.reservations = timeReservation.reservations.filter(reservation => 
                reservation.name.toLowerCase().includes(query.toLowerCase())
            );
            return filteredTimeReservation;
        });
        setFilteredTimesReservations(filtered);
    };
    

    const filterNamesReservations = (query) => {
        const filtered = namesReservations.filter(reservation => (`${reservation.name}`).toLowerCase().includes(query.toLowerCase()));
        setFilteredNamesReservations(filtered);
    };

    const filterIdsReservations = (query) => {
        const filtered = idsReservations.filter(reservation => (`${reservation.name}`).toLowerCase().includes(query.toLowerCase()));
        setFilteredIdsReservations(filtered);
    };

    const handleSortByClick = () => {
        setSortByMenuOpen(!sortByMenuOpen);
    };

    const handleSortOptionSelect = (option) => {
        setSelectedSortOption(option);
        setSortByMenuOpen(false);
    };

    const timeRef = useRef(null);

    useEffect(() => {
        const findNearestTime = () => {
          const currentTime = new Date();
          const currentHour = currentTime.getHours();
          const currentMinute = currentTime.getMinutes();
          
          const timeToMinutes = (time) => {
            const [hour, minute] = time.split(':').map(part => parseInt(part));
            return hour * 60 + minute;
          };
    
          const futureTimes = timesReservations.filter(time => {
            if (time.reservations.length===0)return false;
            const [hour, minute] = time.time.split(':');
            const timeInMinutes = parseInt(hour) * 60 + parseInt(minute);
            const currentTimeInMinutes = currentHour * 60 + currentMinute;
            return timeInMinutes > currentTimeInMinutes;
          });
        
          if (futureTimes.length === 0) {
            // If there are no future times, return the last time
            return timesReservations[timesReservations.length - 1].time;
          }

          let nearestTime = futureTimes[0].time;
            let minDiff = Math.abs(timeToMinutes(futureTimes[0].time) - (currentHour * 60 + currentMinute));
            futureTimes.forEach(time => {
                const diff = Math.abs(timeToMinutes(time.time) - (currentHour * 60 + currentMinute));
                if (diff < minDiff) {
                minDiff = diff;
                nearestTime = time.time;
                }
            });

            console.log(nearestTime);
            return nearestTime;
        };
        
        if(selectedSortOption===2 && timesReservations.length>0){
            const nearestTime = findNearestTime();
            const element = document.querySelector(`[data-time='${nearestTime}']`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        
      }, [timesReservations,selectedSortOption]);

    const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
    };

    return (
        <div className="reservations-container">
            <button className="calendar-button" onClick={toggleCalendar}>
                    {!showCalendar && <img src={calendarClosedImg} alt="Calendar Closed Icon" width="25px" color='black'/>}
                    {showCalendar && <img src={calendarOpenImg} alt="Calendar Open Icon" width="25px"/>}
                </button>
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
            <div className={`calendar-overlay ${showCalendar ? 'visible' : ''}`} onClick={toggleCalendar}></div>
            {showCalendar && (
                <div className='calendar'>
                    <CalendarYearly/>
                </div>
            )}
            {loading ? (
                <div className="loading-spinner">
                    <HashLoader type="Grid" color="#8a5a00" size={80}/>
                </div>
            ) : (
                !showCalendar && <div className="reservations">
                    {selectedSortOption === 1 && filteredTablesReservations.map((table, index) => (
                        table.reservations.length !== 0 && (
                            <div key={index} className="reservation">
                                <div className="table-header">
                                    <h2>Table {table.id}</h2>
                                    <button className="toggle-button" onClick={() => toggleReservationDetailsByTable(table.id)}>
                                        {expandedTablesReservations[table.id] ? '-' : '+'}
                                    </button>
                                </div>
                                {expandedTablesReservations[table.id] && (
                                    <div className="reservation-details-container">
                                        {table.reservations.map((reservation, idx) => (
                                            <div key={idx} className="reservation-details">
                                                <p><span>Name:</span> {reservation.name}</p>
                                                <p><span>Phone:</span> {reservation.phone}</p>
                                                <p><span>Start Time:</span> {reservation.startTime}</p>
                                                <p><span>End Time:</span> {reservation.endTime}</p>
                                                <p><span>ID:</span> {reservation.reservation_id}</p>
                                                {reservation.canceled !== undefined && (
                                                    <p className='canceled'>
                                                        <span>CANCELED</span>
                                                    </p>
                                                )}
                                                {reservation.accepted !== undefined && (
                                                    <p className='accepted'>
                                                        <span>ACCEPTED</span>
                                                    </p>
                                                )}
                                                {reservation.accepted === undefined && reservation.canceled ===undefined && 
                                                    <>
                                                        <button className="accept-button" onClick={() => handleAcceptReservation(reservation.reservation_id)}>&#10004;</button>
                                                        <button className="cancel-button" onClick={() => handleCancelReservation(reservation.reservation_id)}>&#10006;</button>
                                                    </>
                                                }
                                            </div>
                                            ))}
                                    </div>
                                )}
                            </div>
                        )
                    ))}
                    {selectedSortOption === 2 && filteredTimesReservations.map((time, index) => (
                        time.reservations.length !== 0 && (
                            <div key={index} ref={timeRef} className="reservation" data-time={time.time}>
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
                                                <p><span>Name:</span> {reservation.name}</p>
                                                <p><span>Phone:</span> {reservation.phone}</p>
                                                <p><span>End Time:</span> {reservation.endTime}</p>
                                                <p><span>Table:</span> {reservation.tableId}</p>
                                                <p><span>ID:</span> {reservation.reservation_id}</p>
                                                {reservation.canceled !== undefined && (
                                                    <p className='canceled'>
                                                        <span>CANCELED</span>
                                                    </p>
                                                )}
                                                {reservation.accepted !== undefined && (
                                                    <p className='accepted'>
                                                        <span>ACCEPTED</span>
                                                    </p>
                                                )}
                                                {reservation.accepted === undefined && reservation.canceled ===undefined && 
                                                    <>
                                                        <button className="accept-button" onClick={() => handleAcceptReservation(reservation.reservation_id)}>&#10004;</button>
                                                        <button className="cancel-button" onClick={() => handleCancelReservation(reservation.reservation_id)}>&#10006;</button>
                                                    </>
                                                }
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    ))}
                    {selectedSortOption === 3 && filteredNamesReservations.map((reservation, index) => (
                        <div key={reservation.id} className="reservation">
                            <div className="table-header">
                                <h2>{reservation.name} {reservation.accepted !== undefined && <span className='accepted'>ACCEPTED</span>}{reservation.canceled !== undefined && <span className='canceled'>CANCELED</span>}
                                </h2>
                                <button className="toggle-button" onClick={() => toggleReservationDetailsByName(reservation.id)}>
                                    {expandedNamesReservations[reservation.id] ? '-' : '+'}
                                </button>
                            </div>
                            {expandedNamesReservations[reservation.id] && (
                                <div className="reservation-details-container">
                                    <div className="reservation-details">
                                        <p><span>Phone:</span> {reservation.phone}</p>
                                        <p><span>Start Time:</span> {reservation.startTime}</p>
                                        <p><span>End Time:</span> {reservation.endTime}</p>
                                        <p><span>Table:</span> {reservation.tableId}</p>
                                        <p><span>ID:</span> {reservation.reservation_id}</p>
                                        {reservation.canceled !== undefined && (
                                            <p className='canceled'>
                                                <span>CANCELED</span>
                                            </p>
                                        )}
                                        {reservation.accepted !== undefined && (
                                            <p className='accepted'>
                                                <span>ACCEPTED</span>
                                            </p>
                                        )}
                                        {reservation.accepted === undefined && reservation.canceled ===undefined && 
                                            <>
                                                <button className="accept-button" onClick={() => handleAcceptReservation(reservation.reservation_id)}>&#10004;</button>
                                                <button className="cancel-button" onClick={() => handleCancelReservation(reservation.reservation_id)}>&#10006;</button>
                                            </>
                                        }
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    {selectedSortOption === 4 && filteredIdsReservations.map((reservation, index) => (
                        <div key={reservation.id} className="reservation">
                            <div className="table-header">
                                <h2>{reservation.reservation_id}</h2>
                                <button className="toggle-button" onClick={() => toggleReservationDetailsByReservationId(reservation.id)}>
                                    {expandedIdsReservations[reservation.id] ? '-' : '+'}
                                </button>
                            </div>
                            {expandedIdsReservations[reservation.id] && (
                                <div className="reservation-details-container">
                                    <div className="reservation-details">
                                        <p><span>Name:</span> {reservation.name}</p>
                                        <p><span>Phone:</span> {reservation.phone}</p>
                                        <p><span>Start Time:</span> {reservation.startTime}</p>
                                        <p><span>End Time:</span> {reservation.endTime}</p>
                                        <p><span>Table:</span> {reservation.tableId}</p>
                                        {reservation.canceled !== undefined && (
                                            <p className='canceled'>
                                                <span>CANCELED</span>
                                            </p>
                                        )}
                                        {reservation.accepted !== undefined && (
                                            <p className='accepted'>
                                                <span>ACCEPTED</span>
                                            </p>
                                        )}
                                        {reservation.accepted === undefined && reservation.canceled ===undefined && 
                                            <>
                                                <button className="accept-button" onClick={() => handleAcceptReservation(reservation.reservation_id)}>&#10004;</button>
                                                <button className="cancel-button" onClick={() => handleCancelReservation(reservation.reservation_id)}>&#10006;</button>
                                            </>
                                        }
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Reservations;
