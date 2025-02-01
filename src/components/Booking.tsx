import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonSelectOption,
  IonSelect,
  IonItem,
  IonLabel,
  IonDatetime,
  IonInput,
  IonButton,
  IonIcon,
  IonButtons,
  IonMenuButton,
  IonModal,
  IonToast,
} from "@ionic/react";
import axios from "axios";
import { fileTrayFullOutline, fileTrayFullSharp } from "ionicons/icons";
import ExploreContainer from "./ExploreContainer";

const Booking: React.FC = () => {
  const today = new Date();
  today.setDate(today.getDate() + 1); // Adds one day

  const tomorrow = today.toISOString().split('T')[0];
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedBlock, setSelectedBlock] = useState<string>('');
  const [selectedPanchayat, setSelectedPanchayat] = useState<string>('');
  const [selectedVillage, setSelectedVillage] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  // Add state for reference fields
  const [form, setForm] = useState({
    bookingType: '',  // Added bookingType field
    date: '',
    name: '',
    mobile: '',
    email: '',
    block: '',
    panchayat: '',
    village: '',
    referenceName: '', // New state for reference name
    referenceMobile: '', // New state for reference mobile
  });
  const [toast, setToast] = useState({
    message: '',
    duration: 2000,
    isOpen: false,
  });

  const data = [
    {
      blockName: "Nimdih",
      panchayats: [
        {
          panchayatName: "Chaliyama",
          villages: [
            { villageName: "चेलियामा दास बस्ती", population: 2000 },
            { villageName: "चालियामा", population: 2000 },
            { villageName: "चेलियामा मेनरोड", population: 2000 },
            { villageName: "चेलियामा गोराई बस्ती", population: 2000 },
            { villageName: "चेलियामा बंगाली बस्ती", population: 2000 },
            { villageName: "चेलियामा माडा़ई कुली", population: 2000 },
            { villageName: "बारुडीह ", population: 2000 },
            { villageName: "बाँधडीह", population: 2000 },
            { villageName: "वनकाटी", population: 2000 },
            { villageName: "हुचूकडीह", population: 2000 },
            { villageName: "डाहुबेडा", population: 2000 },
            { villageName: "पाथरडीह", population: 2000 },
            { villageName: "फारेंगा", population: 2000 },
            { villageName: "बाघाडीह", population: 2000 },
            { villageName: "पडाडीह", population: 2000 },
            { villageName: "काडालडीह", population: 2000 },
            { villageName: "जाहिरटांड", population: 2000 },
            { villageName: "बारडीह", population: 2000 },
            { villageName: "पादरबेडा", population: 2000 },
            { villageName: "सिमलडांगा", population: 2000 },
            { villageName: "बिन्दुबेडा", population: 2000 }
          ]
        },
        {
          panchayatName: "तिल्ला",
          villages: [
            { villageName: "तिल्ला", population: 2000 },
            { villageName: "जामडीह", population: 2000 },
            { villageName: "आमड़ाबेडा", population: 2000 },
            { villageName: "रेरेगंटाड", population: 2000 },
            { villageName: "होदागोडा", population: 2000 },
            { villageName: "दुमदमी", population: 2000 },
            { villageName: "सिरका", population: 2000 },
            { villageName: "डुगँरीडीह", population: 2000 },
            { villageName: "तांती सिरका", population: 2000 },
            { villageName: "बडतल सिरका", population: 2000 },
            { villageName: "काठाँलडीह", population: 2000 },
            { villageName: "कुशपुतुल", population: 2000 },
            { villageName: "पुरनाडीह", population: 2000 },
            { villageName: "आसनडीह", population: 2000 },
            { villageName: "डुगरीकुली", population: 2000 },
            { villageName: "लायाडीह", population: 2000 },
            { villageName: "वनगोड़ा", population: 2000 }
          ]
        },
        {
          panchayatName: "गुण्डा",
          villages: [
            { villageName: "गुण्डा नीच कुली", population: 2000 },
            { villageName: "गुण्डा उपर कुली", population: 2000 },
            { villageName: "काशीडीह", population: 2000 },
            { villageName: "वनघर", population: 2000 },
            { villageName: "सरदार पाड़ा ", population: 2000 },
            { villageName: "डीटांड", population: 2000 },
            { villageName: "सिमा नीच कूली", population: 2000 },
            { villageName: "सीमा बीच कूली", population: 2000 },
            { villageName: "मुदिडीह", population: 2000 },
            { villageName: "बालीगोड़ा", population: 2000 },
            { villageName: "रामनगर", population: 2000 },
            { villageName: "हदागोड़ा ", population: 2000 },
            { villageName: "कुरकुट वन", population: 2000 },
            { villageName: "लावा", population: 2000 },
            { villageName: "लावा पुरनाडीह", population: 2000 },
            { villageName: "बहराडीह", population: 2000 },
            { villageName: "पहाडधार", population: 2000 }
          ]
        },


        {
          panchayatName: "आदारडीह",
          villages: [
            { villageName: "रघुनाथपुर", population: 2000 },
            { villageName: "आदारडीह", population: 2000 },
            { villageName: "बैसटमडीह", population: 2000 },
            { villageName: "विशारडीह", population: 2000 },
            { villageName: "कामारटोला", population: 2000 },
            { villageName: "बोरडीह", population: 2000 },
            { villageName: "जुगीटोला", population: 2000 },
            { villageName: "सिधागोड़ा टोला", population: 2000 },
            { villageName: "कुरकुट वन टोला", population: 2000 },

          ]
        },
        {
          panchayatName: "टेंगाडीह",
          villages: [

            { villageName: "टेंगाडीह", population: 2000 },
            { villageName: "मातकमडीह", population: 2000 },
            { villageName: "घाघारी", population: 2000 },
            { villageName: "बेनाडीह", population: 2000 },
            { villageName: "राहेरडीह", population: 2000 },
            { villageName: "जांता", population: 2000 },
            { villageName: "जामडीह", population: 2000 },
            { villageName: "झरीडीह", population: 2000 },
            { villageName: "घोटाँड", population: 2000 },
            { villageName: "शशनडीह", population: 2000 },
            { villageName: "तेंतलो", population: 2000 },
            { villageName: "पाथरडीह", population: 2000 },
            { villageName: "रोबेडीह", population: 2000 },
            { villageName: "खडियाबस्ती", population: 2000 },
            { villageName: "बाधाडीह", population: 2000 },
            { villageName: "ओटोसिमुल", population: 2000 },
            { villageName: "रुपाडीह", population: 2000 },
            { villageName: "कामाडुलु", population: 2000 },
            { villageName: "जांता हरिजन टोला", population: 2000 },

          ]
        },
        {
          panchayatName: "झिमरी",
          villages: [

            { villageName: "झिमरी", population: 2000 },
            { villageName: "रुगड़ीकुली", population: 2000 },
            { villageName: "कानुकुली", population: 2000 },
            { villageName: "मलीकुली", population: 2000 },
            { villageName: "कारतारटांड", population: 2000 },
            { villageName: "कुम्हार कुली", population: 2000 },
            { villageName: "झिमरी कुली", population: 2000 },
            { villageName: "मकरुटांड", population: 2000 },
            { villageName: "नीमकुली", population: 2000 },
            { villageName: "बांधडीह", population: 2000 },
            { villageName: "पलाश बागान", population: 2000 },
            { villageName: "रामगढ़ टांड", population: 2000 },
            { villageName: "लोडीह", population: 2000 },
            { villageName: "झिमरी टोला", population: 2000 },
            { villageName: "मुरु ", population: 2000 },
            { villageName: "काशीकुली", population: 2000 },
            { villageName: "महुलटांड", population: 2000 },
            { villageName: "बेडाटोला", population: 2000 },

          ]
        },
        {
          panchayatName: "लुपुंगडीह",
          villages: [

            { villageName: "लुपुंगडीह", population: 2000 },
            { villageName: "बाँदकुली", population: 2000 },
            { villageName: "रोडकुली", population: 2000 },
            { villageName: "डुमरडीह", population: 2000 },
            { villageName: "जाहिरा", population: 2000 },
            { villageName: "चिगडीडीह", population: 2000 },
            { villageName: "ऊपर पितकी", population: 2000 },
            { villageName: "पितकी", population: 2000 },
            { villageName: "हरकिनटांड", population: 2000 },
            { villageName: "उहुकडीह", population: 2000 },
            { villageName: "बुरुडूगरी", population: 2000 },
            { villageName: "स्टेशन बस्ती", population: 2000 },
            { villageName: "बाना", population: 2000 },
            { villageName: "बातकम कोचा", population: 2000 },
            { villageName: "तनकोचा", population: 2000 },
          ]
        },
        {
          panchayatName: "लाकडी",
          villages: [


            { villageName: "लाकडी", population: 2000 },
            { villageName: "माकली टोला", population: 2000 },
            { villageName: "(बान्दु) डूँगरीडीह", population: 2000 },
            { villageName: "डुगरीपार", population: 2000 },
            { villageName: "तिलाईटांड ", population: 2000 },
            { villageName: "लेवाटांड", population: 2000 },
            { villageName: "बुरुडीह", population: 2000 },
            { villageName: "बागडी", population: 2000 },
            { villageName: "शान्तिपुर", population: 2000 },
            { villageName: "सालटांड", population: 2000 },
            { villageName: "बान्दु", population: 2000 },
            { villageName: "वनघर", population: 2000 },
            { villageName: "कादला", population: 2000 },
            { villageName: "शासनघर", population: 2000 },
            { villageName: "पुरियारा", population: 2000 },
            { villageName: "चाटुडुंगरी", population: 2000 },
          ]
        },
        {
          panchayatName: "चिंगडा पारकीडीह",
          villages: [


            { villageName: "चातरमा", population: 2000 },
            { villageName: "जुगिलौंग", population: 2000 },
            { villageName: "चिंगडा पारकीडीह", population: 2000 },
            { villageName: "हुण्डरु पाथरडीह", population: 2000 },
            { villageName: "हुचुकडीह", population: 2000 },
            { villageName: "आगोयटांड", population: 2000 },
            { villageName: "जोजोडीह", population: 2000 },
            { villageName: "कुमारडीह", population: 2000 },
            { villageName: "महतोडीह", population: 2000 },
            { villageName: "डाँगारडीह", population: 2000 },

          ]
        },
        {
          panchayatName: "गोरडीह",
          villages: [

            { villageName: "घुटियाडीह", population: 2000 },
            { villageName: "केतुंगा", population: 2000 },
            { villageName: "नीमडीह", population: 2000 },
            { villageName: "गोरडीह ", population: 2000 },
            { villageName: "संगीरा ", population: 2000 },
            { villageName: "बनडीह ", population: 2000 },
            { villageName: "लवाबेरा", population: 2000 },
            { villageName: "गोरीडीह", population: 2000 },
            { villageName: "रंगाटांड टोला", population: 2000 },
            { villageName: "बाँधटांड", population: 2000 },
          ]
        },
        {
          panchayatName: "सामानपुर",
          villages: [


            { villageName: "बामनी", population: 2000 },
            { villageName: "सामानपुर", population: 2000 },
            { villageName: "माकुला", population: 2000 },
            { villageName: "पुरनापानी", population: 2000 },
            { villageName: "हुरलुंग", population: 2000 },
            { villageName: "हाकासारा", population: 2000 },
            { villageName: "मुदीडीह", population: 2000 },
            { villageName: "राजागोड़ा", population: 2000 },
            { villageName: "ऊपरडीह", population: 2000 },
            { villageName: "तिलाटांड", population: 2000 },
            { villageName: "तेतुलघुटा", population: 2000 },
            { villageName: "माझीडीह", population: 2000 },
            { villageName: "बनडीह", population: 2000 },
            { villageName: "चिरुगोड़ा", population: 2000 },

          ]
        },
        {
          panchayatName: "बाडेदा",
          villages: [

            { villageName: "बाडेदा", population: 2000 },
            { villageName: "बुडिवासा टोला", population: 2000 },
            { villageName: "सरदारडीह", population: 2000 },
            { villageName: "हाटकुन्दा", population: 2000 },
            { villageName: "कुलटांड", population: 2000 },
            { villageName: "जुगिडीह", population: 2000 },
            { villageName: "धवडुँगरी", population: 2000 },
            { villageName: "भाटिंग", population: 2000 },
            { villageName: "बस्टमडुंरी", population: 2000 },
            { villageName: "निपानीया", population: 2000 },
            { villageName: "केन्दडी", population: 2000 },
            { villageName: "सब्बरपाड़ा", population: 2000 },
            { villageName: "ऊपरआहार", population: 2000 },
            { villageName: "बुरुगोड़ा", population: 2000 },
            { villageName: "डागाँर", population: 2000 },
            { villageName: "सियालगोड़ा", population: 2000 },
            { villageName: "काशीडीह", population: 2000 },
            { villageName: "रापकाटा", population: 2000 },
            { villageName: "भूषणडीह", population: 2000 },
            { villageName: "बुरूडीह", population: 2000 },
            { villageName: "मधुपुर", population: 2000 },
            { villageName: "केन्दडी टोला", population: 2000 },
            { villageName: "राजागोड़ा", population: 2000 },
            { villageName: "भागाँट", population: 2000 },
            { villageName: "राकांर", population: 2000 },
            { villageName: "बादटांड", population: 2000 },
            { villageName: "चिरूगोड़ा", population: 2000 },

          ]
        },
        {
          panchayatName: "हेवेन",
          villages: [


            { villageName: "अण्डा ", population: 2000 },
            { villageName: "रांगाडीह टोला", population: 2000 },
            { villageName: "हुटु ", population: 2000 },
            { villageName: "खेडवन", population: 2000 },
            { villageName: "कल्याणपुर ", population: 2000 },
            { villageName: "तिलाईटांड", population: 2000 },
            { villageName: "धातकीडीह", population: 2000 },
            { villageName: "वांधकुल्ही", population: 2000 },
            { villageName: "काशीपुर", population: 2000 },
            { villageName: "माझीडीह", population: 2000 },
            { villageName: "हेवेन", population: 2000 },
            { villageName: "हेवेन -2", population: 2000 },
            { villageName: "जामडीह कुल्ही", population: 2000 },
            { villageName: "टांडघर", population: 2000 },
            { villageName: "पाहड़धार", population: 2000 },
            { villageName: "काशीटांड", population: 2000 },
            { villageName: "मुरुगडीह", population: 2000 },
            { villageName: "माझीडीह", population: 2000 },
            { villageName: "वाइजनडीह", population: 2000 },
          ]
        }
      ],
    },
    {
      blockName: "Chandil",
      panchayats: [
        {
          panchayatName: "आसनबनी",
          villages: [
            { villageName: "शहरबेडा", population: 2000 },
            { villageName: "शहरबेडा -2", population: 2000 },
            { villageName: "शहरबेडा -3", population: 2000 },
            { villageName: "टुईलुगू ", population: 2000 },
            { villageName: "उदेलबेड़ा", population: 2000 },
            { villageName: "पाथरडीह ", population: 2000 },
            { villageName: "कान्दरबेडा ", population: 2000 },
            { villageName: "कान्दरबेडा -2", population: 2000 },
            { villageName: "आसनबनी", population: 2000 },
            { villageName: "आसनबनी -2", population: 2000 },
            { villageName: "खोलगोड़ा", population: 2000 },
            { villageName: "बिरीगोडा", population: 2000 },
            { villageName: "राहराडीह ", population: 2000 },
            { villageName: "रागाटांड ", population: 2000 },
            { villageName: "रामगढ़", population: 2000 },
            { villageName: "कालीमंदिर", population: 2000 },
            { villageName: "रागाटांड", population: 2000 },
            { villageName: "सरस्वती नगर", population: 2000 },
            { villageName: "तालगोड़ा ", population: 2000 },
            { villageName: "जामडीह", population: 2000 },
            { villageName: "साहीझरणा ", population: 2000 },
            { villageName: "फदलोगोड़ा -", population: 2000 },

          ]
        },
        {
          panchayatName: "BHADUDIH",
          villages: [

            { villageName: "BADALAKHA", population: 2000 },
            { villageName: "BHADUDIH", population: 2000 },
            { villageName: "CHOTALAKHA", population: 2000 },
            { villageName: "HUMID", population: 2000 },
            { villageName: "HUMSADA", population: 2000 },
            { villageName: "JARIYADIH", population: 2000 },
            { villageName: "MANIKUI", population: 2000 },
            { villageName: "GURADIH", population: 2000 },
            { villageName: "HARUDIH", population: 2000 },
            { villageName: "DHATKIDIH TOLA", population: 2000 },
            { villageName: "PATHARDIH", population: 2000 },
            { villageName: "KARAMGORA", population: 2000 },
            { villageName: "MUDIDIH", population: 2000 },

          ]
        },
        {
          panchayatName: "चिलगु",
          villages: [

            { villageName: "काठ़जोड़", population: 2000 },
            { villageName: "तुलिन", population: 2000 },
            { villageName: "कदमझोर", population: 2000 },
            { villageName: "बागलडीह", population: 2000 },
            { villageName: "भुईयाडीह", population: 2000 },
            { villageName: "करणीडीह", population: 2000 },
            { villageName: "सालगाडीह", population: 2000 },
            { villageName: "चिलगूडीह", population: 2000 },
            { villageName: "चाकुलिया", population: 2000 },
            { villageName: "चिलगु", population: 2000 },
            { villageName: "जनडीह", population: 2000 },
            { villageName: "माकुलाकोचा", population: 2000 },
            { villageName: "BHUIADIH", population: 2000 },
            { villageName: "PATHARDIH", population: 2000 },
            { villageName: "CHILGU ", population: 2000 },

          ]
        },
        {
          panchayatName: "चौका",
          villages: [

            { villageName: "दुबराजपुर ", population: 2000 },
            { villageName: "बड़डीह टोला", population: 2000 },
            { villageName: "टूइडुंगरी", population: 2000 },
            { villageName: "रोयाडीह ", population: 2000 },
            { villageName: "चादुडीह ", population: 2000 },
            { villageName: "बड़टांड ", population: 2000 },
            { villageName: "चौका", population: 2000 },

          ]
        },
        {
          panchayatName: "चावलीबासा",
          villages: [

            { villageName: "सिगाती  ", population: 2000 },
            { villageName: "रुगडी", population: 2000 },
            { villageName: "बादलाडीह", population: 2000 },
            { villageName: "बांधडीह  ", population: 2000 },
            { villageName: "काशीडीह", population: 2000 },
            { villageName: "महतोडीह", population: 2000 },
            { villageName: "पाथराखुन", population: 2000 },
            { villageName: "चावलीबासा", population: 2000 },
            { villageName: "बड़ामटांड", population: 2000 },
            { villageName: "BANDHDIH", population: 2000 },
            { villageName: "BADAMTAND TOLA", population: 2000 },
          ]
        },
        {
          panchayatName: "धुनाबुरु",
          villages: [


            { villageName: "बालीडीह", population: 2000 },
            { villageName: "तुलग्राम", population: 2000 },
            { villageName: "कोड़ाबुरु", population: 2000 },
            { villageName: "दुलमी", population: 2000 },
            { villageName: "पालगम", population: 2000 },
            { villageName: "छतरडीह", population: 2000 },
            { villageName: "सोनालटांड", population: 2000 },
            { villageName: "डुमकाडीह", population: 2000 },
            { villageName: "बांसा", population: 2000 },
            { villageName: "पहाड़पुर", population: 2000 },
            { villageName: "बेगुनाडीह", population: 2000 },
            { villageName: "छतरडीह", population: 2000 },
            { villageName: "नतुनडीह", population: 2000 },
            { villageName: "खुँचीडीह", population: 2000 },
            { villageName: "बुलानडीह", population: 2000 },
            { villageName: "लाकड़ा गाड़ा", population: 2000 },
            { villageName: "चिरूगोड़ा", population: 2000 },
            { villageName: "केंदुआडीह", population: 2000 },
            { villageName: "धुनाबुरु", population: 2000 },

          ]
        },
        {
          panchayatName: "तामोलिया",
          villages: [


            { villageName: "तामोलिया", population: 2000 },
            { villageName: "काड़घरा", population: 2000 },
            { villageName: "डुंगरीखुली", population: 2000 },
            { villageName: "शिव मंदिर टोला", population: 2000 },
            { villageName: "डोबो ( Old Basti)", population: 2000 },
            { villageName: "कुसुमडीह + सोनारीकुली", population: 2000 },
            { villageName: "हनुमान कॉलोनी", population: 2000 },
            { villageName: "दोमुहानी", population: 2000 },
            { villageName: "हुचुकडीह", population: 2000 },
            { villageName: "काडीपाथर", population: 2000 },
            { villageName: "रोड नं -3", population: 2000 },
            { villageName: "पुडीसिली", population: 2000 },
            { villageName: "कुम्हार टोला", population: 2000 },
            { villageName: "रुगडी- 1", population: 2000 },
            { villageName: "रुगडी - 2", population: 2000 },
            { villageName: "रुगडी ( पोराईडीह)", population: 2000 },
            { villageName: "चिरूगोड़ा -1", population: 2000 },
            { villageName: "चिरूगोड़ा -2", population: 2000 },
            { villageName: "गौरी - 1", population: 2000 },
            { villageName: "गौरी - 2", population: 2000 },
            { villageName: "गौरी ( रायवनि)", population: 2000 },
            { villageName: "धरनीगोड़ा-1", population: 2000 },
            { villageName: "धरनीगोडा -2", population: 2000 },


          ]
        },
        {
          panchayatName: "झाबरी",
          villages: [

            { villageName: "पोड़का  ", population: 2000 },
            { villageName: "धातकीडीह ", population: 2000 },
            { villageName: "नतुनडीह ", population: 2000 },
            { villageName: "पदडीह", population: 2000 },
            { villageName: "लेंगडीह", population: 2000 },
            { villageName: "झाबरी", population: 2000 },
            { villageName: "भुरुगोड़ा", population: 2000 },
            { villageName: "जाँता ", population: 2000 },
            { villageName: "दिरलोंग ", population: 2000 },
            { villageName: "कारूबेड़ा ", population: 2000 },
            { villageName: "भालुकगाडीह", population: 2000 },
            { villageName: "सिदडीह ", population: 2000 },
            { villageName: "BURUGORA", population: 2000 },
            { villageName: "RANGADIH", population: 2000 },

          ]
        },
        {
          panchayatName: "घोड़ानेगी",
          villages: [

            { villageName: "घोड़ानेगी", population: 2000 },
            { villageName: "चपटटांड", population: 2000 },
            { villageName: "बेडा़", population: 2000 },
            { villageName: "तेरेडीह", population: 2000 },
            { villageName: "डेम कॉलोनी ", population: 2000 },
            { villageName: "डिमुडीह", population: 2000 },
            { villageName: "वोराबिन्धा ", population: 2000 },
            { villageName: "नुतुनडीह ", population: 2000 },
            { villageName: "कुटामखाल", population: 2000 },

          ]
        },
        {
          panchayatName: "CHANDIL",
          villages: [


            { villageName: "KADAMDIH", population: 2000 },
            { villageName: "SIKLI", population: 2000 },
            { villageName: "CHANDIL", population: 2000 },
            { villageName: "SOSHAN TAND", population: 2000 },
            { villageName: "HAT TOLA", population: 2000 },
            { villageName: "LENGDIH", population: 2000 },
            { villageName: "KALINDI BASTI", population: 2000 },
            { villageName: "KUMAR PADA", population: 2000 },
            { villageName: "BHUIYA PADA", population: 2000 },
            { villageName: "BENA PADA", population: 2000 },

          ]
        },
        {
          panchayatName: "रूचाप",
          villages: [

            { villageName: "GANGUDIH", population: 2000 },
            { villageName: "हिरीमिली", population: 2000 },
            { villageName: "रूचाप", population: 2000 },
            { villageName: "PUNARWAS", population: 2000 },
            { villageName: "भालूककोचा ", population: 2000 },
            { villageName: "BONDIH", population: 2000 },
            { villageName: "टीचर्स कॉलोनी", population: 2000 },
            { villageName: "गांगुडीह पूर्नवास ", population: 2000 },
            { villageName: "धातकीडीह ", population: 2000 },
            { villageName: "भुईयाटोला", population: 2000 },
            { villageName: "हॉस्पिटल एरिया", population: 2000 },
            { villageName: "सालडीह ", population: 2000 },

          ]
        },
        {
          panchayatName: "रुसुनिया",
          villages: [


            { villageName: "रुसुनिया", population: 2000 },
            { villageName: "लेगंडीह", population: 2000 },
            { villageName: "रावताड़ा ", population: 2000 },
            { villageName: "तिरुलडीह", population: 2000 },
            { villageName: "सुकसारी", population: 2000 },
            { villageName: "कागलाटांड", population: 2000 },
            { villageName: "पियालडीह", population: 2000 },
            { villageName: "हाथीनंदा", population: 2000 },
            { villageName: "मांझी टोला ", population: 2000 },
            { villageName: "MAHATO TOLA", population: 2000 },
            { villageName: "MAJHI TOLA", population: 2000 },

          ]
        },
        {
          panchayatName: "रुदिया",
          villages: [

            { villageName: "चैनपुर", population: 2000 },
            { villageName: "दाड़दा ", population: 2000 },
            { villageName: "दालग्राम", population: 2000 },
            { villageName: "काटिया", population: 2000 },
            { villageName: "पाटाटोला", population: 2000 },
            { villageName: "रुदिया", population: 2000 },
            { villageName: "शहरबेड़ा", population: 2000 },
            { villageName: "तारकुंआ", population: 2000 },
            { villageName: "सोहराबेड़ा", population: 2000 },
            { villageName: "वनडीह टोला", population: 2000 },

          ]
        },
        {
          panchayatName: "हेंसाकोचा",
          villages: [


            { villageName: "रांका ", population: 2000 },
            { villageName: "टुडू", population: 2000 },
            { villageName: "हेंसाकोचा", population: 2000 },
            { villageName: "माचाबेडा", population: 2000 },
            { villageName: "रांगामाटिया", population: 2000 },
            { villageName: "तानिसया", population: 2000 },
            { villageName: "मुतुदा", population: 2000 },
            { villageName: "पालना", population: 2000 },
            { villageName: "कोकेबेडा", population: 2000 },
            { villageName: "लम्बाडुगरी टोला", population: 2000 },
            { villageName: "जारवादाह टोला", population: 2000 },
            { villageName: "बारूडीह", population: 2000 },
            { villageName: "रागाडीह", population: 2000 },
            { villageName: "पारसीडुंगरी", population: 2000 },
            { villageName: "नीमघुटु ", population: 2000 },
            { villageName: "पोडोकोचा", population: 2000 },
            { villageName: "मातकामटोराम", population: 2000 },
            { villageName: "मुरूकडीह", population: 2000 },
            { villageName: "बान्दुडीह", population: 2000 },
            { villageName: "ससोघुटु ", population: 2000 },
            { villageName: "डुगरीडीह", population: 2000 },
            { villageName: "जाहेरडीह", population: 2000 },
            { villageName: "कालोपत्थर ", population: 2000 },
            { villageName: "केन्दगोडा", population: 2000 },
            { villageName: "धातकीडीह", population: 2000 },
            { villageName: "कान्कीबेडा", population: 2000 },
            { villageName: "कदमबेडा", population: 2000 },
            { villageName: "दिगारदा", population: 2000 },
            { villageName: "गेगेरदा", population: 2000 },


          ]
        },
        {
          panchayatName: "मातकमडीह",
          villages: [
            { villageName: "रेयाडदा", population: 2000 },
            { villageName: "बारसीरा", population: 2000 },
            { villageName: "लापाईबेडा", population: 2000 },
            { villageName: "कादलाकोचा", population: 2000 },
            { villageName: "मातकमडीह", population: 2000 },
            { villageName: "रायडीह", population: 2000 },
            { villageName: "चुटियाखाल", population: 2000 },
            { villageName: "गुटीऊली ", population: 2000 },
            { villageName: "धोबातांती", population: 2000 },
            { villageName: "डुंगरीडीह टोला", population: 2000 },
            { villageName: "पानरीकोचा", population: 2000 },
            { villageName: "गांदाबेडा", population: 2000 },
            { villageName: "पासानडीह", population: 2000 },
            { villageName: "डेबरागोड़ा", population: 2000 },
            { villageName: "वोरयाबेड़ा", population: 2000 },
            { villageName: "बांसडुंगरी", population: 2000 },
            { villageName: "मालहानकोचा", population: 2000 },
            { villageName: "धातकीडीह", population: 2000 },
            { villageName: "गुँगुकोचा", population: 2000 },

          ]
        },
        {
          panchayatName: "उरमाल",
          villages: [

            { villageName: "डुंगरीडीह", population: 2000 },
            { villageName: "काटाबेडा टेला", population: 2000 },
            { villageName: "राँगाटांड", population: 2000 },
            { villageName: "भुचूगडीह", population: 2000 },
            { villageName: "जारा", population: 2000 },
            { villageName: "हेरेमदा", population: 2000 },
            { villageName: "डुबुडीह", population: 2000 },
            { villageName: "उरमाल", population: 2000 },
            { villageName: "बागालडीह टोला", population: 2000 },
            { villageName: "बुरुडीह ", population: 2000 },
            { villageName: "गेरीया कोचा", population: 2000 },
            { villageName: "माहादेवबेड़ा", population: 2000 },
            { villageName: "हाथी कोचा", population: 2000 },
            { villageName: "गीतीलवेड़ा", population: 2000 },
            { villageName: "विद्री", population: 2000 },
            { villageName: "पुराणडीह", population: 2000 },
            { villageName: "दिनाई ", population: 2000 },
            { villageName: "सावडीह", population: 2000 },

          ]
        },
        {
          panchayatName: "खुंटी",
          villages: [

            { villageName: "केदारडीह ", population: 2000 },
            { villageName: "मांझीखुली", population: 2000 },
            { villageName: "पलासटांड ", population: 2000 },
            { villageName: "डुँगरीधार", population: 2000 },
            { villageName: "पाहाड़धार ", population: 2000 },
            { villageName: "कुरली", population: 2000 },
            { villageName: "खुंटी", population: 2000 },
            { villageName: "कुमार खुली ", population: 2000 },
            { villageName: "महतो खुली", population: 2000 },
            { villageName: "मुसरीबेड़ा", population: 2000 },
            { villageName: "जाहेरडीह", population: 2000 },
          ]
        }

      ]
    },
    {
      blockName: "Ichagarh",
      panchayats: [
        {
          panchayatName: "बांदु",
          villages: [
            { villageName: "	बांदु	", population: 2000 },
            { villageName: "	चामदा	", population: 2000 },
            { villageName: "	हुरलुग	", population: 2000 },
            { villageName: "	जामदोहा	", population: 2000 },
            { villageName: "	करनडीह	", population: 2000 },
            { villageName: "	कुरूकतोपा	", population: 2000 },
            { villageName: "	उदाल	", population: 2000 },
            { villageName: "	रांगाडीह टोला	", population: 2000 },
            { villageName: "	डुगरीडीह टोला	", population: 2000 },
            { villageName: "	बारूडीह	", population: 2000 },
            { villageName: "	पहाड़पुर	", population: 2000 },
            { villageName: "	बाबु चामदा	", population: 2000 },
            { villageName: "	कारलाबेडा़	", population: 2000 },

          ]
        },
        {
          panchayatName: "चिमटिया",
          villages: [
            { villageName: "	चिमटिया	", population: 2000 },
            { villageName: "	चितरी	", population: 2000 },
            { villageName: "	जामडीह	", population: 2000 },
            { villageName: "	नतुनडीह	", population: 2000 },
            { villageName: "	रूगड़ी	", population: 2000 },
            { villageName: "	आताडग्राम	", population: 2000 },
            { villageName: "	तामरी	", population: 2000 },
            { villageName: "	खोखरो ,नुतनडीह	", population: 2000 },
            { villageName: "	खोखरो	", population: 2000 },
            { villageName: "	दियाडीह	", population: 2000 },
            { villageName: "	शोखाडीह	", population: 2000 },

          ]
        },
        {
          panchayatName: "देवलटांड",
          villages: [
            { villageName: "	देवलटांड	", population: 2000 },
            { villageName: "	जिलिंगआंदार	", population: 2000 },
            { villageName: "	बामनडीह	", population: 2000 },
            { villageName: "	आगसिया	", population: 2000 },
            { villageName: "	बासाहातू	", population: 2000 },
            { villageName: "	नवाडीह कुम्हार व मछुवा टोला	", population: 2000 },
            { villageName: "	नवाडीह गोराई टोला	", population: 2000 },
            { villageName: "	नवाडीह मांझी टोला	", population: 2000 },
            { villageName: "	रूगड़ी	", population: 2000 },
            { villageName: "	सारनाटांड टोला	", population: 2000 },
            { villageName: "	धातकीडीह टोला	", population: 2000 },
            { villageName: "	महुलडीह	", population: 2000 },
            { villageName: "	हाडामातकाम 	", population: 2000 },
            { villageName: "	करनडीह	", population: 2000 },
            { villageName: "	पहाड़मुडी	", population: 2000 },
            { villageName: "	उलीडीह टोला	", population: 2000 },

          ]
        },
        {
          panchayatName: "गौरांगकोचा",
          villages: [
            { villageName: "	गौरांगकोचा	", population: 2000 },
            { villageName: "	काटघोडा	", population: 2000 },
            { villageName: "	सिलदा	", population: 2000 },
            { villageName: "	सालवनी	", population: 2000 },
            { villageName: "	दालग्राम	", population: 2000 },
            { villageName: "	चन्दनपुर टोला	", population: 2000 },
            { villageName: "	चिरूगोडा़ टोला	", population: 2000 },
            { villageName: "	केन्दुवाडीह	", population: 2000 },
            { villageName: "	पुसाखुन टोला	", population: 2000 },
            { villageName: "	पुरानाडीह 	", population: 2000 },
            { villageName: "	डुँगरीकुली टोला	", population: 2000 },
            { villageName: "	सोसोडीह	", population: 2000 },
            { villageName: "	विसनडीह टोला	", population: 2000 },

          ]
        },
        {
          panchayatName: "गुदड़ी",
          villages: [
            { villageName: "	गुदड़ी	", population: 2000 },
            { villageName: "	हुटूप	", population: 2000 },
            { villageName: "	पिडगीबासा	", population: 2000 },
            { villageName: "	खुंडीह	", population: 2000 },
            { villageName: "	बाँधकोचा	", population: 2000 },
            { villageName: "	हुनडीह	", population: 2000 },
            { villageName: "	मुंडा टोला	", population: 2000 },
            { villageName: "	बड़ा आमड़ा	", population: 2000 },
            { villageName: "	वनडीह	", population: 2000 },
            { villageName: "	मानकाडीह	", population: 2000 },
            { villageName: "	जाहेरडीह	", population: 2000 },
            { villageName: "	छोटा आमड़ा	", population: 2000 },
            { villageName: "	बाबुडीह	", population: 2000 },
            { villageName: "	मातकामडीह	", population: 2000 },

          ]
        },
        {
          panchayatName: "लेपाटांड",
          villages: [
            { villageName: "	लेपाटांड	", population: 2000 },
            { villageName: "	वनडीह	", population: 2000 },
            { villageName: "	पाटपुर	", population: 2000 },
            { villageName: "	पुरनापाटपुर	", population: 2000 },
            { villageName: "	बारुडीह पोटपुर	", population: 2000 },
            { villageName: "	जामडीह पाटपुर	", population: 2000 },
            { villageName: "	किस्टोपुर	", population: 2000 },
            { villageName: "	मिस्त्रीडीह पाटपुर	", population: 2000 },
            { villageName: "	बुदालोंग	", population: 2000 },
            { villageName: "	धातकीडीह	", population: 2000 },
            { villageName: "	आमटांड	", population: 2000 },
            { villageName: "	काशीडीह	", population: 2000 },
            { villageName: "	कानदेबेड़ा	", population: 2000 },
            { villageName: "	कुन्दरीलोंग	", population: 2000 },
            { villageName: "	घाटिया	", population: 2000 },
            { villageName: "	घाटशिला	", population: 2000 },

          ]
        },
        {
          panchayatName: "मौसाड़ा",
          villages: [
            { villageName: "	मौसाड़ा	", population: 2000 },
            { villageName: "	कालीचामदा	", population: 2000 },
            { villageName: "	मातकुमडीह	", population: 2000 },
            { villageName: "	बुरूहातु	", population: 2000 },
            { villageName: "	कारका	", population: 2000 },
            { villageName: "	बाँधडीह	", population: 2000 },
            { villageName: "	गाराडीह	", population: 2000 },
            { villageName: "	लोपसोडीह	", population: 2000 },
            { villageName: "	पुरानडीह	", population: 2000 },

          ]
        },
        {
          panchayatName: "नदीसाई",
          villages: [
            { villageName: "	पुरानडीह	", population: 2000 },
            { villageName: "	नदीसाई	", population: 2000 },
            { villageName: "	नारो	", population: 2000 },
            { villageName: "	चॉडियाडीह	", population: 2000 },
            { villageName: "	कुटाम	", population: 2000 },
            { villageName: "	अमन्द्री	", population: 2000 },
            { villageName: "	शंकराडीह	", population: 2000 },
            { villageName: "	घाघारी	", population: 2000 },
            { villageName: "	गुरमा	", population: 2000 },
            { villageName: "	दारदा	", population: 2000 },
            { villageName: "	लाल वाजार टोला	", population: 2000 },
            { villageName: "	रागाँडीह	", population: 2000 },
            { villageName: "	तपोवन	", population: 2000 },
            { villageName: "	उराँवटांड टोला	", population: 2000 },
            { villageName: "	जोजोडीह	", population: 2000 },
            { villageName: "	उकुपिडी	", population: 2000 },
            { villageName: "	नागासेंका	", population: 2000 },
            { villageName: "	निमडीह टोला	", population: 2000 },

          ]
        },
        {
          panchayatName: "पातकुम",
          villages: [
            { villageName: "	ईचागढ़	", population: 2000 },
            { villageName: "	पातकुम	", population: 2000 },
            { villageName: "	बाकलतोडिया	", population: 2000 },
            { villageName: "	धुनिया टोला 	", population: 2000 },
            { villageName: "	राजवार टोला	", population: 2000 },
            { villageName: "	वांकसाई	", population: 2000 },
            { villageName: "	कुंजवन	", population: 2000 },
            { villageName: "	विसनडीह	", population: 2000 },
            { villageName: "	वडडीह	", population: 2000 },

          ]
        },
        {
          panchayatName: "सितु",
          villages: [
            { villageName: "	सितु	", population: 2000 },
            { villageName: "	रघुनाथपुर	", population: 2000 },
            { villageName: "	रहड़ाडीह	", population: 2000 },
            { villageName: "	डुमरा	", population: 2000 },
            { villageName: "	हरतालडीह	", population: 2000 },
            { villageName: "	सालुकडीह	", population: 2000 },
            { villageName: "	कुटाम	", population: 2000 },
            { villageName: "	चोगाटाँड टोला	", population: 2000 },
            { villageName: "	पिलीद	", population: 2000 },
            { villageName: "	जामडीह	", population: 2000 },
            { villageName: "	टूँगरीहेंट	", population: 2000 },
            { villageName: "	नूतनडीह	", population: 2000 },
            { villageName: "	खेडवन	", population: 2000 },

          ]
        },
        {
          panchayatName: "सोडो",
          villages: [
            { villageName: "	सोडो	", population: 2000 },
            { villageName: "	वीरडीह	", population: 2000 },
            { villageName: "	चातम	", population: 2000 },
            { villageName: "	कुडमाडीह	", population: 2000 },
            { villageName: "	जारगोडीह	", population: 2000 },
            { villageName: "	आदारडीह	", population: 2000 },
            { villageName: "	दिरीडारी	", population: 2000 },
            { villageName: "	दयालटांड	", population: 2000 },
            { villageName: "	खीरी	", population: 2000 },
            { villageName: "	वामुनडीह	", population: 2000 },
            { villageName: "	गोविनपुर	", population: 2000 },
            { villageName: "	हाड़ात	", population: 2000 },
            { villageName: "	पाहाड़पुर	", population: 2000 },
            { villageName: "	विष्टाटांड	", population: 2000 },
            { villageName: "	तालापिडी	", population: 2000 },
            { villageName: "	सिमलटाँड	", population: 2000 },
            { villageName: "	कन्कीटांड	", population: 2000 },

          ]
        },
        {
          panchayatName: "टीकर",
          villages: [
            { villageName: "	दुबराजपुर	", population: 2000 },
            { villageName: "	टीकर गोप टोला	", population: 2000 },
            { villageName: "	टीकर कैवर्त टोला	", population: 2000 },
            { villageName: "	टीकर दुर्गा मंदिर टोला	", population: 2000 },
            { villageName: "	टीकर प्रमाणिक टोला	", population: 2000 },
            { villageName: "	टीकर जगन्नाथ चौक	", population: 2000 },
            { villageName: "	टीकर कालिन्दी टोला	", population: 2000 },
            { villageName: "	जारागौड़ा	", population: 2000 },
            { villageName: "	डुमरडीह	", population: 2000 },
            { villageName: "	दिगारडीह	", population: 2000 },
            { villageName: "	सेरेंगडीह	", population: 2000 },
            { villageName: "	वनकाटी	", population: 2000 },
            { villageName: "	पामिया	", population: 2000 },
            { villageName: "	राताई	", population: 2000 },
            { villageName: "	कुलटाँड	", population: 2000 },
            { villageName: "	सापारुम	", population: 2000 },
            { villageName: "	माहदेबवेडा	", population: 2000 },
            { villageName: "	बुरूडीह	", population: 2000 },

          ]
        },
        {
          panchayatName: "तिरूलडीह - 2",
          villages: [
            { villageName: "	तिरूलडीह	", population: 2000 },
            { villageName: "	चिपड़ी	", population: 2000 },
            { villageName: "	जोजोडीह	", population: 2000 },
            { villageName: "	सोहोनडीह	", population: 2000 },
            { villageName: "	मुदीडीह	", population: 2000 },
            { villageName: "	धुन्धाडीह	", population: 2000 },
            { villageName: "	जयपुर	", population: 2000 },
            { villageName: "	लावा	", population: 2000 },
            { villageName: "	ऊपर कुटाम	", population: 2000 },
            { villageName: "	बनडीह	", population: 2000 },
            { villageName: "	चुनीडीह	", population: 2000 },
            { villageName: "	पलासडीह	", population: 2000 },
            { villageName: "	रुईटीकरा	", population: 2000 },
            { villageName: "	सालगाडीह	", population: 2000 },
            { villageName: "	बोड़ा	", population: 2000 },
            { villageName: "	बरुणा	", population: 2000 },
            { villageName: "	बाँधडीह टोला	", population: 2000 },

          ]
        },
        {
          panchayatName: "तुता",
          villages: [
            { villageName: "	दुलमीडीह	", population: 2000 },
            { villageName: "	तुता	", population: 2000 },
            { villageName: "	डुमटाँड	", population: 2000 },
            { villageName: "	झाडुआ	", population: 2000 },
            { villageName: "	पुडीहेंसा	", population: 2000 },
            { villageName: "	बडाचुनचुडिया	", population: 2000 },
            { villageName: "	छोटाचुनचुडिया	", population: 2000 },
            { villageName: "	बाराडीह	", population: 2000 },
            { villageName: "	चोगा	", population: 2000 },
            { villageName: "	कुडमाडीह	", population: 2000 },
            { villageName: "	मातकामडीह	", population: 2000 },
            { villageName: "	बारदाडीह	", population: 2000 },
            { villageName: "	कानकीटाँड	", population: 2000 },
            { villageName: "	कुईडीह	", population: 2000 },

          ]
        },
      ]
    },
    {
      blockName: "Kukru",
      panchayats: [
        {
          panchayatName: "ईचाडीह",
          villages: [
            { villageName: "	बाबुडीह	", population: 2000 },
            { villageName: "	ईचाडीह 	", population: 2000 },
            { villageName: "	बाकारकुडी	", population: 2000 },
            { villageName: "	एदेलडीह	", population: 2000 },
            { villageName: "	कारकीडीह	", population: 2000 },
            { villageName: "	चौका	", population: 2000 },
            { villageName: "	आदारडीह	", population: 2000 },
            { villageName: "	पलासबन टोला	", population: 2000 },
            { villageName: "	बनडीह टोला	", population: 2000 },

          ]
        },
        {
          panchayatName: "बैरासी सिरुम",
          villages: [
            { villageName: "	रूपरू	", population: 2000 },
            { villageName: "	बैरासी सिरुम	", population: 2000 },
            { villageName: "	छातारडीह	", population: 2000 },
            { villageName: "	महतोडीह	", population: 2000 },
            { villageName: "	महकमडीह	", population: 2000 },
            { villageName: "	माहलीडीह	", population: 2000 },
            { villageName: "	नन्दुटांड	", population: 2000 },
            { villageName: "	आमटांड	", population: 2000 },
            { villageName: "	तुलीनडीह	", population: 2000 },
            { villageName: "	बुरुडीह	", population: 2000 },
            { villageName: "	खेजुरटांड	", population: 2000 },
            { villageName: "	खचकचा	", population: 2000 },
            { villageName: "	रंगराडीह	", population: 2000 },
            { villageName: "	धानसुडा 	", population: 2000 },
            { villageName: "	गुजरूटांड	", population: 2000 },
            { villageName: "	बेरासी 	", population: 2000 },
            { villageName: "	डुँगरीडीह 	", population: 2000 },

          ]
        },
        {
          panchayatName: "औडिया",
          villages: [
            { villageName: "	दुलमी	", population: 2000 },
            { villageName: "	औडिया	", population: 2000 },
            { villageName: "	उदाटांड	", population: 2000 },
            { villageName: "	दयापुर	", population: 2000 },
            { villageName: "	कुमारी	", population: 2000 },
            { villageName: "	छातागोड़ा	", population: 2000 },
            { villageName: "	वनगोड़ा	", population: 2000 },
            { villageName: "	निमटांड टोला	", population: 2000 },

          ]
        },
        {
          panchayatName: "तिरूलडीह - 1",
          villages: [
            { villageName: "	सापारुम	", population: 2000 },
            { villageName: "	तिरूलडीह	", population: 2000 },
            { villageName: "	गुंदलीडीह	", population: 2000 },
            { villageName: "	सिरकाडीह	", population: 2000 },
            { villageName: "	सापदा	", population: 2000 },
            { villageName: "	हेरेमुली	", population: 2000 },
            { villageName: "	डेरे	", population: 2000 },
            { villageName: "	चानो	", population: 2000 },
            { villageName: "	चौराटकाल	", population: 2000 },
            { villageName: "	पयलंग	", population: 2000 },

          ]
        },
        {
          panchayatName: "जानुम",
          villages: [
            { villageName: "	पलासडीह	", population: 2000 },
            { villageName: "	जानुम	", population: 2000 },
            { villageName: "	केंन्दादा	", population: 2000 },
            { villageName: "	खुदीलोंग	", population: 2000 },
            { villageName: "	श्यामनगर	", population: 2000 },
            { villageName: "	हेसालोंग	", population: 2000 },
            { villageName: "	बाँन्दडीह	", population: 2000 },
            { villageName: "	निशचीन्तपुर	", population: 2000 },
            { villageName: "	टाँडघर	", population: 2000 },

          ]
        },
        {
          panchayatName: "लेटेमदा",
          villages: [
            { villageName: "	जारगो	", population: 2000 },
            { villageName: "	लेटेमदा	", population: 2000 },
            { villageName: "	वान्दावीर	", population: 2000 },
            { villageName: "	बडालापांग	", population: 2000 },
            { villageName: "	कुलटांड	", population: 2000 },
            { villageName: "	माझीडीह	", population: 2000 },
            { villageName: "	वनघर	", population: 2000 },
            { villageName: "	नुतुनडीह	", population: 2000 },
            { villageName: "	दारुदा	", population: 2000 },
            { villageName: "	तेतोलढीकरी	", population: 2000 },
            { villageName: "	दलकीटांड	", population: 2000 },
            { villageName: "	टुँगरीधार	", population: 2000 },
            { villageName: "	संपदडीह	", population: 2000 },
            { villageName: "	वुधुडीह	", population: 2000 },

          ]
        },
        {
          panchayatName: "कूकडू",
          villages: [
            { villageName: "	छोटालापांग	", population: 2000 },
            { villageName: "	डाटम	", population: 2000 },
            { villageName: "	टांडघर	", population: 2000 },
            { villageName: "	शिशि	", population: 2000 },
            { villageName: "	कूकडू	", population: 2000 },
            { villageName: "	योगिडीह	", population: 2000 },
            { villageName: "	दारुदा	", population: 2000 },
            { villageName: "	चौकेगाड़िया	", population: 2000 },

          ]
        },
        {
          panchayatName: "पारगामा",
          villages: [
            { villageName: "	सिन्दुरपूर	", population: 2000 },
            { villageName: "	पारगामा	", population: 2000 },
            { villageName: "	काड़का	", population: 2000 },
            { villageName: "	चुनचुडिया	", population: 2000 },
            { villageName: "	हाईतिरुल	", population: 2000 },
            { villageName: "	काड़गामा	", population: 2000 },
            { villageName: "	किशुनडीह	", population: 2000 },
            { villageName: "	भाकुडगोडा टोला	", population: 2000 },
            { villageName: "	जाडातार टोला	", population: 2000 },
            { villageName: "	ताँतीखुटी	", population: 2000 },
            { villageName: "	वारेडीह 	", population: 2000 },
            { villageName: "	डुरडीह	", population: 2000 },
            { villageName: "	जामडीह टोला	", population: 2000 },
            { villageName: "	काशीडीह	", population: 2000 },
            { villageName: "	वनघर टोला	", population: 2000 },
            { villageName: "	जोनारगोडा	", population: 2000 },
            { villageName: "	पुरना काडगामा	", population: 2000 },
            { villageName: "	आभावारु	", population: 2000 },

          ]
        },
        {
          panchayatName: "चौड़ा",
          villages: [
            { villageName: "	चौड़ा 	", population: 2000 },
            { villageName: "	घंघाडीह	", population: 2000 },
            { villageName: "	पांडरा 	", population: 2000 },
            { villageName: "	मानकीडीह	", population: 2000 },
            { villageName: "	कुदा 	", population: 2000 },
            { villageName: "	नुतुनडीह	", population: 2000 },
            { villageName: "	मदनडीह	", population: 2000 },
            { villageName: "	जामडीह 	", population: 2000 },

          ]
        }
      ]
    }
  ];

  const resetForm = () => {
    setForm({
      bookingType: '',  // Reset bookingType
      date: '',
      name: '',
      mobile: '',
      email: '',
      block: '',
      panchayat: '',
      village: '',
      referenceName: '',
      referenceMobile: '',
    });
    setSelectedType('');
    setSelectedBlock('');
    setSelectedPanchayat('');
    setSelectedVillage('');
  };

  const handleSubmit = () => {
    if (!form.name || !form.mobile || !form.block || !form.panchayat || !form.village) {
      setToast({
        message: 'Please fill in all mandatory fields.',
        isOpen: true,
        duration: 3000,
      });
      return;
    }
    // Include selectedType in the form data before submitting
    const formData = { ...form, bookingType: selectedType };  // Make sure to include bookingType here

    axios.post('https://preenal.in/api/bookings', formData)
      .then(response => {
        setToast({
          message: 'Booking Successful!',
          isOpen: true,
          duration: 2000,
        });

        // Reset the form after successful submission
        resetForm();
      })
      .catch(error => {
        console.error('Error booking:', error);
        setToast({
          message: 'Booking failed. Please try again.',
          isOpen: true,
          duration: 3000,
        });
      });
  };

  const handleBlockChange = (blockName: string) => {
    setSelectedBlock(blockName);
    setSelectedPanchayat('');
    setSelectedVillage('');
  };

  const handlePanchayatChange = (panchayatName: string) => {
    setSelectedPanchayat(panchayatName);
    setSelectedVillage('');
  };

  const handleVillageChange = (villageName: string) => {
    setSelectedVillage(villageName);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Booking</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle>Booking</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Booking form inputs */}
        <IonItem>
          <IonLabel position="floating">Booking Type</IonLabel>
          <IonSelect
            value={selectedType}
            onIonChange={e => setSelectedType(e.detail.value)}
            interface="modal"
          >
            <IonSelectOption value="Ambulance">Ambulance</IonSelectOption>
            <IonSelectOption value="Water Tank">Water Tank</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Name</IonLabel>
          <IonInput
            value={form.name}
            onIonChange={e => setForm({ ...form, name: e.detail.value! })}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Mobile</IonLabel>
          <IonInput
            value={form.mobile}
            onIonChange={e => setForm({ ...form, mobile: e.detail.value! })}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Email (Optional)</IonLabel>
          <IonInput
            value={form.email}
            onIonChange={e => setForm({ ...form, email: e.detail.value! })}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Date</IonLabel>
          <IonInput
            value={form.date}
            onClick={() => setIsOpen(true)} // Open modal when clicked
            placeholder="Select Date"
          />
        </IonItem>

        <IonModal isOpen={isOpen}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Modal</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonDatetime
              value={form.date}
              min={tomorrow} // This restricts the date picker to today's date and beyond
              onIonChange={e => { setForm({ ...form, date: e.detail.value as string }); setIsOpen(false); }}
            />
          </IonContent>
        </IonModal>

        {/* Select Block, Panchayat, and Village */}
        <IonItem>
          <IonLabel position="floating">Block</IonLabel>
          <IonSelect
            value={selectedBlock}
            onIonChange={e => {
              handleBlockChange(e.detail.value);
              setForm({ ...form, block: e.detail.value });
            }}
            interface="modal"
          >
            {data.map(block => (
              <IonSelectOption key={block.blockName} value={block.blockName}>
                {block.blockName}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        {selectedBlock && (
          <IonItem>
            <IonLabel position="floating">Panchayat</IonLabel>
            <IonSelect
              value={selectedPanchayat}
              onIonChange={e => {
                handlePanchayatChange(e.detail.value);
                setForm({ ...form, panchayat: e.detail.value });
              }}
              interface="modal"
            >
              {data.find(block => block.blockName === selectedBlock)?.panchayats.map((panchayat: any) => (
                <IonSelectOption key={panchayat.panchayatName} value={panchayat.panchayatName}>
                  {panchayat.panchayatName}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        )}

        {selectedPanchayat && (
          <IonItem>
            <IonLabel position="floating">Village</IonLabel>
            <IonSelect
              value={selectedVillage}
              onIonChange={e => {
                handleVillageChange(e.detail.value);
                setForm({ ...form, village: e.detail.value });
              }}
              interface="modal"
            >
              {data
                .find(block => block.blockName === selectedBlock)
                ?.panchayats.find((panchayat: any) => panchayat.panchayatName === selectedPanchayat)
                ?.villages.map((village: any) => (
                  <IonSelectOption key={village.villageName} value={village.villageName}>
                    {village.villageName}
                  </IonSelectOption>
                ))}
            </IonSelect>
          </IonItem>
        )}

        {/* New fields for reference */}
        <IonItem>
          <IonLabel position="floating">Reference Name</IonLabel>
          <IonInput
            value={form.referenceName}
            onIonChange={e => setForm({ ...form, referenceName: e.detail.value! })}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Reference Mobile</IonLabel>
          <IonInput
            value={form.referenceMobile}
            onIonChange={e => setForm({ ...form, referenceMobile: e.detail.value! })}
          />
        </IonItem>

        <IonButton expand="full" onClick={handleSubmit}>Submit</IonButton>

        {/* Toast for success/error messages */}
        <IonToast
          isOpen={toast.isOpen}
          message={toast.message}
          duration={toast.duration}
          onDidDismiss={() => setToast({ ...toast, isOpen: false })}
        />
      </IonContent>
    </IonPage>
  );
};

export default Booking;