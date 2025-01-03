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
          panchayatName: "Tilla",
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
          panchayatName: "Gunda",
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
          panchayatName: "Gunday",
          villages: [{ villageName: "तिल्ला", population: 2000 }],
        },
      ],
    },
  ];

  useEffect(() => {
    // Fetch block, panchayat, and village data from the backend API
    // axios.get('https://preenal.in/api/locationData')
    //   .then(response => {
    //     setData(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching location data:', error);
    //   });
  }, []);

  const handleSubmit = () => {
    if (!form.name || !form.mobile || !form.block || !form.panchayat || !form.village) {
      setToast({
        message: 'Please fill in all mandatory fields.',
        isOpen: true,
        duration: 3000,
      });
      return;
    }

    axios.post('https://preenal.in/api/bookings', form)
      .then(response => {
        setToast({
          message: 'Booking Successful!',
          isOpen: true,
          duration: 2000,
        });
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
            <IonSelectOption value="ambulance">Ambulance</IonSelectOption>
            <IonSelectOption value="waterTank">Water Tank</IonSelectOption>
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
