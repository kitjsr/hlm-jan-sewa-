import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonText, IonItem, IonLabel, IonCard, IonToolbar, IonTitle, IonHeader, IonButtons, IonMenuButton, IonRow, IonGrid, IonCol } from '@ionic/react';

const Contact: React.FC = () => {
 
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Contact Us</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonGrid>
        <IonRow>
          <IonCol>
            <p>Address : Chilgu, NH-33, Seraikella-Kharsawan, Jharkhand</p>
            <p>Mobile : <a href="tel:9155339187">9155339187</a></p>
            <p>E-Mail : <a href="mailto:hlmjanseva@gmail.com">hlmjanseva@gmail.com</a></p>
          </IonCol>
        </IonRow>
      </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Contact;
