import React, { useReducer, useState } from 'react';
import { Outlet, Route, Routes } from "react-router-dom";

import {fetchAPI, submitAPI} from "../api.js";

import Home from './Home';
import BookingForm from './BookingForm';



const twoDigits  = (value) => ((value < 10) ? '0' + value : value);
const dateStr    = (date)  => (
    date.getFullYear()
  + '-' + twoDigits(date.getMonth() + 1)
  + '-' + twoDigits(date.getDate())
);
const today      = new Date();
const todayStr   = dateStr(today);
let   maxDateStr = '';

/*****************************************************************************/
/* Build 7 days worth of booking times                                       */
/*****************************************************************************/

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
      return action.default;
    }
  };
};

const intializeAvailableTimes = () => {
  const initAvailableTimes = {};
  initAvailableTimes[todayStr] = [].concat(fetchAPI(today));
  const newDate = new Date();
  for (let i = 1; i < 8; i++) {
    newDate.setDate(today.getDate() + i);
    const newDateStr = dateStr(newDate);

    if (i === 7) {  maxDateStr = newDateStr; }

    initAvailableTimes[newDateStr] = [].concat(fetchAPI(newDate));
  }

  return initAvailableTimes;
};

/*****************************************************************************/

const Main = () => {

  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMsg,  setSuccessMsg]  = useState('There was an issue reverving your table. Please try again.');

  const [availableTimes, reduceAvailableTimes] = useReducer(
    timeReducer
  , null
  , intializeAvailableTimes
  );

  const initialBooking = {
    date:        todayStr
  , time:        availableTimes[todayStr][0]
  , numOfGuests: 0
  , occasion:    ''
  };

  const [currentBooking, updateCurrentBooking] = useReducer(
    bookingReducer
  , initialBooking
  );

  const onBookingSubmit = () => {
    if (submitAPI()) {
      setSuccessMsg('Booking successfull');
      reduceAvailableTimes(currentBooking);
    }
    setOpenSuccess(true);
  };

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
              message={successMsg}
              setOpenSuccess={setOpenSuccess}
              openSuccess={openSuccess}
              defaultBooking={initialBooking}
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