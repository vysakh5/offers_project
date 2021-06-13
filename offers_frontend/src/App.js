import React, { useState, useEffect } from 'react';
import { verifyToken } from './data/apiCall';

import './assets/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './routes/Routes';
import ProtectedRoutes from './routes/ProtectedRoutes';

function App() {
  const [token, setResponse] = useState({});

  useEffect(() => {
    if (!token.auth) {
      TokenVerify();
    }
  }, []);

  const TokenVerify = async () => {
    let response = await verifyToken();
    setResponse(response);
  };
  if (token.auth) {
    return (
      <div>
        <ProtectedRoutes />
      </div>
    );
  } else {
    return (
      <div>
        <Routes />
      </div>
    );
  }
}

export default App;
