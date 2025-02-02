import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonLoading, IonText, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonIcon } from '@ionic/react';
import { checkmarkCircle, time, checkmark, closeCircle, logoWhatsapp, car, water } from 'ionicons/icons';
import axios from 'axios';

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updatingStatus, setUpdatingStatus] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const statusMap = ['Booked', 'Processing', 'Done', 'Cancelled'];
  const iconMap = [checkmarkCircle, time, checkmark, closeCircle]; // Icon mapping based on status

  // Booking Type Icons
  const bookingTypeIcons = {
    Ambulance: car, // Use car icon for Ambulance
    WaterTanker: water // Use water icon for WaterTanker
  };

  // Fetch bookings data
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('https://preenal.in/api/bookings');
        setBookings(response.data);
      } catch (error) {
        setError('Error fetching bookings');
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

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
                {/* <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-ambulance" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <circle cx="7" cy="17" r="2" /> <circle cx="17" cy="17" r="2" /> <path d="M5 17h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" /> <path d="M6 10h4m-2 -2v4" /> </svg> */}
                <p>
                  Booking Type :  &nbsp;
                  <IonIcon icon={bookingTypeIcons[booking.bookingType.replace(/\s+/g, '')]} color="secondary" /> 
                  &nbsp; {booking.bookingType}
                </p>
                <p>Mobile : <a href={`tel:${booking.mobile}`}>{booking.mobile}</a></p>
                <p>Date : {new Date(booking.date).toLocaleString()}</p>
                <p>Address : {booking.village}, {booking.panchayat}, {booking.block}</p>
                <p>Reference : {booking.referenceName}, {booking.referenceMobile}</p>

                {/* IonSelect for changing status */}
                <IonSelect
                  value={booking.currentStatus !== undefined ? booking.currentStatus : 0} // default to 'Booked' (index 0)
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
