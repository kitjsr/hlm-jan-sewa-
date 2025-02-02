import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonLabel, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from '@ionic/react';
import { useHistory } from 'react-router';
import './AdminDashboard.css';
import { jwtDecode } from 'jwt-decode';

const AdminDashboard: React.FC = () => {
  const [bookingsCount, setBookingsCount] = useState<number>(0);
  const history = useHistory();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);



  useEffect(() => {
    const fetchToken = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        setIsAuthenticated(true);
        const decodedToken: any = jwtDecode(token);

        setRole(decodedToken.role);
        
        console.log('Decoded Role:', decodedToken.role);
        if(decodedToken.role!=="admin"){
          history.push('/login');
        }
      } else {
        setIsAuthenticated(false);
        history.push('/login');
      }
    };
    fetchToken();
  }, [history]);
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
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Bookings</IonCardTitle>
            <IonCardSubtitle>Overview of Bookings</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <div className="dashboard-info">
              <IonLabel>Number of Bookings:</IonLabel>
              <h1>{bookingsCount}</h1>
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
