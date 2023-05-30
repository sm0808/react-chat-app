import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FirebaseAppProvider } from 'reactfire';
import Header from './includes/Header';
import firebase from './firebaseConfig';
import ChatApp from './views/ChatApp/ChatApp';
import ExpenseTracker from './views/ExpenseTracker/ExpenseTracker';

// import logo from './logo.svg';
// import './App.css';

const App = () => {
  return (
    <FirebaseAppProvider firebaseApp={firebase}>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/chat" />} />
            <Route path="/chat" element={<ChatApp firebase={firebase}  active={true} />} />
            <Route path="/expense" element={<ExpenseTracker firebase={firebase} />} />
          </Routes>
        </div>
      </Router>
    </FirebaseAppProvider>
  );
};

export default App;
