import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonLabel, IonItem, IonText, IonToast } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const history = useHistory();

  // Validate email format
  const validateEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();  // Prevent form refresh

    // Reset error messages before validation
    setErrorMessage('');
    setShowToast(false);

    if (email === '' || password === '') {
      setErrorMessage('Please enter both email and password.');
      setShowToast(true);
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      setShowToast(true);
      return;
    }

    try {
      const response = await fetch('https://preenal.in/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Login failed');
        setShowToast(true);
        return;
      }

      // Login successful, you can store the JWT token in localStorage
      const data = await response.json();
      console.log('Login successful:', data);

      // Store the token in localStorage (or sessionStorage)
      localStorage.setItem('authToken', data.token);

      // Redirect to a different page, e.g., dashboard
      history.push('/AdminDashboard');

    } catch (error) {
      console.error('Login request failed', error);
      setErrorMessage('An error occurred while logging in.');
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h2>Login</h2>

        {/* Wrap the inputs and button inside a form element */}
        <form onSubmit={handleLogin}>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              value={email}
              onIonChange={e => setEmail(e.detail.value!)}
              type="email"
              placeholder="Enter your email"
              autoFocus
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
              value={password}
              onIonChange={e => setPassword(e.detail.value!)}
              type="password"
              placeholder="Enter your password"
            />
          </IonItem>



          <IonButton expand="full" type="submit" disabled={!email || !password || !validateEmail(email)}>
            Log In
          </IonButton>

        </form>

        {/* Toast for error message */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}  // Ensure toast closes
          message={errorMessage}
          duration={2000}  // Show for 2 seconds
        />

        <IonText>
          {/* <p>Don't have an account? <a href="/register">Sign Up</a></p> */}
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default Login;
