import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonLabel, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from '@ionic/react';
import { useHistory } from 'react-router';
import './AdminDashboard.css';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
const statusMap = ['Under Process', 'Processing', 'Done', 'Cancelled'];
interface Booking {
  block: string;
  panchayat: string;
  village: string;
  currentStatus: string;
}
const AdminDashboard: React.FC = () => {
  const [bookingsCount, setBookingsCount] = useState<number>(0);
  const history = useHistory();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [report, setReport] = useState<any>({
    blockwise: {},
    panchayatwise: {},
    villagewise: {}
  });

  const [statusCounts, setStatusCounts] = useState<{ [key: number]: number }>({});
  const [animatedCounts, setAnimatedCounts] = useState([0, 0, 0, 0]);

  useEffect(() => {
    if (statusCounts) {
      const interval = setInterval(() => {
        setAnimatedCounts((prevCounts) =>
          prevCounts.map((count, index) => {
            if (count < statusCounts[index]) {
              return count + 1;
            }
            return count;
          })
        );
      }, 50); // Adjust speed of animation

      return () => clearInterval(interval); // Clean up on component unmount
    }
  }, [statusCounts]);

  const getBackgroundColor = (status: any) => {
    switch (status) {
      case 'Under Process':
        return '#f0ad4e'; // Amber
      case 'Processing':
        return '#5bc0de'; // Light blue
      case 'Done':
        return '#5cb85c'; // Green
      case 'Cancelled':
        return '#d9534f'; // Red
      default:
        return '#ffffff'; // Default white background
    }
  };

  useEffect(() => {
    // Fetch data from the API
    axios.get("https://preenal.in/api/bookings")
      .then(response => {
        setBookings(response.data);
        console.log(response.data);
        generateTotalCount(response.data);
        setBookingsCount(response.data.length);


      })
      .catch(err => console.error(err));

  }, []);

  

  // Function to generate the report
  const generateTotalCount = (data: any) => {
    // Count the currentStatus values
    const statusCountMap = data.reduce((acc: { [key: string]: number }, booking: { currentStatus: any; }) => {
      const status = booking.currentStatus;
      acc[status] = acc[status] ? acc[status] + 1 : 1;
      return acc;
    }, {});

    setStatusCounts(statusCountMap);
  };


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
        <IonCard>
                  <IonCardContent>
                    {/* Displaying status counts */}
                    <div>
        
                      <ul className="status-list">
                        {statusMap.map((status, index) => (
                          <li key={index} className="status-item" style={{ backgroundColor: getBackgroundColor(status) }}>
                            <div className="circle">
                              <span className="count">{animatedCounts[index] || 0}</span>
                            </div>
                            <span>{status}</span>
                          </li>
                        ))}
                      </ul>
        
                    </div>
                  </IonCardContent>
                </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default AdminDashboard;
