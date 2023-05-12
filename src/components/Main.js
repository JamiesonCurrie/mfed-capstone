import React, { useReducer } from 'react';
import { Outlet, Route, Routes } from "react-router-dom";

import Home from './Home';
import BookingForm from './BookingForm';


const twoDigits = (value) => ((value < 10) ? '0' + value : value);
const seatingTimes = [
  '17:00'
, '18:00'
, '19:00'
, '20:00'
, '21:00'
, '22:00'
];
const today    = new Date();
const todayStr = today.getFullYear() + '-' + twoDigits(today.getMonth() + 1) + '-' + twoDigits(today.getDate());
let   maxDateStr;
/*****************************************************************************/
/* Build 7 days worth of booking times                                       */
/*****************************************************************************/
const intializeAvailableTimes = () => {
  const initAvailableTimes = {};
  initAvailableTimes[todayStr] = [].concat(seatingTimes);

  const newDate = new Date();
  for (let i = 1; i < 8; i++) {
    newDate.setDate(today.getDate() + i);
    const newDateStr = '' + newDate.getFullYear()
    + '-' + twoDigits(newDate.getMonth() + 1)
    + '-' + twoDigits(newDate.getDate())
    ;
    if (i === 7) {  maxDateStr = newDateStr; }

    initAvailableTimes[newDateStr] = [].concat(seatingTimes);
  }

  return initAvailableTimes;
};

const initialBooking = {
  date:        todayStr
, time:        seatingTimes[0]
, numOfGuests: 0
, occasion:    ''
};

/*****************************************************************************/

const timeReducer = (state, action) => {
  const newTimes = state[action.date].filter(
    (time) => (time !== action.time)
  );
  return {
    ...state
  , [action.date]: (newTimes.length > 0) ? [].concat(newTimes) : null
  };
};

const bookingReducer = (state, action) => {
  switch (action.type) {
    case 'date': {
      return {...state, date: action.value};
    }
    case 'time': {
      return {...state, time: action.value};
    }
    case 'numOfGuests': {
      return {...state, numOfGuests: action.value};
    }
    case 'occasion': {
      return {...state, occasion: action.value};
    }
    case 'all':
    default: {
      return {
        date:        todayStr
      , time:        seatingTimes[0]
      , numOfGuests: 0
      , occasion:    ''
      };
    }
  };
};

/*****************************************************************************/

const Main = () => {
  const [availableTimes, reduceAvailableTimes] = useReducer(
    timeReducer
  , null
  , intializeAvailableTimes
  );
  const [currentBooking, updateCurrentBooking] = useReducer(
    bookingReducer
  , initialBooking
  );

  const onBookingSubmit = () => reduceAvailableTimes(currentBooking);

  return (
    <main>
      <Routes>
        <Route exact path='/' element={ <Home /> } />
        <Route
          exact
          path="/booking"
          element={
            <BookingForm
              todayStr={todayStr}
              maxDateStr={maxDateStr}
              availableTimes={availableTimes}
              onSubmit={onBookingSubmit}
              currentBooking={currentBooking}
              updateBooking={updateCurrentBooking}
            />
          }
        />
        <Route path=":slug" element={ <Home /> } />
      </Routes>
      <Outlet />
    </main>
  );
};

export default Main;