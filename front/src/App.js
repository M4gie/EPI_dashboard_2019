import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Modal from 'react-modal';
import './styles/index.css';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import Authentication from './views/Authentication';
import Dashboard from './views/Dashboard';
import NotFound from './views/NotFound';
import Validation from './components/authentication/Validation';
import About from './views/About';

Modal.setAppElement('body');

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <PublicRoute path="/login" component={Authentication} />
        <PublicRoute path="/register" component={Authentication} />
        <Route path="/validation" component={Validation} />
        <Route exact path="/about.json" component={About} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
