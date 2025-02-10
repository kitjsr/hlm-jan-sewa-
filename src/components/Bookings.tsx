import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonLoading, IonText, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonIcon, IonRefresher, IonRefresherContent, IonButton } from '@ionic/react';
import { checkmarkCircle, time, checkmark, closeCircle, logoWhatsapp, car, water, refreshCircle } from 'ionicons/icons';
import axios from 'axios';

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updatingStatus, setUpdatingStatus] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const statusMap = ['Under Process', 'Processing', 'Done', 'Cancelled'];
  const iconMap = [checkmarkCircle, time, checkmark, closeCircle]; // Icon mapping based on status

  // Booking Type Icons
  const bookingTypeIcons = {
    Ambulance: car, // Use car icon for Ambulance
    WaterTanker: water // Use water icon for WaterTanker
  };

  // Fetch bookings data
  const fetchBookings = async () => {
    setLoading(true); // Ensure loading is set to true when refreshing
    try {
      const response = await axios.get('https://preenal.in/api/bookings');
      setBookings(response.data);
      console.log(response.data);
    } catch (error) {
      setError('Error fetching bookings');
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  // Modify the currentStatus of a booking
  const updateCurrentStatus = async (id: string, newStatus: string) => {
    setUpdatingStatus(true);
    try {
      await axios.put(`https://preenal.in/api/bookings/${id}`, {
        currentStatus: newStatus
      });

      setBookings(bookings.map(booking =>
        booking.id === id ? { ...booking, currentStatus: newStatus } : booking
      ));
    } catch (error) {
      setError('Error updating status');
      console.error('Error updating status:', error);
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Function to handle pull-to-refresh
  const doRefresh = async (event: CustomEvent) => {
    await fetchBookings(); // Fetch bookings when refreshing
    event.detail.complete(); // End the refresh animation
  };
  // Function to handle manual refresh button
  const handleManualRefresh = async () => {
    await fetchBookings(); // Fetch bookings when refresh button is clicked
  };
  useEffect(() => {
    fetchBookings(); // Initial fetch of bookings data
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Bookings</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonLoading isOpen={loading} message="Fetching bookings..." />
        {error && <IonText color="danger"><p>{error}</p></IonText>}

        <IonRefresher slot="fixed" pullMin={100} pullMax={200} onIonRefresh={doRefresh}>
          <IonRefresherContent />
        </IonRefresher>
   {/* Refresh button */}
   <IonButton onClick={handleManualRefresh} expand="block" color="primary" className="refresh-button">
          <IonIcon icon={refreshCircle} slot="start" />
          Refresh Bookings
        </IonButton>
        <IonList>
          {/* Reverse the bookings array before rendering */}
          {bookings.slice().reverse().map(booking => (
            <IonItem key={booking.id}>
              <IonLabel>
                <h2>{booking.name}</h2>
                {booking.email && <p>E-Mail : {booking.email}</p>}

                <p>
                  Status :  &nbsp;
                  <IonIcon icon={iconMap[booking.currentStatus]} color="primary" /> 
                  &nbsp; {statusMap[booking.currentStatus]}
                </p>
                <p>
                  Booking Type :  &nbsp;
                  <IonIcon icon={bookingTypeIcons[booking.bookingType.replace(/\s+/g, '')]} color="secondary" /> 
                  &nbsp; {booking.bookingType}
                </p>
                <p>Mobile : <a href={`tel:${booking.mobile}`}>{booking.mobile}</a></p>
                <p>Date : {new Date(booking.date).toLocaleString()}</p>
                {booking.bookingType==="Ambulance" && <><p>From : {booking.from}</p> <p>To : {booking.to}</p></>}
                {booking.bookingType==="Water Tanker" && <><p>Occasion : {booking.occasion}</p></>}
                <p>Address : {booking.village}, {booking.panchayat}, {booking.block}</p>
                <p>Reference : {booking.referenceName}, {booking.referenceMobile}</p>

                {/* IonSelect for changing status */}
                <IonSelect
                  value={booking.currentStatus !== undefined ? booking.currentStatus : 0} // default to 'Under Process' (index 0)
                  onIonChange={(e) => updateCurrentStatus(booking.id, e.detail.value)}
                  disabled={updatingStatus || loading} // Disable while updating or loading
                >
                  {statusMap.map((status, index) => (
                    <IonSelectOption key={index} value={index}>{status}</IonSelectOption>
                  ))}
                </IonSelect>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Bookings;
