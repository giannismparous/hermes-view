import React, { useEffect, useRef, useState } from 'react';
import '../styles/Reservations.css';
import { addNewReservation, addNewTable, cancelReservationByTableNumber, completeReservationByTableNumber, dateExists, fetchDateInfo, fetchInfo, updateReservation, updateUnavailableTables} from './firebase.utils';
import { ClockLoader } from 'react-spinners';
import CalendarYearly from './CalendarYearly';
import { Link } from 'react-router-dom';
import DropdownMenu from './DropdownMenu'

const sortByImg = '../icons/sort_by.png';
const calendarOpenImg = '../icons/calendar-open-blue.png';
const calendarClosedImg = '../icons/calendar-closed-blue.png';

const states = [
    { id: 1, imgSrc: "../icons/late_state.png", title: "Late" },
    { id: 2, imgSrc: "../icons/waitlist_state.png", title: "Waitlist" },
    { id: 3, imgSrc: "../icons/pending_state.png", title: "Pending" },
    { id: 4, imgSrc: "../icons/arrived_state.png", title: "Arrived" },
    { id: 5, imgSrc: "../icons/ordered_state.png", title: "Ordered" },
    { id: 6, imgSrc: "../icons/paid_state.png", title: "Paid" },
    { id: 7, imgSrc: "../icons/canceled_state.png", title: "Canceled" },
  ];

