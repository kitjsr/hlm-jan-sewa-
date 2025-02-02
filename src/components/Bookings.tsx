import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonList, IonItem, IonLabel, IonButton, IonSelect, IonSelectOption, IonLoading, IonText, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from '@ionic/react';
import axios from 'axios';

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updatingStatus, setUpdatingStatus] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const statusMap = ['Booked', 'Processing', 'Done', 'Cancelled'];

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
          {bookings.map(booking => (
            <IonItem key={booking.id}>
              <IonLabel>
                <h2>{booking.name}</h2>
                <p>Email: {booking.email}</p>
                <p>Status: {statusMap[booking.currentStatus]}</p>
                <p>Mobile: {booking.mobile}</p>
                <p>Date: {new Date(booking.date).toLocaleString()}</p>

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
