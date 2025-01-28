import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonLabel } from '@ionic/react';
import { useHistory } from 'react-router';
import './AdminDashboard.css';

const AdminDashboard: React.FC = () => {
  const [bookingsCount, setBookingsCount] = useState<number>(0);
  const history = useHistory();

  useEffect(() => {
    // Fetch the bookings count from the API
    const fetchBookingsCount = async () => {
      try {
        const response = await fetch('https://preenal.in/api/bookings/count/count');
        const data = await response.json();

        // Assuming the response is in the form { count: number }
        setBookingsCount(data.count);
      } catch (error) {
        console.error('Error fetching bookings count:', error);
      }
    };

    fetchBookingsCount();
  }, []);

  const handleViewAllBookings = () => {
    // Navigate to the bookings page
    console.log('Navigating to All Bookings');
    history.push('/Bookings');
  };

  return (
    <IonPage>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Admin Dashboard</IonCardTitle>
            <IonCardSubtitle>Overview of Bookings</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <div className="dashboard-info">
              <IonLabel>Number of Bookings:</IonLabel>
              <h2>{bookingsCount}</h2>
              <IonButton expand="full" onClick={handleViewAllBookings}>
                View All Bookings
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default AdminDashboard;