const Reservations = () => {

    const getCurrentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Month is zero-based
        const day = currentDate.getDate();
        return `${day}-${month}-${year}`;
    }

    useEffect(() => {

        const getInfoFromServer = async (collectionKey) => {
            try {

                const response = await fetchInfo(collectionKey);

                console.log("Response:");
                console.log(response);

                setInfo(response);
                setTables(response.tables);

                const reservationsTimesMap = {};
                response.reservation_times.forEach(item => {
                    reservationsTimesMap[item.id] = item.time;
                })

                setTimesMap(reservationsTimesMap);

                const menuItemsMap = {};

                response.menu.forEach(category => {
                    category.items.forEach(item => {
                        menuItemsMap[item.id] = { name: item.name, price: item.price, category: category.category };
                    });
                });

                setMenuMap(menuItemsMap);

            } catch (error) {
                console.error("Error checking document: ", error);
            }
        };

        const getDateInfoFromServer = async (collectionKey,date) => {

            try {
                
                const response = await fetchDateInfo(collectionKey,date);

                console.log("Response:");
                console.log(response);

                setIdsReservations(response[3]);
                setFilteredIdsReservations(response[3]);
                setTimesReservations(response[4]);
                setFilteredTimesReservations(response[4]);
                setNamesReservations(response[5]);
                setFilteredNamesReservations(response[5]);
                setTablesReservations(response[6]);
                setFilteredTablesReservations(response[6]);
                setIdsOrders(response[7]);
                setFilteredIdsOrders(response[7]);
                setReservationsOrders(response[8]);
                setFilteredReservationsOrders(response[8]);
                setLoading(false);

            } catch (error) {
                console.error("Error checking document: ", error);
            }

        };

        const collectionKey = 'sample-restaurant';
        getInfoFromServer(collectionKey);
        getDateInfoFromServer(collectionKey,getCurrentDate());

    }, []); // Empty dependency array ensures that the effect runs only once when the component is mounted

    const [collectionKey, setCollectionKey] = useState("sample-restaurant");
    const [info, setInfo] = useState();
    const [maxReservationDurationIndexNumber, setMaxReservationDurationIndexNumber] = useState(0);
    const [tables,setTables] = useState([]);
    const [unavailableTables, setUnavailableTables] = useState([]);
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
    const [idsOrders, setIdsOrders] = useState([]);
    const [filteredIdsOrders, setFilteredIdsOrders] = useState([]);
    const [expandedIdsOrders, setExpandedIdsOrders] = useState([]);
    const [reservationsOrders, setReservationsOrders] = useState([]);
    const [filteredReservationsOrders, setFilteredReservationsOrders] = useState([]);
    const [expandedReservationsOrders, setExpandedReservationsOrders] = useState([]);
    const [timesMap, setTimesMap] = useState([]);
    const [menuMap, setMenuMap] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortByMenuOpen, setSortByMenuOpen] = useState(false);
    const [selectedSortOption, setSelectedSortOption] = useState(2);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(getCurrentDate()); // State to store selected date
    const [selectedDateEmpty, setSelectedDateEmpty] = useState(false); // State to store selected date
    const [mode, setMode] = useState(1);
    const [currentReservation, setCurrentReservation] = useState();

    const [showStatePopup, setShowStatePopup] = useState(false);
    const [showAddTablePopup, setShowAddTablePopup] = useState(false);
    const [showAddReservationPopup, setShowAddReservationPopup] = useState(false);

    //for add new table
    const [tableId, setTableId] = useState('');
    const [capacity, setCapacity] = useState('');
    const [smokeFriendly, setSmokeFriendly] = useState(false);
    const [tableIdForReservation, setTableIdForReservation] = useState('');
    const [time, setTime] = useState('');
    const [people, setPeople] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [notes, setNotes] = useState('');
    const [smokes, setSmokes] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'tableId') {
            if (value>=0)setTableId(value);
        } else if (name === 'capacity') {
            if (value>=0)setCapacity(value);
        } else if (name === 'tableIdForReservation') {
            if (value>=0)setTableIdForReservation(value);
        } else if (name === 'time') {
            setTime(value);
        } else if (name === 'people') {
            if (value>=0)setPeople(value);
        } 
        else if (name === 'fullName') {
            setFullName(value);
        } else if (name === 'phone') {
            setPhone(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'notes') {
            setNotes(value);
        }
    };

    const handleSmokeFriendlyCheckboxChange = () => {
        setSmokeFriendly(!smokeFriendly);
    };

    const handleSmokesCheckboxChange = () => {
        setSmokes(!smokes);
    };

    // Function to toggle popup visibility
    const toggleStatePopup = (currentReservation) => {

        setShowStatePopup(!showStatePopup);
        setCurrentReservation(currentReservation);

    };

    const toggleAddReservationPopup = () => {

        setShowAddReservationPopup(!showAddReservationPopup);

    };

    const toggleAddTablePopup = () => {

        setShowAddTablePopup(!showAddTablePopup);

    };

    const updateReservationState = async (state) => {

        currentReservation.state = state;

        const response = await updateReservation(collectionKey, selectedDate, currentReservation);
        console.log(response);
        toggleStatePopup(currentReservation);

    };

    const addNewTableToServer = async () => {

        if (tableId==="" || capacity===""){
            console.log("Table ID and Capacity should be filled");
        }
        else {
            const response = await addNewTable(collectionKey, parseInt(tableId), parseInt(capacity), smokeFriendly);
            console.log(response);
            const existingTableIndex = tables.findIndex(table => table.id === tableId);

            if (existingTableIndex !== -1) {
                // If table exists, update its details
                tables[existingTableIndex] = { id: tableId, capacity: parseInt(capacity), smokeFriendly };
            } else {
                // If table doesn't exist, add a new table
                tables.push({ id: parseInt(tableId), capacity: parseInt(capacity), smokeFriendly });
            }
            toggleAddTablePopup(!showAddTablePopup);
        }

    };

    const addNewReservationToServer = async () => {

        // console.log("New reservation");
        // console.log("Selected date:");
        // console.log(selectedDate);
        // console.log("Table id:");
        // console.log(tableIdForReservation);
        // console.log("Time:");
        // console.log(time);
        // console.log("Full name:");
        // console.log(fullName);
        // console.log("Email:");
        // console.log(email);
        // console.log("Phone:");
        // console.log(phone);
        // console.log("Notes:");
        // console.log(notes);
        // console.log("Smokes:");
        // console.log(smokes);

        const response = await addNewReservation(collectionKey, selectedDate, parseInt(time), parseInt(time+maxReservationDurationIndexNumber), parseInt(tableIdForReservation), fullName, phone, email, notes, parseInt(people), smokes);
        console.log(response);

        toggleAddReservationPopup(!showAddReservationPopup);

    };

    const handleDateSelect = (date) => {
        console.log("Selected date:" + date);
        setSelectedDate(date);
        setShowCalendar(false);
        setSelectedDateEmpty(false);
    };

    useEffect(() => {

        const getNewDateInfoFromServer = async (collectionKey,date) => {
            
            setLoading(true); // Set loading to true before fetching schedules
            const exists = await dateExists(collectionKey,selectedDate);
            if (exists) {
                const response = await fetchDateInfo(collectionKey,date);

                console.log("Response:");
                console.log(response);

                setUnavailableTables(response[1]);
                setIdsReservations(response[3]);
                setFilteredIdsReservations(response[3]);
                setTimesReservations(response[4]);
                setFilteredTimesReservations(response[4]);
                setNamesReservations(response[5]);
                setFilteredNamesReservations(response[5]);
                setTablesReservations(response[6]);
                setFilteredTablesReservations(response[6]);
                setMaxReservationDurationIndexNumber(response[9]);
                setLoading(false);
            } else {
                setTablesReservations([]);
                setFilteredTablesReservations([]);
                setExpandedTablesReservations([]);
                setTimesReservations([]);
                setFilteredTimesReservations([]);
                setExpandedTimesReservations([]);
                setNamesReservations([]);
                setFilteredNamesReservations([]);
                setExpandedNamesReservations([]);
                setIdsReservations([]);
                setFilteredIdsReservations([]);
                setExpandedIdsReservations([]);
                setLoading(false);
                setSelectedDateEmpty(true);
            }
        };
    
        const collectionKey = 'sample-restaurant';
        getNewDateInfoFromServer(collectionKey,selectedDate);
        
    }, [selectedDate]);

    useEffect(() => {
        setExpandedTablesReservations(Array(tablesReservations.length).fill(true));
    }, [tablesReservations]);

    useEffect(() => {
        setExpandedTimesReservations(Array(timesReservations.length).fill(true));
    }, [timesReservations]);

    useEffect(() => {
        setExpandedNamesReservations(Array(namesReservations.length).fill(true));
    }, [namesReservations]);

    useEffect(() => {
        setExpandedIdsReservations(Array(idsReservations.length).fill(true));
    }, [idsReservations]);

    useEffect(() => {
        setExpandedIdsOrders(Array(idsOrders.length).fill(true));
    }, [idsOrders]);

    useEffect(() => {
        setExpandedReservationsOrders(Array(reservationsOrders.length).fill(true));
    }, [reservationsOrders]);

    const handleCompleteReservation = async (reservationId) => {
        await completeReservationByTableNumber(collectionKey, reservationId, selectedDate);
        window.location.reload();
    };

    const handleCancelReservation = async (reservationId) => {
        await cancelReservationByTableNumber(collectionKey, reservationId, selectedDate);
        window.location.reload();
    };

    const toggleReservationDetailsByTable = (tableId) => {
        console.log(expandedTablesReservations);
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

    const toggleOrderDetailsByOrderId = (orderId) => {
        setExpandedIdsOrders(prevExpandedIdsOrders => {
            return prevExpandedIdsOrders.map((value, index) => {
                return index === orderId ? !value : value;
            });
        });
    };

    const toggleOrderDetailsByReservationId = (reservationId) => {
        setExpandedReservationsOrders(prevExpandedReservationsOrders => {
            return prevExpandedReservationsOrders.map((value, index) => {
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
        const findNearestTimeIndex = () => {
          const currentTime = new Date();
          const currentHour = currentTime.getHours();
          const currentMinute = currentTime.getMinutes();
          
          const timeToMinutes = (time) => {
            const [hour, minute] = time.split(':').map(part => parseInt(part));
            return hour * 60 + minute;
          };
    
          const futureTimes = timesReservations.filter(time => {
            const [hour, minute] = timesMap[time.start_time_index].split(':');
            const timeInMinutes = parseInt(hour) * 60 + parseInt(minute);
            const currentTimeInMinutes = currentHour * 60 + currentMinute;
            return timeInMinutes > currentTimeInMinutes;
          });
        
          if (futureTimes.length === 0) {
            // If there are no future times, return the last time

            if (timesReservations.length===0)return 0;
            return timesReservations[timesReservations.length - 1].start_time_index;
          }

          let nearestTimeIndex = futureTimes[0].start_time_index;
            let minDiff = Math.abs(timeToMinutes(timesMap[futureTimes[0].start_time_index]) - (currentHour * 60 + currentMinute));
            futureTimes.forEach(timeReservation => {
                const diff = Math.abs(timeToMinutes(timesMap[timeReservation.start_time_index]) - (currentHour * 60 + currentMinute));
                if (diff < minDiff) {
                minDiff = diff;
                nearestTimeIndex = timeReservation.start_time_index;
                }
            });

            console.log(nearestTimeIndex);
            return nearestTimeIndex;
        };
        
        if(selectedSortOption===2 && timesReservations.length>0){

            const nearestTimeIndex = findNearestTimeIndex();
            const element = document.querySelector(`[data-time-index='${nearestTimeIndex}']`);

            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        
      }, [timesReservations,selectedSortOption, timesMap]);

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    const changeMode = (mode) => {
        setMode(mode);
        if (mode === 1) setSelectedSortOption(1);
        else if (mode === 2) setSelectedSortOption(5);
        else if (mode === 3) setSelectedSortOption(7);
      };

    const calculateTotal = (orderItems) => {
        let total = 0;
        orderItems.forEach(item => {
            total += item.quantity * menuMap[item.menu_item_id].price;
        });
        return total;
    };

    const [isScrollAtTop, setIsScrollAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the scroll position is at the top
      const atTop = window.scrollY === 0;
      setIsScrollAtTop(atTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleToggleAvailability = async (tableId) => {

    const response= await updateUnavailableTables(collectionKey,selectedDate,tableId);
    console.log(response);

    if (unavailableTables.includes(tableId)) {
        setUnavailableTables(prevUnavailableTables => prevUnavailableTables.filter(id => id !== tableId));
    } else {
        setUnavailableTables(prevUnavailableTables => [...prevUnavailableTables, tableId]);
    }

};

    return (
        <div className='reservations-page'>
            <DropdownMenu changeMode={changeMode} currentMode={mode} />
            <div className="reservations-container">
                <button className={`calendar-button ${isScrollAtTop ? '' : 'hidden'}`} onClick={toggleCalendar}>
                    {!showCalendar && <img src={calendarClosedImg} alt="Calendar Hidden Icon" width="25px" color='black'/>}
                    {showCalendar && <img src={calendarOpenImg} alt="Calendar Shown Icon" width="25px"/>}
                </button>
                <div className={`search-bar-container ${isScrollAtTop ? '' : 'hidden'}`}>
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
                        {mode === 1 && sortByMenuOpen && (
                            <div className="sort-menu">
                                <div className="sort-option" onClick={() => handleSortOptionSelect(1)}>Sort by Table</div>
                                <div className="sort-option" onClick={() => handleSortOptionSelect(2)}>Sort by Time</div>
                                <div className="sort-option" onClick={() => handleSortOptionSelect(3)}>Sort by Name</div>
                                <div className="sort-option" onClick={() => handleSortOptionSelect(4)}>Sort by reservation ID</div>
                            </div>
                        )}
                        {mode === 2 && sortByMenuOpen && (
                            <div className="sort-menu">
                                <div className="sort-option" onClick={() => handleSortOptionSelect(5)}>Sort by order ID</div>
                                <div className="sort-option" onClick={() => handleSortOptionSelect(6)}>Sort by reservation ID</div>
                            </div>
                        )}
                    </div>
                </div>
                <div className={`calendar-overlay ${showCalendar ? 'visible' : ''}`} onClick={toggleCalendar}></div>
                {showCalendar && (
                    <div className='calendar'>
                        <CalendarYearly onDateSelect={handleDateSelect} selectedDate={selectedDate}/>
                    </div>
                )}
                {loading ? (
                    <div className="loading-spinner">
                        <ClockLoader type="Grid" color="#007bff" size={80}/>
                    </div>
                ) : (
                    
                    !showCalendar && <div className="reservations">
                        {showStatePopup && (
                            <div className="state-popup-window" onClick={() => toggleStatePopup(null)}>
                                <div className='state-popup-window-items' onClick={(e) => e.stopPropagation()}>
                                {states.map(state => (
                                    <div key={state.id} className='state-popup-window-item' onClick={() => updateReservationState(state.id)}>
                                        <img className='state-img' src={state.imgSrc} alt={state.title} />
                                        <p className='state-title'>{state.title}</p>
                                    </div>
                                ))}
                                </div>
                            </div>
                        )}
                        {showAddReservationPopup && (
                            <div className="reservation-popup-window" onClick={() => toggleAddReservationPopup(null)}>
                                <div className='reservation-popup-window-container' onClick={(e) => e.stopPropagation()}>
                                    <h2>Add New Reservation</h2>
                                    <label>
                                        Table ID:
                                        <input 
                                            type="number" 
                                            name="tableIdForReservation" 
                                            placeholder="Table ID" 
                                            value={tableIdForReservation} 
                                            onChange={handleInputChange} 
                                        />
                                    </label>
                                    <label>
                                        Time:
                                        <select 
                                            name="time" 
                                            value={time} 
                                            onChange={handleInputChange}
                                        >
                                            {Object.entries(timesMap).map(([timeId, timeString]) => (
                                                <option key={timeId} value={timeId}>
                                                    {timeString}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                    <label>
                                        Number of people:
                                        <input 
                                            type="number" 
                                            name="people" 
                                            placeholder="People" 
                                            value={people} 
                                            onChange={handleInputChange} 
                                        />
                                    </label>
                                    <label>
                                        Full Name:
                                        <input type="text" name="fullName" placeholder="Full Name" value={fullName} onChange={handleInputChange} />
                                    </label>
                                    <label>
                                        Phone:
                                        <input type="tel" name="phone" placeholder="Phone" value={phone} onChange={handleInputChange} />
                                    </label>
                                    <label>
                                        Email:
                                        <input type="email" name="email" placeholder="Email" value={email} onChange={handleInputChange} />
                                    </label>
                                    <label>
                                        Notes:
                                        <input type="text" name="notes" placeholder="Notes" value={notes} onChange={handleInputChange} />
                                    </label>
                                    <label>
                                        <input type="checkbox" name="smokes" checked={smokes} onChange={handleSmokesCheckboxChange} />
                                        Smokes
                                    </label>
                                    <button className='popup-add-table-button' onClick={() => addNewReservationToServer()}>Add Reservation</button>
                                </div>
                            </div>
                        )}
                        {showAddTablePopup && (
                            <div className="table-popup-window" onClick={() => toggleAddTablePopup(null)}>
                                <div className='table-popup-window-container' onClick={(e) => e.stopPropagation()}>
                                    <h2>Add New Table</h2>
                                    <label>
                                        Table ID:
                                        <input 
                                            type="number" 
                                            name="tableIdForReservation" 
                                            placeholder="Table ID" 
                                            value={tableIdForReservation} 
                                            onChange={handleInputChange} 
                                        />
                                    </label>
                                    <label>
                                        Capacity:
                                        <input type="number" name="capacity" placeholder="Capacity" value={capacity} onChange={handleInputChange} />
                                    </label>
                                    <label>
                                        <input type="checkbox" name="smokeFriendly" checked={smokeFriendly} onChange={handleSmokeFriendlyCheckboxChange} />
                                        Smoke Friendly
                                    </label>
                                    <button className='popup-add-table-button' onClick={() => addNewTableToServer()}>Add Table</button>
                                </div>
                            </div>
                        )}
                        {selectedDateEmpty && <div className='no-reservations'>
                            <h2>No available reservations for this date.</h2>
                        </div>}
                        {!selectedDateEmpty && mode === 1 && (
                            <div className='sort-label'>
                                <h2>{selectedDate}</h2>
                                {/* <h2>
                                    {selectedSortOption === 1 && 'Reservations sorted by table'}
                                    {selectedSortOption === 2 && 'Reservations sorted by time'}
                                    {selectedSortOption === 3 && 'Reservations sorted by name'}
                                    {selectedSortOption === 4 && 'Reservations sorted by reservation ID'}
                                </h2> */}
                            </div>
                        )}
                        {!selectedDateEmpty && mode === 2 && (
                            <div className='sort-label'>
                                <h2>
                                    {selectedSortOption === 5 && 'Orders sorted by order ID'}
                                    {selectedSortOption === 6 && 'Orders sorted by reservation ID'}
                                </h2>
                            </div>
                        )}
                        {selectedSortOption === 1 && filteredTablesReservations.map((table, index) => (
                            table.reservations.length !== 0 && (
                                <div key={index} className="reservation">
                                    <div className="table-header">
                                        <h2>Table {table.id}</h2>
                                        <button className="toggle-button" onClick={() => toggleReservationDetailsByTable(index)}>
                                            {expandedTablesReservations[index] ? '-' : '+'}
                                        </button>
                                    </div>
                                    {expandedTablesReservations[index] && (
                                        <div className="reservation-details-container">
                                            {table.reservations.map((reservation, idx) => (
                                                <div key={idx} className="reservation-details">
                                                    <div className='reservation-info'>
                                                        <div className='reservation-state-info' onClick={() => {
                                                            reservation.table_id = table.id;
                                                            toggleStatePopup(reservation);}}>
                                                            {states.map(state => (
                                                                reservation.state === state.id && (
                                                                    <div key={state.id} className='popup-window-item'>
                                                                    <img className='state-img' src={state.imgSrc} alt={state.title} />
                                                                    <p className='state-title'>{state.title}</p>
                                                                    </div>
                                                                )
                                                            ))}
                                                        </div>
                                                        <div className='reservation-customer-info'>
                                                            <p><span>Name:</span> {reservation.name}</p>
                                                            <div className='reservation-info-details'>
                                                                <div className='reservation-info-details-row'>
                                                                    <img className='reservation-info-button' src="../icons/clock.png" alt="Phone Number" /> {timesMap[reservation.start_time_index]}                                                                     <img className='reservation-info-button' src="../icons/people.png" alt="Phone Number" />  {reservation.people} <img className='reservation-info-button' src="../icons/table.png" alt="Table Number" />  {table.id}
                                                                </div>
                                                                <div className='reservation-info-details-row'>
                                                                    <img className='reservation-info-button' src="../icons/phone.png" alt="Phone Number" /> {reservation.phone}
                                                                    {reservation.smokes !== undefined && <img className='reservation-info-button' src="../icons/smoker.png" alt="Waitlist" />}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='reservation-order'>
                                                        {(reservation.state === 4) && (
                                                            <Link to={`/order/${collectionKey}/${selectedDate}/${reservation.reservation_id}`}>
                                                                <img className='state-img' src="../icons/order_button.png" alt="Order" />
                                                                <p className='state-title'>Order </p>
                                                            </Link>
                                                        )}
                                                        {(reservation.state === 5) && (
                                                            <Link to={`/order/${collectionKey}/${selectedDate}/${reservation.reservation_id}`}>
                                                                <img className='state-img' src="../icons/order_more_button.png" alt="Order" />
                                                                <p className='state-title'>Order </p>
                                                            </Link>
                                                        )}
                                                    </div>           
                                                </div>
                                                ))}
                                        </div>
                                    )}
                                </div>
                            )
                        ))}
                        {selectedSortOption === 2 && filteredTimesReservations.map((time, index) => (
                            time.reservations.length !== 0 && (
                                <div key={index} ref={timeRef} className="reservation" data-time-index={time.start_time_index}>
                                    <div className="table-header">
                                        <h2>{timesMap[time.start_time_index]}</h2>
                                        <button className="toggle-button" onClick={() => toggleReservationDetailsByTime(index)}>
                                            {expandedTimesReservations[index] ? '-' : '+'}
                                        </button>
                                    </div>
                                    {expandedTimesReservations[index] && (
                                        <div className="reservation-details-container">
                                            {time.reservations.map((reservation, idx) => (
                                                <div key={idx} className="reservation-details">
                                                    <div className='reservation-info'>
                                                        <div className='reservation-state-info' onClick={() => {
                                                            reservation.start_time_index = time.start_time_index;
                                                            toggleStatePopup(reservation);}}>
                                                            {states.map(state => (
                                                                reservation.state === state.id && (
                                                                    <div key={state.id} className='popup-window-item'>
                                                                    <img className='state-img' src={state.imgSrc} alt={state.title} />
                                                                    <p className='state-title'>{state.title}</p>
                                                                    </div>
                                                                )
                                                            ))}
                                                        </div>
                                                        <div className='reservation-customer-info'>
                                                            <p><span>Name:</span> {reservation.name}</p>
                                                            <div className='reservation-info-details'>
                                                                <div className='reservation-info-details-row'>
                                                                    <img className='reservation-info-button' src="../icons/clock.png" alt="Phone Number" /> {timesMap[time.start_time_index]}         
                                                                    <img className='reservation-info-button' src="../icons/people.png" alt="Phone Number" />  {reservation.people} <img className='reservation-info-button' src="../icons/table.png" alt="Table Number" />  {reservation.table_id}
                                                                </div>
                                                                <div className='reservation-info-details-row'>
                                                                    <img className='reservation-info-button' src="../icons/phone.png" alt="Phone Number" /> {reservation.phone}
                                                                    {reservation.smokes !== undefined && <img className='reservation-info-button' src="../icons/smoker.png" alt="Waitlist" />}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='reservation-order'>
                                                        {(reservation.state === 4) && (
                                                            <Link to={`/order/${collectionKey}/${selectedDate}/${reservation.reservation_id}`}>
                                                                <img className='state-img' src="../icons/order_button.png" alt="Order" />
                                                                <p className='state-title'>Order </p>
                                                            </Link>
                                                        )}
                                                        {(reservation.state === 5) && (
                                                            <Link to={`/order/${collectionKey}/${selectedDate}/${reservation.reservation_id}`}>
                                                                <img className='state-img' src="../icons/order_more_button.png" alt="Order" />
                                                                <p className='state-title'>Order </p>
                                                            </Link>
                                                        )}
                                                    </div>     
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )
                        ))}
                        {selectedSortOption === 3 && filteredNamesReservations.map((reservation, index) => (
                            <div key={index} className="reservation">
                                {/* <div className="table-header">
                                    <h2>{reservation.name}</h2>
                                    <button 
                                        className={`toggle-button ${reservation.state === 7 ? 'canceled' : ''} ${reservation.state === 6 ? 'completed' : ''}`} 
                                        onClick={() => toggleReservationDetailsByName(index)}
                                    >
                                        {expandedNamesReservations[index] ? '-' : '+'}
                                    </button>
                                </div> */}
                                {expandedNamesReservations[index] && (
                                    <div className="reservation-details-container">
                                        <div className="reservation-details">
                                        <div className='reservation-info'>
                                                    <div className='reservation-state-info' onClick={() => {
                                                        toggleStatePopup(reservation);}}>
                                                        {states.map(state => (
                                                            reservation.state === state.id && (
                                                                <div key={state.id} className='popup-window-item'>
                                                                <img className='state-img' src={state.imgSrc} alt={state.title} />
                                                                <p className='state-title'>{state.title}</p>
                                                                </div>
                                                            )
                                                        ))}
                                                    </div>
                                                    <div className='reservation-customer-info'>
                                                        <p><span>Name:</span> {reservation.name}</p>
                                                        <div className='reservation-info-details'>
                                                            <div className='reservation-info-details-row'>
                                                                <img className='reservation-info-button' src="../icons/clock.png" alt="Phone Number" /> {timesMap[reservation.start_time_index]}         
                                                                <img className='reservation-info-button' src="../icons/people.png" alt="Phone Number" />  {reservation.people} <img className='reservation-info-button' src="../icons/table.png" alt="Table Number" />  {reservation.table_id}
                                                            </div>
                                                            <div className='reservation-info-details-row'>
                                                                <img className='reservation-info-button' src="../icons/phone.png" alt="Phone Number" /> {reservation.phone}
                                                                {reservation.smokes !== undefined && <img className='reservation-info-button' src="../icons/smoker.png" alt="Waitlist" />}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    </div>
                                                    <div className='reservation-order'>
                                                        {(reservation.state === 4) && (
                                                            <Link to={`/order/${collectionKey}/${selectedDate}/${reservation.reservation_id}`}>
                                                                <img className='state-img' src="../icons/order_button.png" alt="Order" />
                                                                <p className='state-title'>Order </p>
                                                            </Link>
                                                        )}
                                                        {(reservation.state === 5) && (
                                                            <Link to={`/order/${collectionKey}/${selectedDate}/${reservation.reservation_id}`}>
                                                                <img className='state-img' src="../icons/order_more_button.png" alt="Order" />
                                                                <p className='state-title'>Order </p>
                                                            </Link>
                                                        )}
                                                    </div>   
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        {selectedSortOption === 4 && filteredIdsReservations.map((reservation, index) => (
                            <div key={index} className="reservation">
                                <div className="table-header">
                                    {/* <h2>{reservation.reservation_id}</h2>
                                    <button className={`toggle-button ${reservation.state === 7 ? 'canceled' : ''} ${reservation.state === 6 ? 'completed' : ''}`}  onClick={() => toggleReservationDetailsByReservationId(index)}>
                                        {expandedIdsReservations[index] ? '-' : '+'}
                                    </button> */}
                                </div>
                                {expandedIdsReservations[index] && (
                                    <div className="reservation-details-container">
                                        <div className="reservation-details">
                                        <div className='reservation-info'>
                                                    <div className='reservation-state-info' onClick={() => {
                                                        toggleStatePopup(reservation);}}>
                                                        {states.map(state => (
                                                            reservation.state === state.id && (
                                                                <div key={state.id} className='popup-window-item'>
                                                                <img className='state-img' src={state.imgSrc} alt={state.title} />
                                                                <p className='state-title'>{state.title}</p>
                                                                </div>
                                                            )
                                                        ))}
                                                    </div>
                                                    <div className='reservation-customer-info'>
                                                        <p><span>Name:</span> {reservation.name}</p>
                                                        <div className='reservation-info-details'>
                                                            <div className='reservation-info-details-row'>
                                                                <img className='reservation-info-button' src="../icons/clock.png" alt="Phone Number" /> {timesMap[reservation.start_time_index]}         
                                                                <img className='reservation-info-button' src="../icons/people.png" alt="Phone Number" />  {reservation.people} <img className='reservation-info-button' src="../icons/table.png" alt="Table Number" />  {reservation.table_id}
                                                            </div>
                                                            <div className='reservation-info-details-row'>
                                                                <img className='reservation-info-button' src="../icons/phone.png" alt="Phone Number" /> {reservation.phone}
                                                                {reservation.smokes !== undefined && <img className='reservation-info-button' src="../icons/smoker.png" alt="Waitlist" />}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    </div>
                                                    <div className='reservation-order'>
                                                        {(reservation.state === 4) && (
                                                            <Link to={`/order/${collectionKey}/${selectedDate}/${reservation.reservation_id}`}>
                                                                <img className='state-img' src="../icons/order_button.png" alt="Order" />
                                                                <p className='state-title'>Order </p>
                                                            </Link>
                                                        )}
                                                        {(reservation.state === 5) && (
                                                            <Link to={`/order/${collectionKey}/${selectedDate}/${reservation.reservation_id}`}>
                                                                <img className='state-img' src="../icons/order_more_button.png" alt="Order" />
                                                                <p className='state-title'>Order </p>
                                                            </Link>
                                                        )}
                                                    </div>   
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        {selectedSortOption === 5 && filteredIdsOrders.map((order, index) => (
                            <div key={index} className="reservation">
                                {expandedIdsOrders[index] && (
                                    <div className="order-details-container">
                                        <div className="order-details">
                                            <p>
                                            {idsReservations.map((reservation) => {
                                                if (reservation.reservation_id === order.reservation_id) {
                                                    return (
                                                        <div key={reservation.reservation_id} className='order-reservation-info'>
                                                            <span>Order: {order.order_id}</span>
                                                            <span>Name: {reservation.name}</span>
                                                            <div className='order-table-number'>
                                                                Table: {reservation.table_id}<img className='reservation-info-button' src="../icons/table.png" alt="Table Number" />
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            })}
                                            </p>
                                            <div className='order-items'>
                                                <p><span>Menu Items:</span></p>
                                                <ul>
                                                    {order.order_items.map((item, i) => (
                                                        <li key={i}>&#8226; {menuMap[item.menu_item_id].name} x {item.quantity} : {item.quantity*menuMap[item.menu_item_id].price}€</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <p><span>Total:</span> {calculateTotal(order.order_items)}€</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        {selectedSortOption === 6 && filteredReservationsOrders.map((order, index) => (
                            <div key={index} className="reservation">
                                {expandedReservationsOrders[index] && (
                                    <div className="order-details-container">
                                        <div className="order-details">
                                        <p>
                                            {idsReservations.map((reservation) => {
                                                if (reservation.reservation_id === order.reservation_id) {
                                                    return (
                                                        <div key={reservation.reservation_id} className='order-reservation-info'>
                                                            <span>Reservation: {order.reservation_id}</span>
                                                            <span>Name: {reservation.name}</span>
                                                            <div className='order-table-number'>
                                                                Table: {reservation.table_id}<img className='reservation-info-button' src="../icons/table.png" alt="Table Number" />
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            })}
                                            </p>
                                            <div className='order-items'>
                                                <p><span>Menu Items:</span></p>
                                                <ul>
                                                    {order.order_items.map((item, i) => (
                                                        <li key={i}>&#8226; {menuMap[item.menu_item_id].name} x {item.quantity} : {item.quantity*menuMap[item.menu_item_id].price}€</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <p><span>Total:</span> {calculateTotal(order.order_items)}€</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        {selectedSortOption === 7 && tables.map((table, index) => (
                            <div key={index} className="table">
                                <div className="table-header">
                                    <h2>Table {table.id}</h2>
                                    <img 
                                        className={unavailableTables.includes(table.id) ? 'unavailable-img' : 'available-img'} 
                                        src={unavailableTables.includes(table.id) ? "../icons/unavailable.png" : "../icons/available.png"} 
                                        alt={unavailableTables.includes(table.id) ? "Unavailable" : "Available"} 
                                        onClick={() => handleToggleAvailability(table.id)} 
                                    />
                                </div>
                                <div className="table-details-container">
                                    <div className="table-details">
                                        <p>Capacity: {table.capacity}</p>
                                        <p>Smoke Friendly: {Boolean(table.smokeFriendly).toString()}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {mode===1 && 
                            <div className='add-reservation-container' onClick={() => {
                                toggleAddReservationPopup();}}>
                                <button className="add-reservation-button">+</button>
                            </div>
                        }
                        {mode===3 && 
                            <div className='add-table-container' onClick={() => {
                                toggleAddTablePopup();}}>
                                <button className="add-table-button">+</button>
                            </div>
                        }
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reservations;


// useEffect(() => {
    //     const fetchSchedules = async () => {
    //         setLoading(true); // Set loading to true before fetching schedules
    //         const exists = await dateExists(selectedDate);
    //         if (exists) {
    //             const schedules = await fetchSchedulesTimes(selectedDate);
    //             setTimes(schedules);
    //         } else {
    //             setTablesReservations([]);
    //             setFilteredTablesReservations([]);
    //             setExpandedTablesReservations([]);
    //             setTimesReservations([]);
    //             setFilteredTimesReservations([]);
    //             setExpandedTimesReservations([]);
    //             setNamesReservations([]);
    //             setFilteredNamesReservations([]);
    //             setExpandedNamesReservations([]);
    //             setIdsReservations([]);
    //             setFilteredIdsReservations([]);
    //             setExpandedIdsReservations([]);
    //             setTimes([]);
    //             setLoading(false);
    //             setSelectedDateEmpty(true);
    //         }
    //     };
    
    //     fetchSchedules();
    // }, [selectedDate]);

    // useEffect(() => {

    //     const getTimeByIndex = (index) => {
    //         const foundTime = times.find(time => parseInt(time.id) === index);
    //         if (foundTime) {
    //             return foundTime.time;
    //         }
    //     };

    //     const fetchTablesData = async () => {

    //         const tablesReservationsData = [];
    //         for (let i = 1; i <= 10; i++) {
    //             const data = await fetchTable(i);
    //             tablesReservationsData.push(data);
    //             tablesReservationsData[i-1].reservations=[];
    //         }

    //         const fetchedReservations=await fetchReservations(selectedDate);
    //         for (let i=0;i<fetchedReservations.length;i++){
    //             let index=fetchedReservations[i].table_id-1;
    //             const { table_id, ...reservationData } = fetchedReservations[i];
    //             reservationData.startTime=getTimeByIndex(reservationData.startIndex);
    //             reservationData.endTime=getTimeByIndex(reservationData.endIndex);
    //             tablesReservationsData[index].reservations.push(reservationData);
    //         }

    //         for (let i=0;i<tablesReservationsData.length;i++){
    //             tablesReservationsData[i].reservations.sort((a, b) => {
    //                 if (a.startIndex < b.startIndex) {
    //                     return -1;
    //                 } else if (a.startIndex > b.startIndex) {
    //                     return 1;
    //                 } else {
    //                     return 0;
    //                 }
    //             });
    //         }
            
    //         setTablesReservations(tablesReservationsData);
    //         setFilteredTablesReservations(tablesReservationsData);
            
    //         const timesReservationsData=[];
    //         for (let i=0;i<times.length;i++){
    //             let reservations=[];
    //             for (let j=0;j<tablesReservationsData.length;j++){
    //                 for (let k=0;k<tablesReservationsData[j].reservations.length;k++){
    //                     if (times[i].id===tablesReservationsData[j].reservations[k].startIndex){
    //                         let reservation={};
    //                         reservation.tableId=tablesReservationsData[j].id;
    //                         reservation.endTime=tablesReservationsData[j].reservations[k].endTime;
    //                         reservation.name=tablesReservationsData[j].reservations[k].name;
    //                         reservation.phone=tablesReservationsData[j].reservations[k].phone;
    //                         reservation.reservation_id=tablesReservationsData[j].reservations[k].reservation_id;
    //                         reservation.accepted=tablesReservationsData[j].reservations[k].accepted;
    //                         reservation.canceled=tablesReservationsData[j].reservations[k].canceled;
    //                         reservations.push(reservation);
    //                     }
    //                 }
    //             }
    //             reservations.sort((a, b) => {
    //                 return a.name.localeCompare(b.name);
    //             });
    //             timesReservationsData.push({time:times[i].time,timeId:times[i].id,reservations});
    //         }

    //         console.log(timesReservationsData);
    //         setTimesReservations(timesReservationsData);
    //         setFilteredTimesReservations(timesReservationsData);

    //         let reservations=[];
    //         let counter=1;
    //         for (let i = 0; i < tablesReservationsData.length; i++) {
    //             for (let j = 0; j < tablesReservationsData[i].reservations.length; j++) {
    //                 let reservation={}
    //                 reservation.startTime = getTimeByIndex(tablesReservationsData[i].reservations[j].startIndex);
    //                 reservation.endTime = getTimeByIndex(tablesReservationsData[i].reservations[j].endIndex);
    //                 reservation.tableId=tablesReservationsData[i].id;
    //                 reservation.name=tablesReservationsData[i].reservations[j].name;
    //                 reservation.phone=tablesReservationsData[i].reservations[j].phone;
    //                 reservation.reservation_id=tablesReservationsData[i].reservations[j].reservation_id;
    //                 reservation.accepted=tablesReservationsData[i].reservations[j].accepted;
    //                 reservation.canceled=tablesReservationsData[i].reservations[j].canceled;
    //                 reservation.id=counter;
    //                 reservations.push(reservation);
    //                 counter++;
    //             }
    //         }

    //         const namesSortedReservations = [...reservations].sort((a, b) => {
    //             if ((a.accepted===undefined && a.canceled===undefined) && (b.accepted!==undefined || b.canceled!==undefined)){return -1;}
    //             else if ((b.accepted===undefined && b.canceled===undefined) && (a.accepted!==undefined || a.canceled!==undefined)){return 1;}
    //             if ((a.accepted!==undefined) && (b.canceled!==undefined)){return -1;}
    //             else if ((b.accepted!==undefined) && (a.canceled!==undefined)){return 1;}
    //             if (a.canceled===undefined && b.canceled!==undefined){return -1;}
    //             else if (a.canceled!==undefined && b.canceled===undefined){return 1;}
    //             else {return a.name.localeCompare(b.name);}
                
    //         });

    //         setNamesReservations(namesSortedReservations);
    //         setFilteredNamesReservations(namesSortedReservations);
            
    //         const idsSortedReservations = [...reservations].sort((a, b) => {
    //             if (a.reservation_id < b.reservation_id) {
    //                 return -1; 
    //             } else if (a.reservation_id > b.reservation_id) {
    //                 return 1; 
    //             } else {
    //                 return 0; 
    //             }
    //         });

    //         setIdsReservations(idsSortedReservations);
    //         setFilteredIdsReservations(idsSortedReservations);

    //         setLoading(false);
    //     };
    
    //     if (times && times.length > 0) {
    //         fetchTablesData();
    //     }
    // }, [times]);