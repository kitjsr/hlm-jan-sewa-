import React from "react";
import './Dashboard.css';  // Import the CSS file for styling
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
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination"; // Import Pagination styles
import "swiper/css/navigation"; // Import Navigation styles
import slide1 from '../../resources/hlm1.jpg'; // Import the image
import slide2 from '../../resources/hlm2.jpg'; // Import the image
import slide3 from '../../resources/hlm3.jpg'; // Import the image
// import ambulance from '../../resources/ambulance.png'; // Import the image
const slideOpts = {
  loop: true, // Enable looping of slides
  spaceBetween: 10, // Space between slides
  slidesPerView: 1, // Number of slides to show per view
  autoplay: {
    delay: 1500, // Auto-slide every 1.5 seconds
    disableOnInteraction: false, // Allow autoplay to continue after user interaction
  },
  pagination: {
    clickable: true, // Enable pagination
  },
  navigation: true, // Enable next/prev navigation buttons
};
const Dashboard: React.FC = () => {
  return (
    <IonPage>


      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle>Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Swiper carousel */}
        <Swiper {...slideOpts} modules={[Navigation, Pagination]} >
          <SwiperSlide>
            <img
              src={slide3}
              alt="Slide 1"
              style={{ width: "100%", height: "auto" }} // Ensure image covers full width
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={slide1}
              alt="Slide 1"
              style={{ width: "100%", height: "auto" }} // Ensure image covers full width
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
              <div className="vehicle ambulance"></div>
              <div className="vehicle water-tank"></div>
            </div>
          </div>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
