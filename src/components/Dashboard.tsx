import React from "react";
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
} from "@ionic/react";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination"; // Import Pagination styles
import "swiper/css/navigation"; // Import Navigation styles
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
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle>Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Swiper carousel */}
        <Swiper {...slideOpts}  modules={[Navigation, Pagination]} >
          <SwiperSlide>
            <img
              src="https://via.placeholder.com/600x300/FF0000/FFFFFF?text=Slide+1"
              alt="Slide 1"
              style={{ width: "100%", height: "auto" }} // Ensure image covers full width
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://via.placeholder.com/600x300/00FF00/FFFFFF?text=Slide+2"
              alt="Slide 2"
              style={{ width: "100%", height: "auto" }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://via.placeholder.com/600x300/0000FF/FFFFFF?text=Slide+3"
              alt="Slide 3"
              style={{ width: "100%", height: "auto" }}
            />
          </SwiperSlide>
        </Swiper>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
