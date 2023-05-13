import { useReducer, useState } from "react";
import BookingConfirmation from './BookingConfirmation';
import BookingWarning from "./BookingWarning";

const warningReducer = (state, action) => {
  if (action.type === 'push') {
    return [...state, {
      key:  action.key
    , text: action.text
    }];
  }
  else if (action.type === 'pop') {
    return state.filter((item) => (action.key !== item.key));
  }

  return [];
};

const BookingForm = (props) => {

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [warnings,    reduceWarnings] = useReducer(warningReducer, []);

  const checkFormFields = (e) => {
    e.preventDefault();

    reduceWarnings({type:''});

    let warningCheck = false;
    if (props.currentBooking.numOfGuests < 1) {
      reduceWarnings({
        type: 'push'
      , key:  'guests'
      , text: 'Please select the number of guests.'
      });
      warningCheck = true;
    }
    if (!props.currentBooking.occasion) {
      reduceWarnings({
        type: 'push'
      , key:  'occasion'
      , text: 'Please enter the occasion.'
      });
      warningCheck = true;
    }

    (warningCheck)
    ? setOpenWarning(true)
    : setOpenConfirm(true)
    ;
  };

  const confirmBooking = () => {
    props.onSubmit();
    props.updateBooking({type: 'all'});
    setOpenConfirm(false);
  };

  return (
    <form onSubmit={checkFormFields}>
      <BookingConfirmation
        openState={openConfirm}
        cancel={() => setOpenConfirm(false)}
        confirm={confirmBooking}
        currentBooking={props.currentBooking}
      />
      <BookingWarning
        openState={openWarning}
        cancel={() => setOpenWarning(false)}
        warnings={warnings}
      />
      <fieldset>
        <legend><h2>Reserve a Table</h2></legend>
        <h3>Booking Until: <nobr>{props.maxDateStr}</nobr></h3>
        <label htmlFor='res-date'>Date: </label>
        <input
          type="date"
          id='res-date'
          value={props.currentBooking.date}
          min={props.todayStr}
          max={props.maxDateStr}
          onChange={(e) => props.updateBooking({
            type: 'date'
          , value: e.target.value
          })}
        />
        <label htmlFor='res-time'>Time: </label>
        <select
          id='res-time'
          value={props.currentBooking.time}
          onChange={(e) => props.updateBooking({
            type: 'time'
          , value: e.target.value
          })}
        >
          {props.availableTimes[props.currentBooking.date].map(
            (time) => (
              <option key={time} value={time}>{time}</option>
            )
          )}
        </select>
        <label htmlFor='res-occasion'>Occasion:</label>
        <input
          type="text"
          id='res-occasion'
          maxLength={25}
          value={props.currentBooking.occasion}
          onChange={(e) => props.updateBooking({
            type: 'occasion'
          , value: e.target.value
          })}
        />
        <label htmlFor='res-guests'>Number of Guests:</label>
        <label htmlFor='res-guests' id='guests-state'>{props.currentBooking.numOfGuests}</label>
        <input
          id='res-guests'
          value={props.currentBooking.numOfGuests}
          type="range"
          min={0}
          max={10}
          onChange={(e) => props.updateBooking({
            type: 'numOfGuests'
          , value: e.target.value
          })}
        />
        <input type="submit" value="Confirm Reservation" />
      </fieldset>
    </form>
  );
};

export default BookingForm;