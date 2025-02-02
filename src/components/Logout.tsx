import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'; // For navigation after logout


const Logout = () => {
  const history = useHistory();

  const handleLogout = () => {
    // Remove the token from localStorage to log the user out
    localStorage.removeItem('authToken');
    console.log('Logged out successfully');
    // window.location.reload();
    // Redirect to login page or home
    history.push('/login');
  };

  useEffect(() => {
    handleLogout();
    // Remove the token from localStorage to log the user out
    localStorage.removeItem('authToken');
    console.log('Logged out successfully');
    // window.location.reload();
    // Redirect to login page or home
    history.push('/login');
  }, []); // Empty dependency array to run only once (on mount and unmount)
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {/* <IonMenuButton /> */}
          </IonButtons>
          <IonTitle>Logout </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>

                <IonButton expand="full" onClick={handleLogout}>
                  Logout
                </IonButton>
              </IonItem>



            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Display loader when login is successful */}

      </IonContent>
    </IonPage>
  );
};

export default Logout;
