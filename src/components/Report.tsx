import React, { useEffect, useState } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonList, IonItem, IonLabel, IonButtons, IonMenuButton } from '@ionic/react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './Report.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const statusMap = ['Under Process', 'Processing', 'Done', 'Cancelled'];

interface Booking {
  block: string;
  panchayat: string;
  village: string;
  currentStatus: string;
}

const Report: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [report, setReport] = useState<any>({
    blockwise: {}
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
        generateReport(response.data);
        generateTotalCount(response.data);
      })
      .catch(err => console.error(err));
  }, []);

  // Function to generate the report (only Blockwise report)
  const generateReport = (data: any) => {
    const blockwise: { [key: string]: number } = {};

    data.forEach((booking: any) => {
      // Blockwise count
      blockwise[booking.block] = (blockwise[booking.block] || 0) + 1;
    });

    setReport({
      blockwise
    });
  };

  // Function to generate the total status counts
  const generateTotalCount = (data: any) => {
    const statusCountMap = data.reduce((acc: { [key: string]: number }, booking: { currentStatus: any }) => {
      const status = booking.currentStatus;
      acc[status] = acc[status] ? acc[status] + 1 : 1;
      return acc;
    }, {});

    setStatusCounts(statusCountMap);
  };

  // Function to generate chart data
  const generateChartData = (data: any) => {
    const labels = Object.keys(data);
    const values = Object.values(data);

    return {
      labels: labels,
      datasets: [
        {
          label: 'Number of Bookings',
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
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

        {/* Blockwise Report (Text and Graph) */}
        <IonCard>
          <IonCardContent>
            <h1>Blockwise Report</h1>
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
      </IonContent>
    </IonPage>
  );
};

export default Report;
