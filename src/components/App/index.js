import React from 'react';
import { Switch } from 'react-router-dom';

import RouteWithSubRoutes from '../route';
import styles from './App.module.css';
import Header from '../../containers/App/Header';
import Footer from './Footer';
import HelmetComponent from 'common/HelmetComponent';
import SyncAuth from '../../containers/App/SyncAuth';
import { HELMET_DATA } from '../../constants/helmetData';

import routes from '../../routes';

const App = () => (
  <div className={styles.App}>
    <Header />
    <SyncAuth />
    <HelmetComponent {...HELMET_DATA.DEFAULT} />
    <div className={styles.content}>
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </div>
    <Footer />
  </div>
);

export default App;
