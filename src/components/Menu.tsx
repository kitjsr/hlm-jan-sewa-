import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  homeOutline,
  homeSharp,
  medicalOutline,
  medicalSharp,
  documentOutline,
  documentSharp,
  logInOutline,
  logInSharp,
  logOutOutline,
  logOutSharp,
  mailOutline,
  mailSharp,
  briefcaseOutline,
  briefcaseSharp,
  createOutline,
  createSharp,
  fileTrayOutline,
  fileTraySharp,
} from 'ionicons/icons';
import { jwtDecode } from 'jwt-decode';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const Menu: React.FC = () => {
  // Define the menu items for normal users and admins
  const userPages: AppPage[] = [
    {
      title: 'Home',
      url: '/Dashboard',
      iosIcon: homeOutline,
      mdIcon: homeSharp,
    },
    {
      title: 'Booking',
      url: '/Booking',
      iosIcon: createOutline,
      mdIcon: createSharp,
    },
    {
      title: 'Track',
      url: '/Track',
      iosIcon: documentOutline,
      mdIcon: documentSharp,
    },
    {
      title: 'Login',
      url: '/Login',
      iosIcon: logInOutline,
      mdIcon: logInSharp,
    },
  ];

  const adminPages: AppPage[] = [

    {
      title: 'Dashboard',
      url: '/AdminDashboard',
      iosIcon: homeOutline,
      mdIcon: homeSharp,
    },
    {
      title: 'Bookings',
      url: '/Bookings',
      iosIcon: fileTrayOutline,
      mdIcon: fileTraySharp,
    },
    {
      title: 'Logout',
      url: '/Logout',
      iosIcon: logOutOutline,
      mdIcon: logOutSharp,
    },
  ];
  const location = useLocation();
  const history = useHistory();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
  const [appPages, setAppPages] = useState<AppPage[]>(userPages);


  useEffect(() => {
    const fetchToken = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        setIsAuthenticated(true);
        const decodedToken: any = jwtDecode(token);

        setRole(decodedToken.role);
        setAppPages(adminPages);
        console.log('Decoded Role:', decodedToken.role);
      } else {
        setIsAuthenticated(false);
        setRole("user");
        setAppPages(userPages);
      }
    };
    fetchToken();
  }, [location]);

  

  // const appPages = role === 'admin' ? adminPages : userPages;

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>HLM जन सेवा</IonListHeader>
          <IonNote>जन सेवा ही लक्ष्य</IonNote>
          {appPages.map((appPage, index) => (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem
                className={location.pathname === appPage.url ? 'selected' : ''}
                routerLink={appPage.url}
                routerDirection="none"
                lines="none"
                detail={false}
              >
                <IonIcon
                  aria-hidden="true"
                  slot="start"
                  ios={appPage.iosIcon}
                  md={appPage.mdIcon}
                />
                <IonLabel>{appPage.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>

        <p>&copy; Kunal i Technology</p>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
