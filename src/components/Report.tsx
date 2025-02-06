import React, { useEffect, useState } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonList, IonItem, IonLabel, IonButtons, IonMenuButton } from '@ionic/react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Booking {
  block: string;
  panchayat: string;
  village: string;
}

const Report: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [report, setReport] = useState<any>({
    blockwise: {},
    panchayatwise: {},
    villagewise: {}
  });

  useEffect(() => {
    // Fetch data from the API
    axios.get("https://preenal.in/api/bookings")
      .then(response => {
        setBookings(response.data);
        generateReport(response.data);
      })
      .catch(err => console.error(err));
  }, []);

  // Function to generate the report
  const generateReport = (data: any) => {
    const blockwise = {};
    const panchayatwise = {};
    const villagewise = {};

    data.forEach((booking: any) => {
      // Blockwise count
      blockwise[booking.block] = (blockwise[booking.block] || 0) + 1;

      // Panchayatwise count
      panchayatwise[booking.panchayat] = (panchayatwise[booking.panchayat] || 0) + 1;

      // Villagewise count
      villagewise[booking.village] = (villagewise[booking.village] || 0) + 1;
    });

    setReport({
      blockwise,
      panchayatwise,
      villagewise
    });
  };

  // Function to generate chart data
  const generateChartData = (data: any) => {
    const labels = Object.keys(data);
    const values = Object.values(data);

    return {
      labels: labels,
      datasets: [{
        label: 'Number of Bookings',
        data: values,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    };
  };

  return (
    <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonMenuButton />
              </IonButtons>
              <IonTitle>Booking Report</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
        {/* Blockwise Report (Text and Graph) */}
        <IonCard>
          <IonCardContent>
            <h2>Blockwise Report</h2>
            <IonList>
              {Object.keys(report.blockwise).map((block, index) => (
                <IonItem key={index}>
                  <IonLabel>
                    {block}: {report.blockwise[block]} Bookings
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
            <Bar data={generateChartData(report.blockwise)} />
          </IonCardContent>
        </IonCard>

        {/* Panchayatwise Report (Text and Graph) */}
        <IonCard>
          <IonCardContent>
            <h2>Panchayatwise Report</h2>
            <IonList>
              {Object.keys(report.panchayatwise).map((panchayat, index) => (
                <IonItem key={index}>
                  <IonLabel>
                    {panchayat}: {report.panchayatwise[panchayat]} Bookings
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
            <Bar data={generateChartData(report.panchayatwise)} />
          </IonCardContent>
        </IonCard>

        {/* Villagewise Report (Text and Graph) */}
        <IonCard>
          <IonCardContent>
            <h2>Villagewise Report</h2>
            <IonList>
              {Object.keys(report.villagewise).map((village, index) => (
                <IonItem key={index}>
                  <IonLabel>
                    {village}: {report.villagewise[village]} Bookings
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
            <Bar data={generateChartData(report.villagewise)} />
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Report;
