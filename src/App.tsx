import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Booking from './components/Booking';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Logout from './components/Logout';
import Track from './components/Track';
import Bookings from './components/Bookings';
import AdminDashboard from './components/AdminDashboard';
import Contact from './components/Contact';
import Report from './components/Report';
import { useEffect, useState } from 'react';
import { isPlatform } from '@ionic/react';
setupIonicReact();
const App: React.FC = () => {
  const [lastTap, setLastTap] = useState<number | null>(null);
  const [exitMessage, setExitMessage] = useState<string>('');

  const handleBackButton = () => {
    const currentTime = Date.now();
    if (lastTap && currentTime - lastTap < 2000) {
      // Use type assertion to inform TypeScript that navigator.app exists
      (navigator as any).app.exitApp(); // TypeScript will not complain anymore
    } else {
      setLastTap(currentTime);
      setExitMessage('Press back again to exit');
      setTimeout(() => {
        setExitMessage('');
      }, 2000);
    }
  };
  

  useEffect(() => {
    const backButtonHandler = () => handleBackButton();
    document.addEventListener('backbutton', backButtonHandler);

    // Cleanup event listener when the component unmounts
    return () => {
      document.removeEventListener('backbutton', backButtonHandler);
    };
  }, [lastTap]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/Dashboard" />
            </Route>
            <Route path="/Dashboard" exact={true}>
              <Dashboard />
            </Route>
            <Route path="/Booking" exact={true}>
              <Booking />
            </Route>
            <Route path="/Login" exact={true}>
              <Login />
            </Route>
            <Route path="/Logout" exact={true}>
              <Logout />
            </Route>
            <Route path="/Bookings" exact={true}>
              <Bookings />
            </Route>
            <Route path="/Track" exact={true}>
              <Track />
            </Route>
            <Route path="/Contact" exact={true}>
              <Contact />
            </Route>
            <Route path="/AdminDashboard" exact={true}>
              <AdminDashboard />
            </Route>
            <Route path="/Report" exact={true}>
              <Report />
            </Route>
            <Route path="/folder/:name" exact={true}>
              <Page />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
