import React, { useEffect, useRef, useState } from 'react';
import '../styles/Reservations.css';
import { cancelReservationByTableNumber, completeReservationByTableNumber, dateExists, fetchDateInfo, fetchInfo, updateReservation} from './firebase.utils';
import { ClockLoader } from 'react-spinners';
import CalendarYearly from './CalendarYearly';
import { Link } from 'react-router-dom';
import DropdownMenu from './DropdownMenu'

const sortByImg = '../icons/sort_by.png';
const calendarOpenImg = '../icons/calendar-open-blue.png';
const calendarClosedImg = '../icons/calendar-closed-blue.png';
const reservationsClosedImg = '../icons/reservation-blue.png'
const reservationsOpenImg = '../icons/reservation-open-blue.png'
const ordersClosedImg = '../icons/orders-blue.png'
const ordersOpenImg = '../icons/orders-blue-open.png'

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

    const [showPopup, setShowPopup] = useState(false);

    // Function to toggle popup visibility
    const toggleStatePopup = (currentReservation) => {

        setShowPopup(!showPopup);
        setCurrentReservation(currentReservation);

    };

    const updateReservationState = async (state) => {

        currentReservation.state = state;

        const response = await updateReservation(collectionKey, selectedDate, currentReservation);
        console.log(response);
        toggleStatePopup(currentReservation);

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

                setIdsReservations(response[3]);
                setFilteredIdsReservations(response[3]);
                setTimesReservations(response[4]);
                setFilteredTimesReservations(response[4]);
                setNamesReservations(response[5]);
                setFilteredNamesReservations(response[5]);
                setTablesReservations(response[6]);
                setFilteredTablesReservations(response[6]);
                console.log(response[6])
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
                        {showPopup && (
                            <div className="popup-window" onClick={() => toggleStatePopup(null)}>
                                <div className='popup-window-items' onClick={(e) => e.stopPropagation()}>
                                {states.map(state => (
                                    <div key={state.id} className='popup-window-item' onClick={() => updateReservationState(state.id)}>
                                        <img className='state-img' src={state.imgSrc} alt={state.title} />
                                        <p className='state-title'>{state.title}</p>
                                    </div>
                                ))}
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