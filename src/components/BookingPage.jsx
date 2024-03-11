import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';


const BookingPage = () => {
  const [selectedTier, setSelectedTier] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const tiers = [
    { id: 1, name: 'Basic', description: 'Standard charge for everyday EV needs', price: 20 },
    { id: 2, name: 'Standard', description: 'Faster speeds for efficient EV charging', price: 40  },
    { id: 3, name: 'Premium', description: 'Top-tier service for maximum charging speed', price: 90 }
  ];
  
  const handleTierSelect = (tierId) => {
    setSelectedTier(tierId);
  };

  const handleBookSlot = () => {
    // logic for sending to backend + stuff goes before this
    if(selectedDate && selectedTier){
      const readableDate = format(selectedDate, "MMMM d, yyyy h:mm aa");
      let tierString = ""
      if (selectedTier === 1){
        tierString = "Basic"
      }
      else if(selectedTier === 2){
        tierString = "Standard"
      }
      else if(selectedTier === 3){
        tierString = "Premium"
      }
      let successString = `Success! Booked slot for ${readableDate} using ${tierString} Tier!`
      toast.success(successString, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
        });
    }
    else {
      toast.error("Please select a date and tier first.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
        });
    }

  }

  return (
    <div className='booking-main-container'>
    <div className='booking-page-container'>
      <section className='tier-section'>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
        <h2>Select a Tier</h2>
        <div className='tiers-container'>
          <div className='tiers-container'>
        {tiers.map(tier => (
          <div key={tier.id} className={`tier-item ${tier.id === selectedTier ? 'selected' : ''}`}>
            <h2 className='tier-title'>{tier.name}</h2>
            <h1 style={{marginTop: '-0.6em'}}>${tier.price}</h1>
            <div className='tier-description'>{tier.description}</div>
            <button className='tier-btn' onClick={() => handleTierSelect(tier.id === selectedTier ? null : tier.id)}>
              {tier.id === selectedTier ? `Selected ${tier.name.toUpperCase()}` : `Select ${tier.name.toUpperCase()}`}
            </button>
          </div>
  ))}
</div>
        </div>
      </section>
      <section>
        <h2>Select a Timeslot</h2>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          showTimeSelect
          timeIntervals={15} 
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </section>
      <div style={{marginTop: '1em'}}>
        <button onClick={handleBookSlot}>Book Slot</button>
      </div>
    </div>
    </div>
  );
};

export default BookingPage;
