import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonText, IonItem, IonLabel, IonCard, IonToolbar, IonTitle, IonHeader, IonButtons, IonMenuButton } from '@ionic/react';
import './Booking.css';
// Define the type for a booking
interface Booking {
  bookingType: string;
  disease: String;
  from: String;
  to: String;
  occasion: String;
  name: string;
  mobile: string;
  email: string;
  date: string;
  block: string;
  panchayat: string;
  village: string;
  referenceName: string;
  referenceMobile: string;
  status: boolean;
  currentStatus: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

// Status map to display readable status
const statusMap = ['Under Process', 'Processing', 'Done', 'Cancelled'];

// Color map for current status
const statusColorMap: { [key: string]: string } = {
  0: 'primary',    // Under Process
  1: 'warning',    // Processing
  2: 'success',    // Done
  3: 'danger'      // Cancelled
};

const Track: React.FC = () => {
  const [mobile, setMobile] = useState<string>(''); // Type for mobile is string
  const [bookings, setBookings] = useState<Booking[] | null>(null); // bookings is an array or null
  const [error, setError] = useState<string>(''); // Error is a string
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  // Mobile number validation regex for 10 digits
  const mobileRegex = /^[0-9]{10}$/;

  // Fetch bookings by mobile number
  const fetchBookings = async (mobile: string) => {
    setLoading(true);
    setError(''); // Clear any previous error
    try {
      const response = await fetch(`https://preenal.in/api/bookings/mobile/${mobile}`);
      const data = await response.json();
      console.log(data);

      // Check if the response has valid data
      if (data.length > 0) {
        // Sort bookings by createdAt in descending order
        const sortedBookings = data.sort((a: Booking, b: Booking) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setBookings(sortedBookings); // Set the sorted bookings data
      } else {
        setError('No bookings found for this mobile number!'); // Show error if no bookings
        setBookings(null);
      }
    } catch (err) {
      setError('Failed to fetch bookings');
      setBookings(null); // Clear the bookings if there's an error
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    // Validate if the mobile number is exactly 10 digits long
    if (!mobileRegex.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      setBookings(null); // Reset bookings if invalid
      return;
    }

    // Fetch bookings if the mobile number is valid
    fetchBookings(mobile);
  };

  // Disable the button if mobile number is invalid or empty
  const isMobileValid = mobileRegex.test(mobile);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Track Status</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* Input for Mobile Number */}
        <IonItem>
          <IonLabel position="floating" className='hlm'>Mobile मोबाइल</IonLabel>
          <IonInput value={mobile} onIonChange={e => setMobile(e.detail.value!)} maxlength={10} type="text" />
        </IonItem>

        {/* Search Button */}
        <IonButton expand="full" onClick={handleSearch} disabled={!isMobileValid}>
          Search
        </IonButton>

        {/* Error Message */}
        {error && <IonText color="danger"><p>{error}</p></IonText>}

        {/* Loading Spinner */}
        {loading && <IonText color="primary"><p>Loading bookings...</p></IonText>}

        {/* Display Bookings */}
        {/* Display Bookings */}
        {bookings && bookings.length > 0 && (
          bookings.map((booking) => {
            const statusIndex = parseInt(booking.currentStatus);
            return (
              <IonCard key={booking.id}>
                <IonItem>
                  <IonLabel><b>{booking.bookingType} Booking Details</b></IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>Name: {booking.name}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>Mobile मोबाइल: {booking.mobile}</IonLabel>
                </IonItem>
                {booking.email && (
                  <IonItem>
                    <IonLabel>Email: {booking.email}</IonLabel>
                  </IonItem>
                )}
                <IonItem>
                  <IonLabel>Date: {new Date(booking.date).toLocaleString()}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>Reference: {booking.referenceName || 'N/A'}, {booking.referenceMobile || 'N/A'}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel color={statusColorMap[statusIndex]}>
                    Current Status: {statusMap[statusIndex]}
                  </IonLabel>
                </IonItem>

                {/* Conditional rendering based on booking type */}
                {booking.bookingType === 'Ambulance' && (
                  <>
                    <IonItem>
                      <IonLabel>Disease: {booking.disease || 'N/A'}</IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel>From: {booking.from || 'N/A'}</IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel>To: {booking.to || 'N/A'}</IonLabel>
                    </IonItem>
                  </>
                )}

                {booking.bookingType === 'Water Tanker' && (
                  <IonItem>
                    <IonLabel>Occasion: {booking.occasion || 'N/A'}</IonLabel>
                  </IonItem>
                )}

              </IonCard>
            );
          })
        )}



        {/* If no bookings found */}
        {bookings && bookings.length === 0 && (
          <IonText color="warning"><p>No bookings found for this mobile number.</p></IonText>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Track;
