import React, {useContext, useState, useEffect} from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { observer } from 'mobx-react-lite';
import { Context } from '.';
import { check } from './http/userAPI';
import { Spinner } from 'react-bootstrap';

// OBESRVER is for mobx to check if some states declare in it change in app
const App = observer(() => {
  const { userStore } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check().then(user => {
      userStore.setCurrentUser(user);
    })
    .finally(() => setLoading(false))
    .catch((error) => console.log());
  }, []);

  // set loading spinner, when get data we return navbar and pages routes
  if (loading) return <Spinner animation={"grow"} />;
  
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
