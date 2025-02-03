import React from "react";
import './Dashboard.css';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonGrid,
  IonRow,
  IonButton,
  IonCol,
} from "@ionic/react";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper core and required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay'; // Import the autoplay styles
import slide1 from '../../resources/hlm1.jpg';
import slide2 from '../../resources/hlm2.jpg';
import slide3 from '../../resources/hlm3.jpg';

const slideOpts = {
  loop: true,
  spaceBetween: 10,
  slidesPerView: 1,
  autoplay: {
    delay: 1800, // Auto-slide every 0.5 seconds
    disableOnInteraction: false, // Continue autoplay after user interaction
  },
  pagination: {
    clickable: true,
  },
  navigation: false,
};

const Dashboard: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>HLM जन सेवा</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* Swiper carousel */}
        <Swiper
          {...slideOpts}
          modules={[Navigation, Pagination, Autoplay]} // Include Autoplay here
        >
          <SwiperSlide>
            <img
              src={slide3}
              alt="Slide 1"
              style={{ width: "100%", height: "auto" }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={slide1}
              alt="Slide 1"
              style={{ width: "100%", height: "auto" }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={slide2}
              alt="Slide 2"
              style={{ width: "100%", height: "auto" }}
            />
          </SwiperSlide>
        </Swiper>
        <IonGrid>
          <IonRow>
            <IonCol size="12" className="ion-text-center">
              <IonButton routerLink="/Booking">Book Now</IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" className="ion-text-center">
              <IonButton routerLink="/Track" color="warning">Check Booking Status</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid>
          <div className="app-container">
            <div className="road">
              <div className="first-line"></div>
              <div className="vehicle ambulance"></div>
              <div className="middle-line"></div>
              <div className="vehicle water-tank"></div>
              <div className="second-line"></div>
            </div>
          </div>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
