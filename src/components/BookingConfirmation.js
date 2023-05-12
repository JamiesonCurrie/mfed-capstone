import ReactModal from "react-modal";

const BookingConfirmation = (props) => {
  const currentBooking = props.currentBooking;
  return (
    <ReactModal
      isOpen={props.openState}
      contentLabel="Booking Confirmation"
      className='myConfirmModal'
      overlayClassName='myConfirmOverlay'
    >
      <h1>Confirm Booking ?</h1>
      <p>Finish booking your table!</p>
      <h2>Details:</h2>
      <h3>Number of Guests: </h3><nobr>{currentBooking.numOfGuests}</nobr>
      <h3>Date: </h3><nobr>{currentBooking.date}</nobr>
      <h3>Time: </h3><nobr>{currentBooking.time}</nobr>
      <h3>Occasion: </h3><nobr>{currentBooking.occasion}</nobr>
      <br/>
      <button id="confirmBtn" onClick={props.confirm}>Confirm</button>
      <button id="cancelBtn" onClick={props.cancel}>Cancel</button>
    </ReactModal>
  );
};

export default BookingConfirmation;